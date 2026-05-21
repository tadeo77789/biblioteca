# Frontend — Biblioteca Pública Digital

App en React Native + Expo con soporte web (react-native-web).

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
cd frontend
npm install
```

## Ejecución

- **Web:** `npm run web` (abre en el navegador)
- **Android:** `npm run android` (requiere Android Studio o Expo Go en el dispositivo)
- **iOS:** `npm run ios` (solo macOS)

## Estructura

```
frontend/
├── App.js                       # Entrada, ruteo, estado global, persistencia
├── src/
│   ├── theme.js                 # Colores, tipografias, sombras
│   ├── data.js                  # Libros, categorias, eventos, prestamos por defecto
│   ├── components/
│   │   ├── BookCover.js         # Portada con gradiente
│   │   ├── BookCard.js          # Tarjeta de libro
│   │   ├── Header.js            # Cabecera con buscador y nav
│   │   └── AuthModal.js         # Modal login / registro
│   └── screens/
│       ├── HomeScreen.js        # Inicio
│       ├── CatalogScreen.js     # Catalogo con filtros
│       ├── BookDetailScreen.js  # Detalle de libro
│       ├── AccountScreen.js     # Mi cuenta (prestamos/reservas/historial)
│       └── EventsScreen.js      # Eventos y talleres
```

## Estado actual

- [x] Vista de Inicio (hero, libros destacados, generos, novedades, eventos)
- [x] Catalogo con busqueda y filtros (categoria, disponibilidad, orden)
- [x] Detalle de libro (sinopsis, ejemplares, solicitar prestamo/reservar, relacionados)
- [x] Login / Registro (modal, cualquier email/password sirve)
- [x] Mi cuenta (prestamos activos, reservas, historial; devolver/renovar/cancelar)
- [x] Eventos (lista de eventos y talleres)
- [x] Persistencia local con AsyncStorage
- [x] Toasts para feedback de acciones
- [ ] Integracion con backend (API REST) — pendiente cuando este listo feature/backend
