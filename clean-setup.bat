@echo off
echo 🧹 Cleaning HubBox Repository...
echo.

REM Create backup folder
if not exist "backup" mkdir backup
echo ✅ Backup folder created

REM Copy important files to backup
echo 📁 Copying important files...
xcopy "client" "backup\client" /E /I /Y
xcopy "server" "backup\server" /E /I /Y
copy "package.json" "backup\" /Y
copy ".gitignore" "backup\" /Y
copy "render.yaml" "backup\" /Y
echo ✅ Files backed up

REM Remove large files and folders
echo 🗑️ Removing large files...
if exist "uploads" rmdir /s /q "uploads"
if exist "client\node_modules" rmdir /s /q "client\node_modules"
if exist "server\node_modules" rmdir /s /q "server\node_modules"
if exist ".git" rmdir /s /q ".git"
echo ✅ Large files removed

REM Remove video files from client
if exist "client\*.mp4" del "client\*.mp4"
if exist "client\*.mkv" del "client\*.mkv"
if exist "client\*.avi" del "client\*.avi"
if exist "client\*.mov" del "client\*.mov"
if exist "client\*.zip" del "client\*.zip"
if exist "client\*.rar" del "client\*.rar"

REM Remove video files from server
if exist "server\*.mp4" del "server\*.mp4"
if exist "server\*.mkv" del "server\*.mkv"
if exist "server\*.avi" del "server\*.avi"
if exist "server\*.mov" del "server\*.mov"
if exist "server\*.zip" del "server\*.zip"
if exist "server\*.rar" del "server\*.rar"

echo ✅ Video files removed

REM Initialize fresh git
echo 🔄 Initializing fresh git repository...
git init
git add .
git commit -m "Initial commit: Clean HubBox video app with video player fixes"

echo.
echo 🎉 Setup Complete!
echo.
echo 📋 Next Steps:
echo 1. Go to GitHub.com
echo 2. Create new repository: hubbox-clean
echo 3. Run: git remote add origin https://github.com/AFZALwe/hubbox-clean.git
echo 4. Run: git push -u origin main
echo.
echo 💾 Backup saved in 'backup' folder
echo.
pause 