import React from 'react';

// Simple test component to verify React is rendering
function App() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1 style={{ color: '#f57224', fontSize: '48px', fontWeight: 'bold' }}>
                SmartShop Test
            </h1>
            <p style={{ fontSize: '20px', marginTop: '20px' }}>
                If you can see this, React is working! ✅
            </p>
            <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px'
            }}>
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Diagnostic Info:</h2>
                <ul style={{ lineHeight: '1.8' }}>
                    <li>✅ React is rendering</li>
                    <li>✅ JavaScript is executing</li>
                    <li>⏳ Checking Tailwind CSS...</li>
                </ul>
            </div>
            <div className="bg-brand-orange text-white p-4 mt-4 rounded">
                If this box has an orange background, Tailwind is working!
            </div>
        </div>
    );
}

export default App;
