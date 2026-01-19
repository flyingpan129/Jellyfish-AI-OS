import { execSync } from "child_process";
import * as fs from "fs";

// THEME CONFIGURATION
let themeColor = "\x1b[1;36m"; 
let themeName = "CYAN";

// --- PASSWORD SYSTEM ---
const CONFIG_FILE = "config.json";
let systemPassword = "admin123"; 

// Initialize or Load Config
try {
    if (fs.existsSync(CONFIG_FILE)) {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
        systemPassword = config.password;
    } else {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify({ password: systemPassword }));
    }
} catch (e) {
    console.log("Config error, using default password.");
}

async function typewriter(text: string) {
    for (const char of text) {
        process.stdout.write(char);
        process.stdout.write("\x07"); 
        await new Promise(resolve => setTimeout(resolve, 30)); 
    }
    process.stdout.write("\n");
}

function saveToLog(user: string, ai: string) {
    const timestamp = new Date().toLocaleString();
    const logEntry = `[${timestamp}]\nUSER: ${user}\nJELLYFISH: ${ai}\n------------------\n`;
    fs.appendFileSync("logs.txt", logEntry);
}

async function waitForAI(fetchPromise: Promise<any>) {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;
    const loader = setInterval(() => {
        process.stdout.write(`\r${themeColor}  ${frames[i]} Kernel Processing...\x1b[0m`);
        i = (i + 1) % frames.length;
    }, 80);
    try {
        const result = await fetchPromise;
        clearInterval(loader);
        process.stdout.write("\r" + " ".repeat(40) + "\r"); 
        return result;
    } catch (err) {
        clearInterval(loader);
        throw err;
    }
}

async function main() {
    console.clear();
    console.log(`\x1b[1;31m==========================================`);
    console.log(`      JELLYFISH OS - SECURITY GATE        `);
    console.log(`==========================================\x1b[0m\n`);

    // --- DEBUGGING PASSWORD CHALLENGE ---
    const rawInput = prompt("ENTER SYSTEM KEY (or 'guest') >> ");
    const attempt = rawInput?.trim();
    
    let isGuest = false;
    if (attempt === "guest") {
        isGuest = true;
        console.log("\x1b[1;32m[OK] Guest session verified.\x1b[0m");
    } else if (attempt === systemPassword) {
        isGuest = false;
        console.log("\x1b[1;32m[OK] Admin access granted.\x1b[0m");
    } else {
        console.log("\n\x1b[1;31m[ACCESS DENIED] Password mismatch.\x1b[0m");
        console.log(`Expected: [${systemPassword}]`);
        console.log(`Received: [${attempt}]`);
        prompt("\nPress ENTER to close the terminal..."); 
        process.exit();
    }

    // Small delay to show "Access Granted" before clearing
    await new Promise(r => setTimeout(r, 800));

    console.clear();
    const modeName = isGuest ? "GUEST MODE" : "ADMIN MODE";
    console.log(`${themeColor}==========================================`);
    console.log(`      JELLYFISH AI OS v2.5 [${modeName}]       `);
    console.log(`==========================================\x1b[0m\n`);

    try {
        // Test connection to Ollama before starting
        const tagRes = await fetch("http://127.0.0.1:11434/api/tags");
        const tagData: any = await tagRes.json();
        const models = tagData.models;

        let isLoggingEnabled = false;
        if (!isGuest) {
            const logChoice = prompt(`${themeColor}Enable Black Box Logging? (y/n) >> \x1b[0m`)?.toLowerCase();
            isLoggingEnabled = logChoice === 'y';
        }

        console.log(`\n${themeColor}[SELECT BRAIN MODULE]\x1b[0m`);
        models.forEach((m: any, i: number) => console.log(`  [${i + 1}] ${m.name}`));

        const choice = prompt(`\n${themeColor}Boot Number >> \x1b[0m`);
        const selectedIndex = parseInt(choice || "1") - 1;
        const selectedModel = models[selectedIndex]?.name || models[0].name;

        while (true) {
            const input = prompt(`${themeColor}You >> \x1b[0m`)?.trim();
            if (!input || input.toLowerCase() === "exit") break;

            // Command Lockdown
            if (input === "/config" || input === "/view" || input === "/delete") {
                if (isGuest) {
                    console.log("\x1b[1;31m[ERROR] Access Denied: Guests cannot use admin tools.\x1b[0m\n");
                    continue;
                }
                if (input === "/config") {
                    const newPass = prompt("Enter NEW Admin Key >> ");
                    if (newPass) {
                        systemPassword = newPass;
                        fs.writeFileSync(CONFIG_FILE, JSON.stringify({ password: newPass }));
                        console.log("\x1b[1;32m[SUCCESS] Key updated.\x1b[0m\n");
                    }
                    continue;
                }
                if (input === "/view") {
                    if (fs.existsSync("logs.txt")) {
                        console.log(fs.readFileSync("logs.txt", "utf8").split("\n").slice(-11).join("\n"));
                    }
                    continue;
                }
                if (input === "/delete") {
                    const modelToDelete = prompt("\x1b[1;31mPurge Name >> \x1b[0m")?.trim();
                    try { execSync(`ollama rm ${modelToDelete}`); console.log("Deleted."); } catch(e) {}
                    continue;
                }
            }

            if (input === "/theme") {
                const tChoice = prompt("[1] Cyan [2] Matrix [3] Amber [4] Lava >> ");
                if (tChoice === "1") themeColor = "\x1b[1;36m";
                if (tChoice === "2") themeColor = "\x1b[1;32m";
                if (tChoice === "3") themeColor = "\x1b[1;33m";
                if (tChoice === "4") themeColor = "\x1b[1;31m";
                continue;
            }

            if (input === "/clear") { console.clear(); continue; }

            // AI CHAT
            const aiPromise = fetch("http://127.0.0.1:11434/api/chat", {
                method: "POST",
                body: JSON.stringify({ model: selectedModel, messages: [{ role: "user", content: input }], stream: false })
            });

            const res = await waitForAI(aiPromise);
            const data: any = await res.json();
            const reply = data.message.content;

            process.stdout.write(`${themeColor}Jellyfish >> \x1b[0m`);
            await typewriter(reply);

            if (isLoggingEnabled) saveToLog(input, reply);
            console.log(""); 
        }
    } catch (e) {
        console.log("\x1b[1;31m[CRITICAL ERROR] Kernel panic: Is Ollama running?\x1b[0m");
        prompt("Press ENTER to exit...");
    }
}

main();
