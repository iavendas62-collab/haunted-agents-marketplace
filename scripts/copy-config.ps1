param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("app1", "app2")]
    [string]$App
)

$appMap = @{
    "app1" = @{
        dir = "app1-kiro-marketplace"
        name = "Kiro Agents Marketplace"
    }
    "app2" = @{
        dir = "app2-devops-hub"
        name = "DevOps Automation Hub"
    }
}

$appInfo = $appMap[$App]
$sourceDir = Join-Path $PSScriptRoot ".." $appInfo.dir "config"
$destDir = Join-Path $PSScriptRoot ".." "skeleton" "web" "public" "config"

Write-Host ""
Write-Host "📦 Copying configuration for $($appInfo.name)..." -ForegroundColor Cyan
Write-Host ""

# Ensure destination directory exists
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

# Copy configuration files
$configFiles = @("branding.json", "categories.json", "agents.json")

foreach ($file in $configFiles) {
    $sourcePath = Join-Path $sourceDir $file
    $destPath = Join-Path $destDir $file
    
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "✅ Copied $file" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Warning: $file not found in $sourceDir" -ForegroundColor Yellow
    }
}

# Copy images if they exist
$sourceImagesDir = Join-Path $PSScriptRoot ".." $appInfo.dir "public" "images"
$destImagesDir = Join-Path $PSScriptRoot ".." "skeleton" "web" "public" "images"

if (Test-Path $sourceImagesDir) {
    if (-not (Test-Path $destImagesDir)) {
        New-Item -ItemType Directory -Path $destImagesDir -Force | Out-Null
    }
    
    $images = Get-ChildItem -Path $sourceImagesDir
    foreach ($image in $images) {
        Copy-Item -Path $image.FullName -Destination $destImagesDir -Force
    }
    Write-Host "✅ Copied $($images.Count) image(s)" -ForegroundColor Green
}

Write-Host ""
Write-Host "✨ Configuration ready for $($appInfo.name)!" -ForegroundColor Green
Write-Host ""
