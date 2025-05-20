const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.post("/ussd", (req, res) => {
    let { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = "";
    let inputs = text.split("*");

    // Handle "0" to go back
    if (inputs[inputs.length - 1] === "0") {
        inputs.pop(); // Remove '0'
        inputs.pop(); // Remove previous step
        text = inputs.join("*");
        inputs = text.split("*");
    }

    const level = inputs.length;
    const lang = inputs[0]; // 1 = English, 2 = Kinyarwanda

    // Menu Flow
    if (text === "") {
        response = `CON Welcome / Murakaza neza
1. English
2. Kinyarwanda`;
    }
    else if (level === 1) {
        if (lang === "1") {
            response = `CON Main Menu:
1. Check Balance
2. Buy Data
3. Buy Airtime
4. Contact Support
0. Back`;
        } else if (lang === "2") {
            response = `CON Ibikubiyeho:
1. Kureba amafaranga
2. Kugura internet
3. Kugura airtime
4. Kuvugana n'abakiriya
0. Subira inyuma`;
        } else {
            response = `END Invalid language selection.`;
        }
    }

    // === Check Balance ===
    else if (level === 2 && inputs[1] === "1") {
        response = lang === "1"
            ? `END Your balance is GHS 50.00`
            : `END Ufite amafaranga 50.00 Frw`;
    }

    // === Buy Data ===
    else if (level === 2 && inputs[1] === "2") {
        response = lang === "1"
            ? `CON Choose data plan:
1. 1GB - GHS 10
2. 5GB - GHS 45
0. Back`
            : `CON Hitamo internet:
1. 1GB - 1000 Frw
2. 5GB - 4500 Frw
0. Subira inyuma`;
    }
    else if (level === 3 && inputs[1] === "2" && inputs[2] === "1") {
        response = lang === "1"
            ? `END You have successfully bought 1GB for GHS 10.`
            : `END Waguzwe 1GB kuri 1000 Frw.`;
    }
    else if (level === 3 && inputs[1] === "2" && inputs[2] === "2") {
        response = lang === "1"
            ? `END You have successfully bought 5GB for GHS 45.`
            : `END Waguzwe 5GB kuri 4500 Frw.`;
    }

    // === Buy Airtime ===
    else if (level === 2 && inputs[1] === "3") {
        response = lang === "1"
            ? `CON Enter amount to buy (GHS):`
            : `CON Andika amafaranga ushaka kugura:`;
    }
    else if (level === 3 && inputs[1] === "3") {
        let amount = inputs[2];
        response = lang === "1"
            ? `END You have successfully bought GHS ${amount} airtime.`
            : `END Waguzwe airtime ingana na ${amount} Frw.`;
    }

    // === Contact Support ===
    else if (level === 2 && inputs[1] === "4") {
        response = lang === "1"
            ? `END Contact support: 1234 or help@example.com`
            : `END Hamagara abakiriya kuri: 1234 cyangwa help@example.com`;
    }

    else {
        response = lang === "1"
            ? `END Invalid input.`
            : `END Icyo winjije si cyo.`;
    }

    res.set("Content-Type", "text/plain");
    res.send(response);
});

app.listen(PORT, () => {
    console.log(`USSD app running on http://localhost:${PORT}`);
});


app.listen(PORT, () => {
    console.log(`USSD app running on http://localhost:${PORT}`);
});

