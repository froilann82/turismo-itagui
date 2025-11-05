# 🪝 Git Hooks - Conventional Commits

Esta documentación explica cómo configurar y usar los Git Hooks para validar automáticamente que los commits sigan la especificación de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## 📋 Tabla de Contenidos

- [¿Qué son los Git Hooks?](#qué-son-los-git-hooks)
- [Configuración Automática](#configuración-automática)
- [Configuración Manual](#configuración-manual)
- [Hooks Implementados](#hooks-implementados)
- [Conventional Commits](#conventional-commits)
- [Ejemplos Prácticos](#ejemplos-prácticos)
- [Solución de Problemas](#solución-de-problemas)

## 🔧 ¿Qué son los Git Hooks?

Los Git Hooks son scripts que se ejecutan automáticamente en ciertos eventos de Git (antes/después de commits, push, etc.). En este proyecto usamos hooks para:

- **Validar formato de commits** según Conventional Commits
- **Ejecutar linting** con ESLint antes del commit
- **Verificar formato** con Prettier
- **Prevenir commits** de archivos sensibles

## 🚀 Configuración Automática

### Windows (PowerShell)
```powershell
# Desde la raíz del proyecto
.\turismo-itagui\setup-git-hooks.ps1
```

### Linux/Mac (Bash)
```bash
# Desde la raíz del proyecto
chmod +x turismo-itagui/setup-git-hooks.sh
./turismo-itagui/setup-git-hooks.sh
```

### Verificar Instalación
```bash
# Verificar que los hooks están instalados
ls -la .git/hooks/

# Deberías ver:
# -rwxr-xr-x  commit-msg
# -rwxr-xr-x  pre-commit  
# -rwxr-xr-x  prepare-commit-msg
```

## ⚙️ Configuración Manual

Si prefieres configurar manualmente:

```bash
# 1. Copiar hooks desde el proyecto
cp turismo-itagui/.git-hooks/* .git/hooks/

# 2. Hacer ejecutables (Linux/Mac)
chmod +x .git/hooks/*

# 3. Configurar Git
git config core.hooksPath .git/hooks
```

## 🪝 Hooks Implementados

### 1. `pre-commit`
Se ejecuta **antes** de crear el commit. Valida:

- ✅ **ESLint**: Calidad de código JavaScript/JSX
- ✅ **Prettier**: Formato consistente de código
- ✅ **Archivos sensibles**: Previene commit de `.env`, `node_modules`, etc.
- ✅ **Nombres de archivos**: Evita caracteres no-ASCII
- ✅ **Whitespace**: Elimina espacios en blanco innecesarios

**Ejemplo de output:**
```
🔍 Ejecutando validaciones pre-commit...

1. Validando nombres de archivos...
✅ Nombres de archivos válidos

2. Validando archivos sensibles...
✅ No se detectaron archivos sensibles

3. Ejecutando ESLint...
✅ ESLint pasó sin errores

4. Validando formato con Prettier...
✅ Todos los archivos están correctamente formateados

5. Validando whitespace...
✅ No hay errores de whitespace

🎉 Todas las validaciones pre-commit pasaron exitosamente
```

### 2. `commit-msg`
Se ejecuta **después** de escribir el mensaje pero **antes** de completar el commit. Valida:

- ✅ **Formato Conventional Commits**: `tipo(scope): descripción`
- ✅ **Tipos válidos**: feat, fix, docs, style, refactor, test, chore, etc.
- ✅ **Longitud**: Máximo 50 caracteres en el subject
- ✅ **Formato**: Sin punto final, minúsculas recomendadas

**Ejemplo de output:**
```
🔍 Validando mensaje de commit: "feat(mapa): agregar filtros por categoría"

✅ Mensaje de commit válido según Conventional Commits

📊 Información del commit:
   Tipo: feat
   Scope: mapa
   Breaking Change: No
```

### 3. `prepare-commit-msg`
Se ejecuta **antes** de abrir el editor de commits. Proporciona:

- 💡 **Template automático** basado en archivos modificados
- 📝 **Sugerencias de tipo** según los cambios
- 📋 **Lista de archivos** modificados
- 📊 **Estadísticas** del commit
- 📖 **Ejemplos** de formato correcto

## 📝 Conventional Commits

### Formato Básico
```
<tipo>[scope opcional]: <descripción>

[cuerpo opcional]

[footer(s) opcional(es)]
```

### Tipos Disponibles

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **feat** | Nueva funcionalidad | `feat: agregar mapa interactivo` |
| **fix** | Corrección de bug | `fix: corregir error en navegación` |
| **docs** | Cambios en documentación | `docs: actualizar README` |
| **style** | Formato de código | `style: aplicar prettier` |
| **refactor** | Refactoring | `refactor: simplificar componente` |
| **test** | Tests | `test: agregar pruebas unitarias` |
| **chore** | Tareas de mantenimiento | `chore: actualizar dependencias` |
| **perf** | Mejoras de performance | `perf: optimizar renderizado` |
| **ci** | Configuración CI/CD | `ci: agregar workflow GitHub` |
| **build** | Sistema de build | `build: configurar Vite` |
| **revert** | Revertir commit | `revert: deshacer cambio anterior` |

### Scopes Sugeridos para Turismo Itagüí

| Scope | Descripción | Ejemplo |
|-------|-------------|---------|
| **components** | Componentes React | `feat(components): crear LugarCard` |
| **context** | Context API/Hooks | `fix(context): corregir FavoritosProvider` |
| **styles** | Archivos CSS | `style(styles): mejorar responsive design` |
| **mapa** | Funcionalidad del mapa | `feat(mapa): agregar markers dinámicos` |
| **favoritos** | Sistema de favoritos | `fix(favoritos): persistencia localStorage` |
| **eventos** | Eventos y calendario | `feat(eventos): filtrar por fecha` |
| **deps** | Dependencias | `chore(deps): actualizar React` |
| **config** | Configuración | `chore(config): ajustar ESLint` |

### Breaking Changes

Para indicar cambios que rompen compatibilidad:

```bash
# Con ! después del tipo
feat!: cambiar API de favoritos

# Con footer BREAKING CHANGE
feat: actualizar sistema de rutas

BREAKING CHANGE: Las rutas ahora requieren el prefijo /app
```

## 🎯 Ejemplos Prácticos

### ✅ Commits Válidos

```bash
# Funcionalidad simple
feat: agregar búsqueda de lugares

# Con scope
feat(mapa): implementar zoom automático

# Corrección de bug
fix(favoritos): corregir duplicados en lista

# Documentación
docs(readme): agregar guía de instalación

# Refactoring
refactor(components): extraer lógica común

# Breaking change
feat(api)!: cambiar estructura de datos de lugares

# Con cuerpo y footer
fix: corregir error de renderizado en móviles

El mapa no se mostraba correctamente en pantallas
menores a 768px debido a un problema con el CSS.

Fixes #123
Reviewed-by: @usuario
```

### ❌ Commits Inválidos

```bash
# Sin tipo
agregar nueva funcionalidad

# Tipo inválido  
feature: agregar mapa

# Sin descripción
feat:

# Con punto final
feat: agregar nueva funcionalidad.

# Demasiado largo
feat: agregar una nueva funcionalidad muy compleja que permite hacer muchas cosas

# Descripción en mayúscula (no recomendado)
feat: Agregar Nueva Funcionalidad
```

## 🔧 Solución de Problemas

### Hook no se ejecuta

```bash
# Verificar que el hook existe y es ejecutable
ls -la .git/hooks/commit-msg

# Configurar hooks path
git config core.hooksPath .git/hooks

# Reconfigurar hooks
./turismo-itagui/setup-git-hooks.sh
```

### ESLint falla en pre-commit

```bash
# Corregir errores automáticamente
npm run lint:fix

# O corregir manualmente los errores mostrados
```

### Prettier falla en pre-commit

```bash
# Formatear todos los archivos
npm run format

# O formatear archivos específicos
npx prettier --write src/components/Home.jsx
```

### Saltar validaciones temporalmente

```bash
# Saltar pre-commit (NO RECOMENDADO)
git commit --no-verify -m "feat: cambio temporal"

# Saltar commit-msg (NO RECOMENDADO) 
git commit --no-verify -m "cambio sin formato"
```

### Deshabilitar hooks temporalmente

```bash
# Mover hooks temporalmente
mv .git/hooks .git/hooks-disabled

# Restaurar hooks
mv .git/hooks-disabled .git/hooks
```

## 📚 Recursos Adicionales

- **Conventional Commits**: https://www.conventionalcommits.org/
- **Semantic Versioning**: https://semver.org/
- **Git Hooks Documentation**: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
- **ESLint Rules**: https://eslint.org/docs/rules/
- **Prettier Configuration**: https://prettier.io/docs/en/configuration.html

## 🤝 Contribuir

Si encuentras problemas con los hooks o tienes sugerencias:

1. Reporta issues en GitHub
2. Propón mejoras vía Pull Request
3. Actualiza la documentación según sea necesario

## ⚡ Comandos Rápidos

```bash
# Configurar hooks
./turismo-itagui/setup-git-hooks.sh

# Verificar formato antes de commit
npm run lint && npm run format:check

# Commit con mensaje correcto
git commit -m "feat(mapa): agregar filtros por categoría"

# Ver hooks instalados
ls -la .git/hooks/

# Probar hook manualmente
.git/hooks/commit-msg .git/COMMIT_EDITMSG
```
