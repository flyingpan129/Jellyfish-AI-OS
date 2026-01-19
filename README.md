# 🪼 JELLYFISH AI OS [ULTIMATE EDITION]
A sci-fi themed terminal interface for local AI models.

## 🚀 Features
- **Typewriter FX:** Real-time text generation with retro sound.
- **Thinking Loader:** Animated spinner while the AI processes.
- **System Diagnostics:** Type `/sys` to see live RAM usage.
- **Model Selector:** Boot into any AI model you have in Ollama.
- **Windows Installer:** Includes a professional Setup Wizard.

## 🛠️ How to Run (For Developers)
1. Install [Ollama](https://ollama.com) and [Bun](https://bun.sh).
2. Clone this folder.
3. Run `bun install`.
4. Run `bun run index.ts` or build with `bun build ./index.ts --compile --outfile jellyfish.exe`.

## 📦 Download (For Users)

If you just want to use the app, go to the **Releases** tab on the right and download `jellyfish_installer.exe`.
## 📥 Installation & Setup

To get the full Jellyfish experience, follow these steps:

### 1. Download the Installer
* Go to the [Releases](https://github.com/YOUR_USERNAME/Jellyfish-AI-OS/releases) page.
* Download the latest `jellyfish_installer_desktop.exe`.

### 2. Run the Setup Wizard
When you run the installer, you will be given a choice to install the required "Dependencies":
* **Install Ollama (AI Engine):** **(Highly Recommended)** This is the "Brain" of the OS. The installer will download and set it up for you.
* **Install Bun (Runtime):** **(Recommended)** This allows the OS to process commands at ultra-fast speeds.
* **Recommendation:** For the best experience, we recommend checking **both** boxes during installation to ensure the OS has everything it needs to boot.

---

## 📂 Manual Download (For Developers)
If you want to download every file manually instead of using the installer:
1.  Click the green **Code** button at the top of this page.
2.  Select **Download ZIP**.
3.  Extract the folder and ensure you have `index.ts`, `package.json`, and the `.iss` wizard script.
## 📖 Instructions

### 1. Booting the OS
* **Launch:** Run `jellyfish.exe` from your desktop.
* **Select Brain:** Use the number keys to pick an AI model from your Ollama list and press **Enter**.
* **Loading:** Wait for the system initialization bar to reach 100%.

### 2. Global Commands
Type these directly into the chat prompt to control the OS:
* `/sys` — **System Diagnostics:** Shows real-time RAM usage of the AI brain.
* `/clear` — **Purge Terminal:** Wipes the screen for a fresh start.
* `exit` — **Shut Down:** Safely closes the Jellyfish kernel.

### 3. Visual Setup (For Best Experience)
If the text is too small, follow these steps to make it "Bigger":
* **Right-click** the window title bar.
* Select **Properties** > **Font**.
* Choose size **24** or **28** and click **OK**.


## 📦 Downloading the OS
For the best experience, please ensure you download the **Source Code** if you plan on modifying the Kernel:

1. Click the green **Code** button at the top.
2. Select **Download ZIP**.
3. Keep the `index.ts` file in the same folder as your `jellyfish.exe` for easy development.

---

## 🛠️ Troubleshooting (Solve Common Issues)

If the OS "Kernel Panics" or shows an error, check these steps:

### 1. "Ollama not found" or "Connection Error"
* **Solution:** Ensure Ollama is running in your taskbar. If not, open your Start Menu and type "Ollama" to launch it.
* **Command:** Run `ollama list` in a terminal to verify the AI brain is alive.

### 2. "Brain Module Not Showing"
* **Issue:** You select a number but nothing happens.
* **Solution:** You must pull a model first! Run `ollama pull tinyllama` in PowerShell.

### 3. "ModuleNotFound" during Build
* **Issue:** You get an error trying to compile `index.ts`.
* **Solution:** Make sure you are in the correct folder! Type `cd C:\jelly` before running the `bun build` command.

### 4. "Battery/CPU Diagnostics 0%"
* **Solution:** On some desktop PCs without a battery, the `[BATTERY]` status will say "AC Power." This is normal! For CPU, ensure the AI is actually typing when you run `/sys`.

## 🧹 System Maintenance
To save disk space, you can remove old AI Brains that you no longer use.

**Command to Delete:**
Open PowerShell and type:
`ollama rm [model_name]`

*Example: `ollama rm tinyllama`*

### 🧹 Storage Management (/delete)
The Jellyfish Kernel allows for direct hardware maintenance:
1. Type `/delete` to enter the Purge sequence.
2. Enter the exact name of the AI Brain you wish to remove.
3. The OS will automatically trigger `ollama rm` to free up disk space.
*Note: Restart the OS to see the updated module list.*
