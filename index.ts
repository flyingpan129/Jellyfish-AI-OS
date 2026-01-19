import { execSync } from "child_process";

// 1. RETRO TYPEWRITER EFFECT WITH SOUND
async function typewriter(text: string) {
    for (const char of text) {
        process.stdout.write(char);
        // Beep sound effect for every letter
        process.stdout.write("\x07"); 
        await new Promise(resolve => setTimeout(resolve, 30)); 
    }
    process.stdout.write("\n");
}

// 2. AI THINKING SPINNER
async function waitForAI(fetchPromise: Promise<any>) {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;
    const loader = setInterval(() => {
        process.stdout.write(`\r\x1b[1;33m  ${frames[i]} Kernel Processing...\x1b[0m`);
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
    console.log("\x1b[1;36m==========================================");
    console.log("      JELLYFISH AI OS v1.9 [ULTIMATE]     ");
    console.log("==========================================\x1b[0m\n");

    try {
        // Fetch models from Ollama
        const tagRes = await fetch("http://127.0.0.1:11434/api/tags");
        const tagData: any = await tagRes.json();
        const models = tagData.models;

        if (models.length === 0) {
            console.log("\x1b[1;31m[!] No models found. Run 'ollama pull tinyllama' first.\x1b[0m");
            return;
        }

        console.log("\x1b[1;33m[SELECT BRAIN MODULE]\x1b[0m");
        models.forEach((m: any, i: number) => {
            console.log(`  [${i + 1}] ${m.name}`);
        });

        const choice = prompt("\n\x1b[1;33mBoot Number >> \x1b[0m");
        const selectedIndex = parseInt(choice || "1") - 1;
        const selectedModel = models[selectedIndex]?.name || models[0].name;

        console.log(`\n\x1b[1;32m[SYSTEM ONLINE]\x1b[0m Kernel Loaded: ${selectedModel}\n`);

        while (true) {
            const input = prompt("\x1b[1;35mYou >> \x1b[0m")?.trim();
            if (!input || input.toLowerCase() === "exit") break;

            // --- SYSTEM DIAGNOSTICS (/sys) ---
            if (input === "/sys") {
                console.log("\x1b[1;34m\n--- SYSTEM DIAGNOSTICS ---");
                try {
                    const ramRaw = execSync('powershell "(Get-Process ollama* | Measure-Object -Property WorkingSet64 -Sum).Sum"').toString().trim();
                    const mb = (parseInt(ramRaw) / 1024 / 1024).toFixed(0);
                    const cpuRaw = execSync('powershell "(Get-Counter \'\\Process(ollama*)\\% Processor Time\').CounterSamples.CookedValue"').toString().trim();
                    const cpuLoad = parseFloat(cpuRaw || "0").toFixed(1);
                    const battRaw = execSync('powershell "(Get-CimInstance Win32_Battery).EstimatedChargeRemaining"').toString().trim();
                    const battery = battRaw ? `${battRaw}%` : "AC Power (Desktop)";

                    console.log(`[MODEL]     ${selectedModel}`);
                    console.log(`[RAM USAGE] ${mb} MB`);
                    console.log(`[CPU LOAD]  ${cpuLoad}%`);
                    console.log(`[BATTERY]   ${battery}`);
                } catch (e) { console.log("[ERROR] Diagnostics partially locked."); }
                console.log("--------------------------\x1b[0m\n");
                continue;
            }

            // --- DELETE MODEL (/delete) ---
            if (input === "/delete") {
                const modelToDelete = prompt("\x1b[1;31mEnter Model Name to Purge >> \x1b[0m")?.trim();
                if (modelToDelete) {
                    try {
                        console.log(`\x1b[1;33m[!] Purging ${modelToDelete} from storage...\x1b[0m`);
                        execSync(`ollama rm ${modelToDelete}`);
                        console.log("\x1b[1;32m[SUCCESS] Module deleted. Restart to refresh list.\x1b[0m\n");
                    } catch (e) {
                        console.log("\x1b[1;31m[ERROR] Could not delete. Check name spelling.\x1b[0m\n");
                    }
                }
                continue;
            }

            if (input === "/clear") { console.clear(); continue; }

            // AI CHAT SECTION
            const aiPromise = fetch("http://127.0.0.1:11434/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    model: selectedModel,
                    messages: [{ role: "user", content: input }],
                    stream: false
                })
            });

            const res = await waitForAI(aiPromise);
            const data: any = await res.json();

            process.stdout.write("\x1b[1;36mJellyfish >> \x1b[0m");
            await typewriter(data.message.content);
            console.log(""); 
        }
    } catch (e) {
        console.log("\x1b[1;31m[CRITICAL ERROR] Kernel panic: Check Ollama connection.\x1b[0m");
    }
}

main();
