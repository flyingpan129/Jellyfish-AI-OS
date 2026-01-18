# This script forces Jellyfish to run in a stable PowerShell window
Write-Host "--- JELLYFISH AI OS BOOTING ---" -ForegroundColor Cyan
cd "C:\jelly"
bun run index.ts
Read-Host "Press Enter to shut down OS"