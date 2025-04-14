# Aplicación de Tienda de Cervezas

Una prueba de concepto para una aplicación de un bar de cervezas que demuestra prácticas modernas de desarrollo web y optimizaciones.

## 🚀 Demo en Vivo

Visita la aplicación desplegada en <a href="https://lucas-calvino-frontend-cometa-git-main-lucas-projects-ea3434e8.vercel.app" target="_blank">Vercel URL</a>

## 🛠 Stack Tecnológico

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Seguridad de tipos y mejor experiencia de desarrollo
- **Tailwind CSS** - Estilos con enfoque en utilidades
- **Zustand** - Gestión de estado
- **Firebase** - Backend y almacenamiento de datos
- **Vitest** - Framework de pruebas

## ✨ Características y Decisiones Técnicas

### Características Principales
- Sistema de gestión de pedidos con filtros de pagados/no pagados
- Actualizaciones de stock en tiempo real
- Diseño responsivo optimizado para móvil

### Calidad del Código
- TypeScript para seguridad de tipos
- Arquitectura basada en componentes
- Hooks personalizados para lógica de negocio
- Pruebas unitarias con Vitest
- Configuración de ESLint y Prettier

### Optimizaciones de Rendimiento
- Next.js App Router para mejor enrutamiento y rendimiento
- Optimización de imágenes con next/image
- Carga diferida de componentes
- Gestión eficiente del estado con Zustand
- Optimización del SDK de Firebase

### Mejoras de UI/UX
- Estados de carga con animaciones personalizadas
- Efectos de brillo al pasar el cursor
- Transiciones suaves entre estados
- Componentes reutilizables (Tabs, Rate, ProductCard)
- Diseño responsivo con Tailwind CSS

## 🏃‍♂️ Ejecutar el Proyecto

1. Clonar el repositorio
```bash
git clone https://github.com/thelookus/lucas-calvino-frontend-cometa.git
cd lucas-calvino-frontend-cometa
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env.local
# Agrega tu configuración de Firebase
```

4. Ejecutar servidor de desarrollo
```bash
npm run dev
```

5. Ejecutar pruebas
```bash
npm test
```

## 📝 Estructura del Proyecto

```
src/
├── app/          # Páginas de Next.js App Router
├── components/   # Componentes reutilizables
├── store/        # Configuraciones de Zustand
├── services/     # Integraciones con servicios externos
├── types/        # Definiciones de tipos TypeScript
├── utils/        # Funciones auxiliares
└── __tests__/    # Archivos de pruebas
```

## 🎯 Mejoras Futuras

- Implementar autenticación de usuarios
- Agregar funcionalidad de carrito
- Mejorar cobertura de pruebas
- Agregar más animaciones y transiciones
- Implementar límites de error

## 👨‍💻 Autor

Lucas Calviño

## Variables de Entorno

1. Crea un archivo llamado `.env.local` en la raíz de tu proyecto.
2. Agrega las siguientes variables al archivo `.env.local`:

```plaintext
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_dominio_auth
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_id_proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

## Despliegue en Vercel

La forma más fácil de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

---

[Read in English](README.md)
