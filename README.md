# 🪼 Jellyfish AI OS v2.5

Jellyfish is a high-performance, terminal-based operating system layer for local AI models. Built with **Bun** and powered by **Ollama**, it provides a secure, retro-themed environment for private AI interactions.

## ✨ Core Features
* **🔐 Dual-Login Security:** Admin access for full control; Guest access for restricted privacy.
* **📊 Live Diagnostics:** Monitor CPU, RAM, and Battery life in real-time with `/sys`.
* **💾 Black Box Logger:** Encrypted session logging to `logs.txt` (Admin only).
* **🎨 UI Theme Engine:** Toggle between Cyan, Matrix Green, Retro Amber, and Lava Red.
* **🧹 Brain Management:** Pull, use, or purge brain modules (models) directly from the OS.

---

## 🚀 Installation & Setup

### 1. Prerequisites
* Install [Ollama](https://ollama.com/)
* Install [Bun.sh](https://bun.sh/)

### 2. Kernel Boot
Clone the repository and install dependencies:
```powershell
cd jellyfish
bun install
