import React, { useEffect } from 'react';
import { Mic, X, Loader2, Sparkles, ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatus } from '../store/slices/productSlice'; // Reusing existing slice for global toggle
import useVoiceRecorder from '../hooks/useVoiceRecorder';
import { useNavigate } from 'react-router-dom';

const VoiceOverlay = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Assuming productSlice manages the "listening" status globally (as 'status' or similar)
    // Or we can create a dedicated UI slice. For now, we'll read 'status' from productSlice
    const { status } = useSelector((state) => state.products);

    // We only show overlay if status === 'listening'
    const isVisible = status === 'listening';

    const { isRecording, isProcessing, aiResponse, startRecording, stopRecording } = useVoiceRecorder();

    // Auto-start recording when overlay opens
    useEffect(() => {
        if (isVisible && !isRecording && !isProcessing && !aiResponse) {
            startRecording();
        }
    }, [isVisible]);

    const handleClose = () => {
        if (isRecording) stopRecording();
        dispatch(setStatus('idle')); // Close overlay
    };

    const handleToggleMic = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    if (!isVisible) return null;

    // Handler for background click (closes overlay if clicked outside modal content)
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex flex-col items-center justify-center text-white animate-in fade-in duration-300"
            onClick={handleBackgroundClick}
        >
            {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
                <X size={32} />
            </button>

            {/* Voice Assistant Visual */}
            <div className="relative mb-12" onClick={e => e.stopPropagation()}>
                {/* Outer Glow */}
                <div className={`absolute inset-0 bg-brand-orange/30 rounded-full blur-[100px] transition-all duration-1000 ${isRecording ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />

                {/* Dynamic Ring */}
                <div className={`w-32 h-32 rounded-full border-2 border-brand-orange flex items-center justify-center relative z-10 transition-all duration-300 ${isRecording ? 'scale-110 border-4' : ''}`}>
                    <button
                        onClick={handleToggleMic}
                        className={`w-28 h-28 rounded-full bg-brand-orange flex items-center justify-center transition-all active:scale-95 ${isProcessing ? 'animate-pulse' : ''}`}
                    >
                        {isProcessing ? (
                            <Loader2 size={48} className="animate-spin" />
                        ) : (
                            <Mic size={48} fill={isRecording ? "white" : "none"} />
                        )}
                    </button>

                    {/* Ripple Effect */}
                    {isRecording && (
                        <>
                            <div className="absolute inset-0 rounded-full border border-brand-orange animate-ping opacity-75" />
                            <div className="absolute inset-[-12px] rounded-full border border-brand-orange/50 animate-ping delay-75 opacity-50" />
                        </>
                    )}
                </div>
            </div>

            {/* Text Feedback */}
            <div className="text-center space-y-4 max-w-lg px-6" onClick={e => e.stopPropagation()}>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                    {isProcessing ? "Processing..." : isRecording ? "Listening..." : "Tap to Speak"}
                </h2>

                <p className="text-lg text-gray-300 font-medium">
                    {isProcessing ? (
                        "Processing your request..."
                    ) : aiResponse?.error ? (
                        <span className="text-red-400">{aiResponse.error}</span>
                    ) : aiResponse ? (
                        <span className="text-green-400 flex items-center justify-center gap-2">
                            <Sparkles size={18} /> Intent Detected: {aiResponse.intent}
                        </span>
                    ) : (
                        "Try saying 'Show me red shoes' or 'Mera order kahan hai?'"
                    )}
                </p>

                {/* Processing Result Preview */}
                {aiResponse && aiResponse.success && (
                    <div className="mt-8 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10 animate-in slide-in-from-bottom-4">
                        {aiResponse.intent === 'SEARCH' && (
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase text-brand-orange tracking-widest mb-2">Result</p>
                                <div className="flex items-center gap-3">
                                    <ShoppingBag size={24} />
                                    <div>
                                        <p className="font-bold">Found products matching your request</p>
                                        <p className="text-xs text-gray-400">Redirecting to results...</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {aiResponse.intent === 'TRACK_ORDER' && (
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase text-brand-orange tracking-widest mb-2">Action</p>
                                <p className="font-bold">Navigating to Order Tracking...</p>
                            </div>
                        )}
                        {aiResponse.intent === 'NAVIGATE' && (
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase text-brand-orange tracking-widest mb-2">Navigation</p>
                                <p className="font-bold">Taking you to {aiResponse.redirect}...</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoiceOverlay;
