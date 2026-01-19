# 🪼 Jellyfish AI OS v2.7

Jellyfish is a secure, terminal-based operating system layer for local AI. This version features a strict security protocol for Admin and Guest users.

## 🛠️ System Command Map

The following table outlines the permission levels for the Jellyfish Kernel:

| Command | Permission | Description |
| :--- | :--- | :--- |
| `/clear` | **Guest/Admin** | Wipes the terminal screen. |
| `exit` | **Guest/Admin** | Safely shuts down the kernel. |
| `/sys` | **Admin Only** | View hardware, CPU, and RAM usage. |
| `/theme` | **Admin Only** | Change the system colors (Cyan, Matrix, etc). |
| `/view` | **Admin Only** | Access the Black Box chat logs. |
| `/config` | **Admin Only** | Update the System Password. |
| `/delete` | **Admin Only** | Remove AI models from local disk. |

---

## 🔐 Access Control
* **Admin Access:** Requires the System Key (stored in `config.json`). Admins have full access to hardware diagnostics and logs.
* **Guest Access:** Enter `guest` at the login prompt. Guests can chat with the AI but cannot access system settings or view logs.

## 📦 Installation
1. Ensure **Ollama** is running.
2. Compile the kernel:
   ```powershell
   bun build ./index.ts --compile --target bun-windows-x64 --outfile jellyfish.exe
