import { execSync } from "child_process";

// 1. TYPEWRITER WITH SOUND
async function typewriter(text: string) {
    for (const char of text) {
        process.stdout.write(char);
        process.stdout.write("\x07"); 
        await new Promise(resolve => setTimeout(resolve, 30)); 
    }
    process.stdout.write("\n");
}

// 2. ANIMATED LOADING BAR (While waiting for AI)
async function waitForAI(fetchPromise: Promise<any>) {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;
    
    // This runs the animation while the fetch request is pending
    const loader = setInterval(() => {
        process.stdout.write(`\r\x1b[1;33m  ${frames[i]} Jellyfish is thinking...\x1b[0m`);
        i = (i + 1) % frames.length;
    }, 80);

    try {
        const result = await fetchPromise;
        clearInterval(loader);
        process.stdout.write("\r" + " ".repeat(30) + "\r"); // Clear the loader line
        return result;
    } catch (err) {
        clearInterval(loader);
        throw err;
    }
}

async function main() {
    console.clear();
    console.log("\x1b[1;36m==========================================");
    console.log("      JELLYFISH AI OS v1.6 [LOGIC]        ");
    console.log("==========================================\x1b[0m\n");

    try {
        const tagRes = await fetch("http://127.0.0.1:11434/api/tags");
        const tagData: any = await tagRes.json();
        const models = tagData.models;

        console.log("\x1b[1;33m[SELECT BRAIN MODULE]\x1b[0m");
        models.forEach((m: any, i: number) => {
            console.log(`  [${i + 1}] ${m.name}`);
        });

        const choice = prompt("\n\x1b[1;33mBoot Number >> \x1b[0m");
        const selectedIndex = parseInt(choice || "1") - 1;
        const selectedModel = models[selectedIndex]?.name || models[0].name;

        console.log(`\n\x1b[1;32m[SYSTEM ONLINE]\x1b[0m Ready.\n`);

        while (true) {
            const input = prompt("\x1b[1;35mYou >> \x1b[0m")?.trim();
            if (!input || input.toLowerCase() === "exit") break;

            if (input === "/sys") {
                const ramRaw = execSync('powershell "(Get-Process ollama* | Measure-Object -Property WorkingSet64 -Sum).Sum"').toString().trim();
                console.log(`\x1b[1;34m[RAM] ${(parseInt(ramRaw) / 1024 / 1024).toFixed(0)} MB\x1b[0m\n`);
                continue;
            }

            // --- FETCH WITH LOADING ANIMATION ---
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
        console.log("\x1b[1;31m[CRITICAL ERROR] Connection Lost.\x1b[0m");
    }
}

main();