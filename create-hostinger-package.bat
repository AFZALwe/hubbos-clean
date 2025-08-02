@echo off
echo 🚀 Creating Hostinger deployment package...
echo.

REM Create hostinger-package folder
if not exist "hostinger-package" mkdir hostinger-package
echo ✅ Created hostinger-package folder

REM Copy client build files
echo 📁 Copying client build files...
xcopy "client\build\*" "hostinger-package\" /E /I /Y
echo ✅ Client build files copied

REM Copy server files
echo 📁 Copying server files...
xcopy "server" "hostinger-package\server\" /E /I /Y
echo ✅ Server files copied

REM Copy package files
echo 📁 Copying package files...
copy "package.json" "hostinger-package\"
copy "render.yaml" "hostinger-package\"
echo ✅ Package files copied

REM Create .htaccess for Node.js
echo 📝 Creating .htaccess file...
echo RewriteEngine On > hostinger-package\.htaccess
echo RewriteRule ^$ server/index.js [L] >> hostinger-package\.htaccess
echo RewriteCond %%{REQUEST_FILENAME} !-f >> hostinger-package\.htaccess
echo RewriteCond %%{REQUEST_FILENAME} !-d >> hostinger-package\.htaccess
echo RewriteRule ^(.*)$ server/index.js [QSA,L] >> hostinger-package\.htaccess
echo ✅ .htaccess created

REM Create environment file
echo 📝 Creating .env file...
echo MONGODB_URI=mongodb+srv://ak7477586:1234567890B@cluster0.m8ck8zr.mongodb.net/hubbox > hostinger-package\.env
echo JWT_SECRET=mySuperSecretKey123 >> hostinger-package\.env
echo PORT=3000 >> hostinger-package\.env
echo ✅ .env file created

echo.
echo 🎉 Hostinger package ready!
echo.
echo 📋 Files included:
echo - index.html (React frontend)
echo - static/ folder (React assets)
echo - server/ folder (Node.js backend)
echo - package.json (dependencies)
echo - .htaccess (Node.js routing)
echo - .env (environment variables)
echo.
echo 💾 Package is in 'hostinger-package' folder
echo 📦 You can now zip this folder and upload to Hostinger
echo.
pause 