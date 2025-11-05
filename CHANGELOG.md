# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [No Liberado]

### Agregado
- Documentación completa del proyecto
- Configuración de Prettier para formato de código
- Configuración de VSCode para desarrollo
- Políticas de seguridad y contribución
- Variables de entorno de ejemplo

### Cambiado
- README.md completamente reescrito con guías de instalación
- Configuración de ESLint mejorada

## [0.1.0] - 2025-08-22

### Agregado
- Aplicación inicial de Turismo Itagüí
- Mapa interactivo con Leaflet
- Sistema de favoritos con Context API
- Navegación con React Router
- Categorías de lugares: Gastronomía, Aventura, Cultural
- Componente de calendario para eventos
- Bottom navigation para móviles
- Datos locales en JSON
- Configuración de Vite para desarrollo
- ESLint para calidad de código

### Características Técnicas
- React 19.1.0
- Vite 7.0.0 como build tool
- React Router DOM 7.7.0
- Leaflet 1.9.4 + React Leaflet 5.0.0
- React Icons 5.5.0
- Axios 1.10.0
- React Calendar 6.0.0

### Componentes
- `Home` - Página principal con carrusel de categorías
- `Mapa` - Mapa interactivo de lugares
- `Eventos` - Lista de eventos culturales
- `Favoritos` - Gestión de lugares favoritos
- `HeaderApp` - Header de la aplicación
- `BottomNav` - Navegación inferior
- `CarouselTarjetas` - Carrusel de categorías
- `LugarCard` - Tarjetas de lugares

### Context
- `FavoritosProvider` - Provider para estado global de favoritos
- `useFavoritos` - Hook personalizado para favoritos

---

## Tipos de cambios

- `Agregado` para nuevas funcionalidades.
- `Cambiado` para cambios en funcionalidades existentes.
- `Obsoleto` para funcionalidades que se eliminarán próximamente.
- `Eliminado` para funcionalidades eliminadas.
- `Arreglado` para cualquier corrección de bugs.
- `Seguridad` en caso de vulnerabilidades.

## Formato de Versionado

Este proyecto usa [Semantic Versioning](https://semver.org/):
- **MAJOR**: Cambios incompatibles en la API
- **MINOR**: Funcionalidades agregadas de manera compatible
- **PATCH**: Correcciones de bugs compatibles

Ejemplo: `1.2.3`
- `1` = Versión major
- `2` = Versión minor  
- `3` = Versión patch
