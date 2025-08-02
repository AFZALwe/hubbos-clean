@echo off
echo 🚀 Preparing files for Hostinger deployment...
echo.

REM Create deployment folder
if not exist "hostinger-deploy" mkdir hostinger-deploy
echo ✅ Created deployment folder

REM Copy client build files
echo 📁 Copying client files...
xcopy "client\build\*" "hostinger-deploy\" /E /I /Y
echo ✅ Client files copied

REM Copy server files
echo 📁 Copying server files...
xcopy "server" "hostinger-deploy\server\" /E /I /Y
echo ✅ Server files copied

REM Copy package files
echo 📁 Copying package files...
copy "package.json" "hostinger-deploy\"
copy "render.yaml" "hostinger-deploy\"
echo ✅ Package files copied

REM Create .htaccess for Node.js
echo 📝 Creating .htaccess file...
echo RewriteEngine On > hostinger-deploy\.htaccess
echo RewriteRule ^$ server/index.js [L] >> hostinger-deploy\.htaccess
echo RewriteCond %%{REQUEST_FILENAME} !-f >> hostinger-deploy\.htaccess
echo RewriteCond %%{REQUEST_FILENAME} !-d >> hostinger-deploy\.htaccess
echo RewriteRule ^(.*)$ server/index.js [QSA,L] >> hostinger-deploy\.htaccess
echo ✅ .htaccess created

echo.
echo 🎉 Deployment package ready!
echo.
echo 📋 Next Steps:
echo 1. Go to Hostinger Control Panel
echo 2. Open File Manager
echo 3. Go to public_html folder
echo 4. Upload all files from 'hostinger-deploy' folder
echo 5. Enable Node.js in Hostinger
echo 6. Set start file: server/index.js
echo.
echo 💾 Files are in 'hostinger-deploy' folder
echo.
pause 