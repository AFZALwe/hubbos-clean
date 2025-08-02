@echo off
echo 🚀 Creating Static Hosting Package...
echo.

REM Create static-package folder
if not exist "static-package" mkdir static-package
echo ✅ Created static-package folder

REM Copy client build files
echo 📁 Copying client build files...
xcopy "client\build\*" "static-package\" /E /I /Y
echo ✅ Client build files copied

REM Create .htaccess for SPA routing
echo 📝 Creating .htaccess for SPA...
echo RewriteEngine On > static-package\.htaccess
echo RewriteCond %%{REQUEST_FILENAME} !-f >> static-package\.htaccess
echo RewriteCond %%{REQUEST_FILENAME} !-d >> static-package\.htaccess
echo RewriteRule ^(.*)$ index.html [QSA,L] >> static-package\.htaccess
echo ✅ .htaccess created

echo.
echo 🎉 Static package ready!
echo.
echo 📋 Files included:
echo - index.html (React frontend)
echo - static/ folder (React assets)
echo - .htaccess (SPA routing)
echo.
echo 💾 Package is in 'static-package' folder
echo 📦 Upload to Hostinger public_html folder
echo.
echo 🔗 Backend will remain on Render
echo 🌐 Frontend will be on Hostinger
echo.
pause 