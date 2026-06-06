const axios = require('axios');

const testQuery = "Yaar mujhe running shoes dikhao 5000 tak, sasty walay";

async function testAI() {
    console.log("🚀 Sending Urdu query to server (Port 5005):", testQuery);

    try {
        const response = await axios.post('http://localhost:5005/api/v1/voice/analyze', {
            text: testQuery
        });

        console.log("✅ Server Response (Structured JSON):");
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("❌ Test Failed:");
        if (error.response) {
            console.error(JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
    }
}

testAI();
