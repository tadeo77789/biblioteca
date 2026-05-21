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
├── App.js                    # Punto de entrada, ruteo simple por estado
├── src/
│   ├── theme.js              # Colores, tipografias, sombras
│   ├── data.js               # Datos mock: libros, categorias, eventos
│   ├── components/
│   │   ├── BookCover.js      # Portada de libro (gradiente)
│   │   ├── BookCard.js       # Tarjeta de libro para catalogo
│   │   └── Header.js         # Cabecera con buscador y navegacion
│   └── screens/
│       └── HomeScreen.js     # Vista de inicio (hero + destacados + eventos)
```

## Estado actual

- [x] Vista de Inicio (hero, libros destacados, generos, novedades, eventos)
- [ ] Catalogo con busqueda y filtros
- [ ] Detalle de libro
- [ ] Login / Registro
- [ ] Mi cuenta (prestamos, reservas, historial)
- [ ] Eventos (vista completa)
- [ ] Integracion con backend (API REST)
