# Política de Seguridad - Turismo Itagüí

## Versiones Soportadas

Actualmente damos soporte de seguridad a las siguientes versiones del proyecto:

| Versión | Soportada          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| 0.9.x   | :x:                |
| < 0.9   | :x:                |

## Reportar una Vulnerabilidad

La seguridad de nuestros usuarios es una prioridad. Si descubres una vulnerabilidad de seguridad, por favor repórtala de forma responsable.

### Cómo Reportar

**NO** reportes vulnerabilidades de seguridad a través de issues públicos de GitHub.

En su lugar, envía un email a: [insertar email de seguridad]

Incluye la siguiente información:
- Descripción detallada de la vulnerabilidad
- Pasos para reproducir el problema
- Versiones afectadas
- Posible impacto de la vulnerabilidad
- Cualquier mitigación temporal que conozcas

### Qué Esperar

- **Confirmación**: Responderemos dentro de 48 horas para confirmar la recepción
- **Evaluación**: Evaluaremos la vulnerabilidad dentro de 5 días hábiles
- **Actualización**: Te mantendremos informado del progreso cada 5 días hábiles
- **Resolución**: Trabajaremos para resolver el problema lo antes posible

### Vulnerabilidades de Alcance

Estamos interesados en vulnerabilidades que afecten:

#### ✅ En Alcance
- Cross-Site Scripting (XSS)
- Inyección de código
- Exposición de datos sensibles
- Bypass de autenticación
- Vulnerabilidades en dependencias
- Configuraciones inseguras

#### ❌ Fuera de Alcance
- Ataques de ingeniería social
- Ataques de fuerza bruta en formularios
- Vulnerabilidades en servicios de terceros
- Ataques DoS/DDoS
- Reportes de herramientas automatizadas sin validación manual

## Mejores Prácticas de Seguridad

### Para Desarrolladores

1. **Dependencias**
   ```bash
   # Auditar dependencias regularmente
   npm audit
   npm audit fix
   ```

2. **Variables de Entorno**
   - Nunca commitear archivos `.env`
   - Usar `.env.example` para documentar variables requeridas
   - Validar variables de entorno en tiempo de ejecución

3. **Sanitización de Datos**
   - Validar todos los inputs del usuario
   - Escapar datos antes de renderizar en DOM
   - Usar bibliotecas confiables para sanitización

4. **Autenticación y Autorización**
   - Implementar autenticación segura si se añade en el futuro
   - Usar HTTPS en producción
   - Validar tokens y sesiones

### Para Usuarios

1. **Navegador Actualizado**
   - Mantén tu navegador actualizado
   - Habilita las funciones de seguridad del navegador

2. **Conexión Segura**
   - Usa HTTPS cuando esté disponible
   - Evita redes WiFi públicas no seguras

## Configuraciones de Seguridad

### Content Security Policy (CSP)
```html
<!-- Añadir a index.html cuando sea necesario -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               connect-src 'self' https:;">
```

### Headers de Seguridad Recomendados
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-XSS-Protection: 1; mode=block
```

## Dependencias de Seguridad

### Herramientas de Análisis
- **npm audit** - Auditoría de dependencias
- **ESLint security plugin** - Análisis estático de seguridad
- **Snyk** - Monitoreo continuo de vulnerabilidades

### Dependencias Críticas
Monitoreamos especialmente:
- React y React-DOM
- React-Router-DOM
- Leaflet y React-Leaflet
- Axios
- Vite

## Proceso de Actualización de Seguridad

1. **Identificación**: Detectar vulnerabilidad
2. **Evaluación**: Determinar severidad e impacto
3. **Desarrollo**: Crear parche o actualización
4. **Testing**: Probar la solución
5. **Despliegue**: Liberar actualización de seguridad
6. **Comunicación**: Notificar a usuarios si es necesario

## Contacto

Para preguntas sobre seguridad que no sean vulnerabilidades:
- **Issues GitHub**: Para discusiones públicas sobre seguridad
- **Email del proyecto**: [insertar email general]

## Reconocimientos

Agradecemos a todos los investigadores de seguridad que reportan vulnerabilidades de manera responsable. Los reportes válidos serán reconocidos en nuestro CHANGELOG (con permiso del reportador).

---

**Última actualización**: [Insertar fecha]
**Versión de la política**: 1.0.0
