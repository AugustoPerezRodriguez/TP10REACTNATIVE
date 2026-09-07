# Explorador de Películas — React Native

Versión mobile del proyecto **Explorador de contenido**, con temática de películas.

## Integrantes

- Augusto Pérez Rodríguez

> Completar o corregir esta sección si hay más integrantes.

## API utilizada

- **URL:** https://devsapihub.com/api-movies
- **Documentación:** https://devsapihub.com/docs/api-movies
- **Cliente HTTP:** Axios

## Descripción

Aplicación desarrollada con React Native y Expo que consulta una API externa de películas, muestra un listado adaptado a celular, permite buscar por título o género, agregar o quitar favoritos y navegar entre la pantalla de inicio y la de favoritos.

## Organización de componentes

```
src/
├── components/     Componentes reutilizables de interfaz
├── screens/        Pantallas Home y Favoritos
├── services/       Consumo de la API con Axios
├── navigation/     Navegación entre pantallas
├── context/        Estado compartido de favoritos
├── hooks/          Carga de películas
└── constants/      Colores y valores visuales
```

- `App.js` compone el provider de favoritos y el navegador.
- `HomeScreen` muestra el listado principal, el buscador y los estados de carga/error.
- `FavoritesScreen` muestra las películas guardadas.
- `MovieCard` y `MovieList` se reutilizan en ambas pantallas.

## Funcionalidades

- Consulta a la API al iniciar la pantalla Home, usando Axios.
- Listado de películas con `FlatList`.
- Búsqueda y filtrado local por título y género.
- Favoritos: agregar, quitar y evitar duplicados por `id`.
- Navegación entre **Inicio** y **Favoritos**.
- Estados de loading, error y resultados vacíos.
- Interfaz pensada para teléfono, con `StyleSheet.create()`.

## Cómo ejecutarlo

```bash
npm install
npx expo start
```

Luego escanear el código QR con Expo Go o abrir el emulador.

## React Web vs React Native

La versión web vive en el repositorio/carpeta `TP-10---Repaso-post-vacaciones`.

Diferencias principales:

| Aspecto | React Web | React Native |
|---------|-----------|--------------|
| Interfaz | HTML (`div`, `p`, `button`, `img`) | Componentes nativos (`View`, `Text`, `Pressable`, `Image`) |
| Estilos | CSS y `className` | `StyleSheet.create()` |
| Listas | `.map()` sobre el DOM | `FlatList` |
| Navegación | React Router | React Navigation (tabs) |
| Persistencia | `localStorage` | No se persistió, porque la consigna mobile no lo exige |
| Interacción | click | toque (`Pressable`) |
| Diseño | pensado para escritorio | pensado para celular |
"# TP10REACTNATIVE" 
