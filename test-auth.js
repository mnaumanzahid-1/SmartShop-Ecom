const axios = require('axios');

const testAuth = async () => {
    try {
        // Test Register
        const regRes = await axios.post('http://localhost:5000/api/v1/auth/register', {
            name: 'sohaib hassan',
            email: 'sohaib@test.com',
            password: 'password123'
        });
        console.log('Registration Success');

        // Test Login
        const loginRes = await axios.post('http://localhost:5000/api/v1/auth/login', {
            email: 'sohaib@test.com',
            password: 'password123'
        });
        console.log('Login Success:', loginRes.data);
    } catch (error) {
        console.error('Auth Test Failed:', error.response?.data || error.message);
    }
};

testAuth();
