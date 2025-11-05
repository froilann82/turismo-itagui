# 🤝 Guía de Contribución - Turismo Itagüí

¡Gracias por tu interés en contribuir al proyecto Turismo Itagüí! Esta guía te ayudará a entender cómo participar efectivamente en el desarrollo.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)

## 📜 Código de Conducta

Este proyecto adhiere al código de conducta de código abierto. Al participar, te comprometes a mantener un ambiente respetuoso y colaborativo.

## 🚀 Cómo Contribuir

### Tipos de Contribuciones
- 🐛 **Bug fixes** - Corrección de errores
- ✨ **Features** - Nuevas funcionalidades
- 📚 **Documentación** - Mejoras en docs
- 🎨 **UI/UX** - Mejoras visuales
- ⚡ **Performance** - Optimizaciones
- 🧪 **Tests** - Cobertura de pruebas

## ⚙️ Configuración del Entorno

### 1. Fork y Clone
```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/Turismo-Itagui.git
cd Turismo-Itagui/turismo-itagui

# Configura el upstream
git remote add upstream https://github.com/LviGexe/Turismo-Itagui.git
```

### 2. Instalación
```bash
# Instala dependencias
npm install

# Ejecuta en modo desarrollo
npm run dev
```

### 3. Mantén tu Fork Actualizado
```bash
git fetch upstream
git checkout development
git merge upstream/development
```

## 📏 Estándares de Código

### Estructura de Archivos
```
src/
├── components/     # Componentes reutilizables
├── context/       # Context API
├── styles/        # CSS por componente
├── assets/        # Recursos estáticos
└── utils/         # Funciones utilitarias
```

### Convenciones de Nomenclatura

#### Archivos y Carpetas
- **Componentes**: `PascalCase.jsx` (ej: `HeaderApp.jsx`)
- **Hooks**: `camelCase.jsx` con prefijo `use` (ej: `useFavoritos.jsx`)
- **Estilos**: `PascalCase.css` (ej: `HeaderApp.css`)
- **Utilidades**: `camelCase.js` (ej: `formatDate.js`)

#### Variables y Funciones
```javascript
// ✅ Correcto
const userName = 'admin';
const handleSubmit = () => {};
const fetchUserData = async () => {};

// ❌ Incorrecto
const user_name = 'admin';
const HandleSubmit = () => {};
const fetch_user_data = async () => {};
```

#### Componentes React
```jsx
// ✅ Estructura recomendada
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/ComponentName.css';
import { useFavoritos } from '../context/useFavoritos';

export default function ComponentName({ prop1, prop2 }) {
  // 1. Hooks de React
  const [state, setState] = useState(null);
  const navigate = useNavigate();
  
  // 2. Hooks personalizados
  const { favoritos, agregarFavorito } = useFavoritos();
  
  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 4. Funciones del componente
  const handleClick = () => {
    // Event handler logic
  };
  
  // 5. Render
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
}
```

### Estándares CSS

#### Metodología BEM
```css
/* ✅ Correcto - BEM */
.home-container { }
.home-container__header { }
.home-container__header--active { }

/* ❌ Incorrecto */
.homeContainer { }
.home .header { }
.header.active { }
```

#### Organización de Propiedades
```css
.selector {
  /* 1. Positioning */
  position: relative;
  top: 0;
  left: 0;
  
  /* 2. Box model */
  display: flex;
  width: 100%;
  margin: 10px;
  padding: 15px;
  
  /* 3. Typography */
  font-family: Arial;
  font-size: 16px;
  color: #333;
  
  /* 4. Visual */
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  /* 5. Misc */
  cursor: pointer;
  transition: all 0.3s ease;
}
```

## 🔄 Proceso de Pull Request

### 1. Crear Branch
```bash
# Desde development
git checkout development
git pull upstream development

# Crear nueva branch
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

### 2. Desarrollar y Commitear
```bash
# Hacer cambios
# Verificar linting
npm run lint

# Commit siguiendo conventional commits
git add .
git commit -m "feat: agregar funcionalidad de búsqueda"
# o
git commit -m "fix: corregir error en mapa interactivo"
```

### 3. Push y PR
```bash
git push origin feature/nombre-descriptivo
```

Luego crea el Pull Request en GitHub hacia `development`.

### Convenciones de Commit
Usamos [Conventional Commits](https://conventionalcommits.org/):

```
tipo(ámbito): descripción

[cuerpo opcional]

[footer opcional]
```

**Tipos disponibles:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Cambios de estilo (no afectan funcionalidad)
- `refactor`: Refactoring de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

**Ejemplos:**
```
feat(mapa): agregar filtros por categoría
fix(favoritos): corregir persistencia en localStorage
docs(readme): actualizar guía de instalación
style(components): aplicar formato consistente
```

## 🐛 Reportar Bugs

### Antes de Reportar
1. Verifica que el bug no esté ya reportado
2. Asegúrate de estar en la última versión
3. Reproduce el error en modo desarrollo

### Template de Bug Report
```markdown
**Descripción del Bug**
Una descripción clara del problema.

**Pasos para Reproducir**
1. Ve a '...'
2. Haz clic en '....'
3. Observa el error

**Comportamiento Esperado**
Descripción de lo que debería pasar.

**Screenshots**
Si aplica, agrega capturas de pantalla.

**Entorno:**
- OS: [ej. Windows 11]
- Navegador: [ej. Chrome 120]
- Versión: [ej. 1.0.0]

**Información Adicional**
Cualquier contexto adicional.
```

## 💡 Sugerir Mejoras

### Template de Feature Request
```markdown
**¿Tu solicitud está relacionada con un problema?**
Descripción clara del problema.

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que pase.

**Describe alternativas consideradas**
Otras soluciones o funcionalidades consideradas.

**Información adicional**
Contexto adicional, screenshots, mockups, etc.
```

## ✅ Checklist antes de PR

- [ ] El código sigue las convenciones establecidas
- [ ] Se ejecutó `npm run lint` sin errores
- [ ] Los cambios fueron probados localmente
- [ ] La documentación fue actualizada si es necesario
- [ ] Los commits siguen conventional commits
- [ ] El PR tiene una descripción clara
- [ ] Se agregaron tests si es una nueva funcionalidad

## 🎯 Áreas Prioritarias

Estamos especialmente interesados en contribuciones en:
- 📱 **PWA features** - Funcionalidades offline
- 🧪 **Testing** - Cobertura de pruebas
- ♿ **Accesibilidad** - A11y improvements
- 🎨 **UI/UX** - Mejoras de interfaz
- 📊 **Performance** - Optimizaciones

## 📞 Contacto

- **Issues**: [GitHub Issues](https://github.com/LviGexe/Turismo-Itagui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/LviGexe/Turismo-Itagui/discussions)

¡Gracias por contribuir a Turismo Itagüí! 🎉
