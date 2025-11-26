@echo off
setlocal

if "%1"=="" (
    echo Usage: copy-config.cmd [app1^|app2]
    exit /b 1
)

if "%1"=="app1" (
    set APP_DIR=app1-kiro-marketplace
    set APP_NAME=Kiro Agents Marketplace
) else if "%1"=="app2" (
    set APP_DIR=app2-devops-hub
    set APP_NAME=DevOps Automation Hub
) else (
    echo Invalid argument. Use app1 or app2
    exit /b 1
)

echo.
echo Copying configuration for %APP_NAME%...
echo.

xcopy /Y "%APP_DIR%\config\*.json" "skeleton\web\public\config\" >nul
if exist "%APP_DIR%\public\images" (
    if not exist "skeleton\web\public\images" mkdir "skeleton\web\public\images"
    xcopy /Y /E "%APP_DIR%\public\images\*" "skeleton\web\public\images\" >nul
)

echo Configuration copied successfully!
echo.
