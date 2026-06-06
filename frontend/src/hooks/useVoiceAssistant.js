import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyzeVoice, setStatus, setTranscript } from '../store/slices/productSlice';

export const useVoiceAssistant = () => {
    const dispatch = useDispatch();
    const { status, assistantMessage } = useSelector((state) => state.products);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);
    const silenceTimerRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech Recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US'; // Can be tuned for Urdu (ur-PK) if needed

        recognition.onresult = (event) => {
            let currentTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                currentTranscript += event.results[i][0].transcript;
            }
            setTranscript(currentTranscript);
            dispatch(setTranscript(currentTranscript));

            // Silence Detection: Auto-stop and submit after 2 seconds of silence
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = setTimeout(() => {
                if (currentTranscript.trim()) {
                    handleStopAndSubmit(currentTranscript);
                }
            }, 2000);
        };

        recognition.onerror = (event) => {
            console.error("Recognition Error:", event.error);
            dispatch(setStatus('failed'));
        };

        recognitionRef.current = recognition;

        return () => {
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        };
    }, [dispatch]);

    // TTS Output Integration
    useEffect(() => {
        if (assistantMessage) {
            const utterance = new window.SpeechSynthesisUtterance(assistantMessage);
            utterance.rate = 0.9; // Slightly slower for clarity
            window.speechSynthesis.speak(utterance);
        }
    }, [assistantMessage]);

    const handleStartListening = () => {
        setTranscript('');
        dispatch(setStatus('listening'));
        recognitionRef.current?.start();
    };

    const handleStopAndSubmit = useCallback((finalText) => {
        recognitionRef.current?.stop();
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

        const textToProcess = finalText || transcript;
        if (textToProcess.trim()) {
            dispatch(analyzeVoice(textToProcess));
        }
    }, [dispatch, transcript]);

    return {
        transcript,
        status,
        startListening: handleStartListening,
        stopListening: () => handleStopAndSubmit()
    };
};
