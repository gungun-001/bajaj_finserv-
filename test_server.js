const http = require('http');

function postRequest(data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/bfhl',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        });

        req.on('error', (e) => reject(e));
        req.write(JSON.stringify(data));
        req.end();
    });
}

function getRequest() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/health',
            method: 'GET',
        };
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        });
        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function runTests() {
    console.log("Running Tests...");

    // Test GET /health
    try {
        const health = await getRequest();
        console.log("GET /health:", health);
    } catch (e) {
        console.log("GET /health FAILED:", e.message);
    }

    // Test Fibonacci
    try {
        const fib = await postRequest({ "fibonacci": 7 });
        console.log("POST /bfhl (fibonacci):", JSON.stringify(fib));
    } catch (e) { console.log("Fibonacci FAILED", e); }

    // Test Prime
    try {
        const prime = await postRequest({ "prime": [2, 4, 7, 9, 11] });
        console.log("POST /bfhl (prime):", JSON.stringify(prime));
    } catch (e) { console.log("Prime FAILED", e); }

    // Test LCM
    try {
        const lcm = await postRequest({ "lcm": [12, 18, 24] });
        console.log("POST /bfhl (lcm):", JSON.stringify(lcm));
    } catch (e) { console.log("LCM FAILED", e); }

    // Test HCF
    try {
        const hcf = await postRequest({ "hcf": [24, 36, 60] });
        console.log("POST /bfhl (hcf):", JSON.stringify(hcf));
    } catch (e) { console.log("HCF FAILED", e); }

    // Test AI (expect failure or specific message if no key)
    try {
        const ai = await postRequest({ "AI": "What is the capital of India?" });
        console.log("POST /bfhl (AI):", JSON.stringify(ai));
    } catch (e) { console.log("AI FAILED", e); }

    // Test Invalid (Multiple keys)
    try {
        const invalid = await postRequest({ "fibonacci": 5, "prime": [2] });
        console.log("POST /bfhl (invalid double key):", JSON.stringify(invalid));
    } catch (e) { console.log("Invalid Test FAILED", e); }

}

// Wait for server to start roughly
setTimeout(runTests, 2000);
