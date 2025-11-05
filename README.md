# 🏛️ Turismo Itagüí

Aplicación web progresiva (PWA) para promover el turismo en el municipio de Itagüí, Antioquia. La aplicación permite a los usuarios explorar lugares turísticos, restaurantes, eventos culturales y sitios de aventura mediante un mapa interactivo y sistema de favoritos.

## 📱 Características

- **Mapa interactivo** con ubicaciones turísticas
- **Categorías organizadas**: Gastronomía, Aventura, Cultural
- **Sistema de favoritos** persistente
- **Calendario de eventos** culturales
- **Interfaz responsiva** para móviles y escritorio
- **Navegación intuitiva** con bottom navigation

## 🛠️ Tecnologías y Dependencias

### Stack Principal
- **React 19.1.0** - Librería de UI
- **Vite 7.0.0** - Build tool y dev server
- **React Router DOM 7.7.0** - Enrutamiento SPA

### Dependencias Principales
- **Leaflet 1.9.4** + **React Leaflet 5.0.0** - Mapas interactivos
- **React Icons 5.5.0** - Iconografía
- **React Calendar 6.0.0** - Componente calendario
- **Axios 1.10.0** - Cliente HTTP

### Herramientas de Desarrollo
- **ESLint 9.29.0** - Linting y calidad de código
- **@vitejs/plugin-react 4.7.0** - Plugin React para Vite

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── BottomNav.jsx   # Navegación inferior
│   ├── CarouselTarjetas.jsx # Carrusel de categorías
│   ├── HeaderApp.jsx   # Header de la aplicación
│   ├── Home.jsx        # Página principal
│   ├── Mapa.jsx        # Componente del mapa
│   ├── Eventos.jsx     # Lista de eventos
│   ├── Favoritos.jsx   # Gestión de favoritos
│   └── LugarCard.jsx   # Tarjeta de lugar
├── context/            # Context API para estado global
│   ├── FavoritosProvider.jsx # Provider de favoritos
│   └── useFavoritos.jsx     # Hook personalizado
├── styles/             # Archivos CSS por componente
│   ├── Home.css
│   ├── Mapa.css
│   └── [component].css
├── assets/             # Recursos estáticos
│   └── logo.png
├── App.jsx            # Componente raíz
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales

public/
├── datos.json         # Base de datos local de lugares
├── [imagenes].jpg     # Assets de lugares turísticos
└── vite.svg          # Favicon
```

### Patrones de Arquitectura
- **Arquitectura por componentes** - Separación clara de responsabilidades
- **Context API** - Manejo de estado global para favoritos
- **Hook personalizado** - `useFavoritos` para lógica reutilizable
- **Separación de estilos** - CSS modules por componente

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** versión 18.0.0 o superior
- **npm** versión 9.0.0 o superior
- **Git** para control de versiones

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/LviGexe/Turismo-Itagui.git
cd Turismo-Itagui/turismo-itagui
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

### Scripts Disponibles

```bash
# Ejecutar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linting
npm run lint

# Corregir errores de linting automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format

# Verificar formato de código
npm run format:check
```

## 🪝 Git Hooks y Conventional Commits

Este proyecto utiliza Git Hooks para asegurar calidad de código y formato consistente de commits.

### Configuración Automática

**Windows (PowerShell):**
```powershell
.\setup-git-hooks.ps1
```

**Linux/Mac:**
```bash
chmod +x setup-git-hooks.sh
./setup-git-hooks.sh
```

### Hooks Implementados

- **`pre-commit`**: Valida ESLint, Prettier y archivos sensibles
- **`commit-msg`**: Valida formato de Conventional Commits
- **`prepare-commit-msg`**: Proporciona plantillas de commit

### Formato de Commits

```bash
# Formato básico
<tipo>[scope]: <descripción>

# Ejemplos válidos
feat: agregar mapa interactivo
fix(favoritos): corregir persistencia
docs: actualizar README
style: formatear código con prettier
refactor(components): simplificar HeaderApp
```

### Tipos de Commit Disponibles

- `feat` - Nueva funcionalidad
- `fix` - Corrección de bug
- `docs` - Documentación
- `style` - Formato de código
- `refactor` - Refactoring
- `test` - Tests
- `chore` - Tareas de mantenimiento

📖 **Documentación completa**: [GIT-HOOKS.md](./GIT-HOOKS.md)

## 📋 Guías de Estilo y Convenciones

### Nomenclatura de Archivos
- **Componentes**: PascalCase (`HeaderApp.jsx`)
- **Hooks**: camelCase con prefijo `use` (`useFavoritos.jsx`)
- **Estilos**: PascalCase.css (`HeaderApp.css`)
- **Context**: PascalCase con sufijo Provider (`FavoritosProvider.jsx`)

### Estructura de Componentes
```jsx
// 1. Imports externos
import React from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Imports internos
import '../styles/ComponentName.css';
import { useFavoritos } from '../context/useFavoritos';

// 3. Componente
export default function ComponentName() {
  // Hooks
  const navigate = useNavigate();
  
  // Estado local
  const [state, setState] = useState(null);
  
  // Funciones
  const handleClick = () => {
    // lógica
  };
  
  // Render
  return (
    <div className="component-container">
      {/* JSX */}
    </div>
  );
}
```

### Convenciones CSS
- **BEM methodology** para clases CSS
- **Clases descriptivas**: `.home-container`, `.titulo-explora`
- **Variables CSS** para colores del tema
- **Mobile-first** responsive design

## 🔧 Configuración de ESLint

El proyecto usa ESLint con las siguientes reglas:

- **@eslint/js** - Configuración base de JavaScript
- **eslint-plugin-react-hooks** - Reglas para React Hooks
- **eslint-plugin-react-refresh** - Compatibilidad con Vite
- **Regla personalizada**: Variables en mayúsculas ignoradas

### Ejecutar Linting
```bash
npm run lint
```

## 🌐 Configuración de Desarrollo

### Servidor de Desarrollo
- **Puerto**: 5173
- **Host**: Habilitado para acceso externo
- **Ngrok**: Configurado para túneles (`91f859fbb2f9.ngrok-free.app`)

### Variables de Entorno
El proyecto no requiere variables de entorno adicionales para desarrollo local.

## 📊 Datos y API

### Base de Datos Local
Los datos se almacenan en `public/datos.json` con la siguiente estructura:
```json
{
  "gastronomia": [...],
  "aventura": [...],
  "cultural": [...]
}
```

### Estructura de Lugar
```json
{
  "nombre": "Nombre del lugar",
  "lat": 6.173,
  "lng": -75.610,
  "descripcion": "Descripción detallada",
  "imagen": "./imagen.jpg",
  "rating": 4.5
}
```

## 🤝 Contribución

### Flujo de Trabajo Git
1. Crear branch desde `development`
2. Realizar cambios siguiendo las convenciones
3. Ejecutar `npm run lint` antes del commit
4. Crear Pull Request a `development`

### Reportar Issues
- Usar templates de issue en GitHub
- Incluir steps to reproduce
- Agregar screenshots si es UI related

## 📝 Licencia

Este proyecto está bajo licencia privada. Para más información contactar al equipo de desarrollo.

## 👥 Equipo de Desarrollo

- **Repositorio**: [LviGexe/Turismo-Itagui](https://github.com/LviGexe/Turismo-Itagui)
- **Branch principal**: `development`

---

**¿Necesitas ayuda?** Revisa la documentación o crea un issue en el repositorio.
