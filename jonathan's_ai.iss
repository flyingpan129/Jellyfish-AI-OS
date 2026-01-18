[Setup]
AppName=Jellyfish AI OS
AppVersion=1.1.0
; --- THIS FORCES IT TO THE DESKTOP ---
DefaultDirName={userdesktop}\JellyfishAI
UsePreviousAppDir=no
; --------------------------------------
DisableDirPage=no
DefaultGroupName=JellyfishAI
UninstallDisplayIcon={app}\jellyfish.exe
PrivilegesRequired=admin
OutputDir={userdocs}\..\Downloads
OutputBaseFilename=jellyfish_installer_desktop

[Tasks]
Name: "installOllama"; Description: "Install Ollama (AI Engine)"; GroupDescription: "Dependencies:"; Flags: checkedonce
Name: "installBun"; Description: "Install Bun (Runtime Environment)"; GroupDescription: "Dependencies:"; Flags: unchecked

[Files]
Source: "C:\jelly\jellyfish.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\jelly\*.txt"; DestDir: "{app}"; Flags: ignoreversion skipifsourcedoesntexist

[Icons]
Name: "{userdesktop}\Jellyfish AI OS"; Filename: "{app}\jellyfish.exe"

[Run]
Filename: "powershell.exe"; \
  Parameters: "-WindowStyle Hidden -Command ""Invoke-WebRequest -Uri 'https://ollama.com/download/OllamaSetup.exe' -OutFile '$env:TEMP\OllamaSetup.exe'; Start-Process '$env:TEMP\OllamaSetup.exe' -ArgumentList '/silent' -Wait"""; \
  StatusMsg: "Installing Ollama..."; \
  Tasks: installOllama

Filename: "powershell.exe"; \
  Parameters: "-WindowStyle Hidden -Command ""iwr https://bun.sh/install.ps1 | iex"""; \
  StatusMsg: "Installing Bun..."; \
  Tasks: installBun

Filename: "{app}\jellyfish.exe"; Description: "Launch Jellyfish"; Flags: nowait postinstall