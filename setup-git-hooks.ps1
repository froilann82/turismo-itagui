# Setup Git Hooks para Turismo Itagüí
# Script de PowerShell para configurar hooks de Git en Windows

# Colores para PowerShell
$ErrorActionPreference = "Stop"

function Write-ColorText {
    param(
        [string]$Text,
        [string]$Color = "White"
    )
    Write-Host $Text -ForegroundColor $Color
}

function Write-Success { param([string]$Text) Write-ColorText "✅ $Text" "Green" }
function Write-Error { param([string]$Text) Write-ColorText "❌ $Text" "Red" }
function Write-Warning { param([string]$Text) Write-ColorText "⚠️  $Text" "Yellow" }
function Write-Info { param([string]$Text) Write-ColorText "ℹ️  $Text" "Cyan" }

Write-Host ""
Write-ColorText "🔧 Configurando Git Hooks para Turismo Itagüí" "Blue"
Write-Host ""

# Verificar que estamos en un repositorio Git
if (-not (Test-Path ".git")) {
    Write-Error "No se detectó un repositorio Git"
    Write-Host "Ejecuta este script desde la raíz del repositorio Turismo-Itagui"
    exit 1
}

# Verificar que existe el directorio de hooks
if (-not (Test-Path ".git\hooks")) {
    Write-Warning "Creando directorio .git\hooks"
    New-Item -ItemType Directory -Path ".git\hooks" -Force | Out-Null
}

# Función para copiar hook
function Copy-Hook {
    param(
        [string]$HookName
    )
    
    $sourcePath = "turismo-itagui\.git-hooks\$HookName"
    $destPath = ".git\hooks\$HookName"
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $destPath -Force
        Write-Success "Hook $HookName configurado"
        return $true
    } else {
        Write-Warning "Hook $HookName no encontrado en $sourcePath"
        return $false
    }
}

# Crear directorio para hooks de backup si no existe
if (-not (Test-Path "turismo-itagui\.git-hooks")) {
    New-Item -ItemType Directory -Path "turismo-itagui\.git-hooks" -Force | Out-Null
}

Write-ColorText "📋 Configurando hooks:" "Blue"
Write-Host ""

# Lista de hooks a configurar
$hooks = @("pre-commit", "commit-msg", "prepare-commit-msg")

foreach ($hook in $hooks) {
    if (Test-Path ".git\hooks\$hook") {
        Write-Success "$hook : Ya está configurado"
    } else {
        if (Copy-Hook $hook) {
            # Hook copiado exitosamente
        } else {
            Write-Warning "$hook : No se pudo configurar"
        }
    }
}

Write-Host ""
Write-ColorText "🎯 Configurando Git para el proyecto..." "Blue"

# Configurar Git para usar hooks
try {
    git config core.hooksPath .git/hooks
    Write-Success "Configurado core.hooksPath"
} catch {
    Write-Warning "No se pudo configurar core.hooksPath"
}

# Verificar configuración de usuario
try {
    $currentUser = git config user.name
    $currentEmail = git config user.email
    
    if ([string]::IsNullOrEmpty($currentUser) -or [string]::IsNullOrEmpty($currentEmail)) {
        Write-Host ""
        Write-Warning "Configuración de Git incompleta"
        Write-Host ""
        
        if ([string]::IsNullOrEmpty($currentUser)) {
            Write-Host "Por favor, configura tu nombre:"
            Write-ColorText "git config user.name `"Tu Nombre`"" "Yellow"
        }
        
        if ([string]::IsNullOrEmpty($currentEmail)) {
            Write-Host "Por favor, configura tu email:"
            Write-ColorText "git config user.email `"tu.email@ejemplo.com`"" "Yellow"
        }
        Write-Host ""
    } else {
        Write-Success "Usuario Git configurado: $currentUser <$currentEmail>"
    }
} catch {
    Write-Warning "No se pudo verificar la configuración de usuario de Git"
}

Write-Host ""
Write-ColorText "📝 Configurando Conventional Commits..." "Blue"

# Limpiar template de commit por defecto
try {
    git config --unset commit.template 2>$null
} catch {
    # Ignorar error si no existe
}

Write-Host ""
Write-ColorText "🎉 Configuración completada" "Green"
Write-Host ""
Write-ColorText "📋 Qué se configuró:" "Blue"
Write-Success "pre-commit: Valida código con ESLint y Prettier"
Write-Success "commit-msg: Valida formato de Conventional Commits"
Write-Success "prepare-commit-msg: Ayuda con plantillas de commit"
Write-Host ""
Write-ColorText "🧪 Para probar los hooks:" "Blue"
Write-Host "1. Haz cambios en algunos archivos"
Write-ColorText "2. Ejecuta: git add ." "Yellow"
Write-ColorText "3. Ejecuta: git commit" "Yellow"
Write-Host "4. Observa las validaciones automáticas"
Write-Host ""
Write-ColorText "📖 Ejemplos de commits válidos:" "Blue"
Write-ColorText "• feat: agregar nueva funcionalidad" "Green"
Write-ColorText "• fix: corregir error en el mapa" "Green"
Write-ColorText "• docs: actualizar README" "Green"
Write-ColorText "• style: formatear código" "Green"
Write-Host ""
Write-ColorText "🔗 Más información:" "Blue"
Write-Host "• Conventional Commits: https://www.conventionalcommits.org/"
Write-Host "• Documentación del proyecto: README.md"
Write-Host ""

# Preguntar si quiere hacer un commit de prueba
$testCommit = Read-Host "¿Quieres hacer un commit de prueba ahora? (y/N)"
if ($testCommit -eq "y" -or $testCommit -eq "Y") {
    Write-Host ""
    Write-ColorText "🧪 Creando commit de prueba..." "Blue"
    
    # Crear un archivo temporal para el test
    $testFile = "turismo-itagui\test-conventional-commits.txt"
    "Archivo de prueba para validar Conventional Commits - $(Get-Date)" | Out-File $testFile
    
    try {
        git add $testFile
        Write-Info "Archivo de prueba agregado al stage"
        Write-Host ""
        Write-ColorText "Ahora ejecuta: git commit" "Yellow"
        Write-Host "Y usa un mensaje como: feat: agregar validación de conventional commits"
    } catch {
        Write-Error "No se pudo agregar el archivo de prueba"
    }
}

Write-Host ""
Write-ColorText "✨ Setup completado exitosamente" "Green"
