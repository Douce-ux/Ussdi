// index.js
const express = require("express");
const app = express();
const PORT = 3000;

// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

app.post("/ussd", (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = "";

    if (text === "") {
        // This is the first request
        response = `CON Welcome to My USSD App
1. Check Balance
2. Buy Data`;
    } else if (text === "1") {
        response = `END Your balance is GHS 50.00`;
    } else if (text === "2") {
        response = `CON Choose data plan
1. 1GB - GHS 10
2. 5GB - GHS 45`;
    } else if (text === "2*1") {
        response = `END You have successfully bought 1GB for GHS 10.`;
    } else if (text === "2*2") {
        response = `END You have successfully bought 5GB for GHS 45.`;
    } else {
        response = `END Invalid input.`;
    }

    res.set("Content-Type", "text/plain");
    res.send(response);
});

app.listen(PORT, () => {
    console.log(`USSD app running on http://localhost:${PORT}`);
});
