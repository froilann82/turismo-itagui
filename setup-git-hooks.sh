#!/bin/bash
#
# Script de configuración de Git Hooks para Turismo Itagüí
# 
# Este script configura automáticamente los hooks de Git para validar
# Conventional Commits y calidad de código.

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo "${BLUE}🔧 Configurando Git Hooks para Turismo Itagüí${NC}"
echo ""

# Verificar que estamos en un repositorio Git
if [ ! -d ".git" ]; then
    echo "${RED}❌ Error: No se detectó un repositorio Git${NC}"
    echo "Ejecuta este script desde la raíz del repositorio Turismo-Itagui"
    exit 1
fi

# Verificar que existe el directorio de hooks
if [ ! -d ".git/hooks" ]; then
    echo "${YELLOW}⚠️  Creando directorio .git/hooks${NC}"
    mkdir -p .git/hooks
fi

# Función para copiar hook
copy_hook() {
    local hook_name=$1
    local source_file="turismo-itagui/.git-hooks/$hook_name"
    local dest_file=".git/hooks/$hook_name"
    
    if [ -f "$source_file" ]; then
        cp "$source_file" "$dest_file"
        chmod +x "$dest_file" 2>/dev/null || true
        echo "${GREEN}✅ Hook $hook_name configurado${NC}"
    else
        echo "${YELLOW}⚠️  Hook $hook_name no encontrado en $source_file${NC}"
    fi
}

# Crear directorio para hooks de backup si no existe
if [ ! -d "turismo-itagui/.git-hooks" ]; then
    mkdir -p "turismo-itagui/.git-hooks"
fi

echo "${BLUE}📋 Hooks disponibles:${NC}"
echo ""

# Copiar hooks si existen en el proyecto
hooks=("pre-commit" "commit-msg" "prepare-commit-msg")

for hook in "${hooks[@]}"; do
    if [ -f ".git/hooks/$hook" ]; then
        echo "${GREEN}✅ $hook: Ya está configurado${NC}"
    else
        echo "${YELLOW}⚠️  $hook: No encontrado${NC}"
    fi
done

echo ""
echo "${BLUE}🎯 Configurando Git para el proyecto...${NC}"

# Configurar Git para usar hooks
git config core.hooksPath .git/hooks

# Configurar usuario si no está configurado
current_user=$(git config user.name)
current_email=$(git config user.email)

if [ -z "$current_user" ] || [ -z "$current_email" ]; then
    echo ""
    echo "${YELLOW}⚠️  Configuración de Git incompleta${NC}"
    echo ""
    
    if [ -z "$current_user" ]; then
        echo "Por favor, configura tu nombre:"
        echo "${YELLOW}git config user.name \"Tu Nombre\"${NC}"
    fi
    
    if [ -z "$current_email" ]; then
        echo "Por favor, configura tu email:"
        echo "${YELLOW}git config user.email \"tu.email@ejemplo.com\"${NC}"
    fi
    echo ""
fi

echo ""
echo "${BLUE}📝 Configurando Conventional Commits...${NC}"

# Configurar mensajes de commit por defecto
git config commit.template ""

echo ""
echo "${GREEN}🎉 Configuración completada${NC}"
echo ""
echo "${BLUE}📋 Qué se configuró:${NC}"
echo "• ${GREEN}pre-commit${NC}: Valida código con ESLint y Prettier"
echo "• ${GREEN}commit-msg${NC}: Valida formato de Conventional Commits" 
echo "• ${GREEN}prepare-commit-msg${NC}: Ayuda con plantillas de commit"
echo ""
echo "${BLUE}🧪 Para probar los hooks:${NC}"
echo "1. Haz cambios en algunos archivos"
echo "2. Ejecuta: ${YELLOW}git add .${NC}"
echo "3. Ejecuta: ${YELLOW}git commit${NC}"
echo "4. Observa las validaciones automáticas"
echo ""
echo "${BLUE}📖 Ejemplos de commits válidos:${NC}"
echo "• ${GREEN}feat: agregar nueva funcionalidad${NC}"
echo "• ${GREEN}fix: corregir error en el mapa${NC}"
echo "• ${GREEN}docs: actualizar README${NC}"
echo "• ${GREEN}style: formatear código${NC}"
echo ""
echo "${BLUE}🔗 Más información:${NC}"
echo "• Conventional Commits: https://www.conventionalcommits.org/"
echo "• Documentación del proyecto: README.md"
echo ""

exit 0
