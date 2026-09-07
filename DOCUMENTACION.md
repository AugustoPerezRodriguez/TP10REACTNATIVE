# Documentación — Explorador de Películas (React Native)

## 1. Descripción

Aplicación mobile de exploración de películas. Consume una API externa, muestra un listado en pantalla, permite buscar, marcar favoritos y navegar entre Inicio y Favoritos. Está pensada para demostrar los conceptos vistos en clase, no para una arquitectura empresarial.

## 2. Tecnologías

- React Native `0.81.5`
- Expo SDK `54`
- React `19.1.0`
- Axios
- React Navigation 7 (`@react-navigation/native` + `@react-navigation/bottom-tabs`)

No se actualizó el SDK ni se cambió la arquitectura del proyecto creado con `create-expo-app`.

## 3. API

- **Base URL:** `https://devsapihub.com/api-movies`
- **Documentación:** https://devsapihub.com/docs/api-movies
- **Consulta usada:** `GET /` sobre esa URL base, para listar todas las películas.
- **Datos reales de cada película:** `id`, `title`, `description`, `year`, `image_url`, `genre` (array de strings) y `stars` (número).

La interfaz usa esos campos. `genre` se muestra con `.join(', ')` porque la API lo devuelve como array.

## 4. Arquitectura

```
App.js
  → FavoritesProvider
  → AppNavigator
      → HomeScreen
      → FavoritesScreen
```

Separación de responsabilidades:

- **componentes:** piezas visuales reutilizables
- **screens:** pantallas que componen la experiencia
- **services:** Axios y URL de la API
- **hooks:** carga de películas y estados de loading/error
- **context:** favoritos compartidos entre pantallas
- **navigation:** tabs Inicio / Favoritos
- **constants:** paleta visual

## 5. Responsabilidad de cada archivo importante

### `App.js`

Punto de entrada visual. Envuelve la app con `SafeAreaProvider` y `FavoritesProvider`, y monta el navegador. Se mantiene chico a propósito.

### `src/services/api.js`

Centraliza la URL base y la función `getMovies()`. Los componentes no hablan con Axios de forma directa.

Existe para que el flujo sea: pantalla → servicio → Axios → API.

### `src/hooks/useMovies.js`

Ejecuta la consulta al montar la pantalla Home con `useEffect`. Guarda `movies`, `loading` y `error`. También expone `reloadMovies` para reintentar si falla la API.

### `src/context/FavoritesContext.js`

Comparte favoritos entre Home y Favoritos. Se eligió Context porque las pantallas viven dentro de React Navigation y pasar funciones por params resultaría más confuso de defender oralmente.

No usa `localStorage` ni AsyncStorage: la consigna mobile no exige persistir al cerrar la app.

### `src/navigation/AppNavigator.js`

Define dos pestañas: Inicio y Favoritos. Es la forma más simple de navegar en un celular.

### `src/screens/HomeScreen/HomeScreen.js`

Pantalla principal. Combina encabezado, buscador, listado y estados de carga/error/vacío. El filtrado se hace en esta pantalla con `filter()`.

### `src/screens/FavoritesScreen/FavoritesScreen.js`

Muestra las películas guardadas reutilizando `MovieList` y `MovieCard`.

### `src/components/Header/Header.js`

Encabezado reutilizable con título y subtítulo.

### `src/components/SearchBar/SearchBar.js`

`TextInput` controlado. Solo informa el texto escrito; no filtra por sí mismo.

### `src/components/MovieList/MovieList.js`

Lista principal con `FlatList`, `data`, `renderItem` y `keyExtractor` usando `movie.id`.

### `src/components/MovieCard/MovieCard.js`

Tarjeta de una película: poster, título, año, género, estrellas y botón de favorito.

### `src/components/FavoriteButton/FavoriteButton.js`

`Pressable` para agregar o quitar favoritos. Consulta el contexto para saber si esa película ya está guardada.

### `src/components/Loading/Loading.js`

Indicador de carga con el mensaje "Cargando información...".

### `src/components/ErrorMessage/ErrorMessage.js`

Mensaje amigable si falla la API, con botón de reintento.

### `src/components/EmptyMessage/EmptyMessage.js`

Mensaje cuando no hay coincidencias o cuando todavía no hay favoritos.

### `src/constants/colors.js`

Colores de la temática cine. Evita repetir hexadecimales en cada archivo.

## 6. Estados

| Estado | Dónde | Para qué |
|--------|--------|----------|
| `movies` | `useMovies` | Películas traídas de la API |
| `loading` | `useMovies` | Mostrar el estado de carga |
| `error` | `useMovies` | Mostrar un error amigable |
| `searchTerm` | `HomeScreen` | Texto del buscador |
| `favorites` | `FavoritesContext` | Películas guardadas |
| `imageError` | `MovieCard` | Evitar romper la tarjeta si falla el poster |

No se agregaron estados extra innecesarios.

## 7. Flujo de datos

```
HomeScreen se monta
  ↓ useEffect
  ↓ useMovies
  ↓ getMovies()
  ↓ Axios
  ↓ https://devsapihub.com/api-movies
  ↓ response.data
  ↓ setMovies
  ↓ filter() según searchTerm
  ↓ FlatList
  ↓ MovieCard
```

El filtrado es local. No se vuelve a llamar a la API por cada letra.

## 8. Favoritos

- **Agregar:** `addFavorite(movie)` usa `.some()` para ver si ya existe el mismo `id`. Si existe, no hace nada.
- **Quitar:** `removeFavorite(movieId)` usa `.filter()` y deja afuera ese `id`.
- **Evitar duplicados:** la comparación siempre es por `movie.id`.
- **Compartir estado:** Home y Favoritos leen el mismo contexto, por eso una película marcada en Inicio aparece inmediatamente en Favoritos.

No se usó Redux ni Zustand.

## 9. Navegación

| Pantalla | Ruta interna | Contenido |
|----------|--------------|-----------|
| Home | tab `Home` | Listado, búsqueda, agregar/quitar favoritos |
| Favoritos | tab `Favorites` | Películas guardadas, quitar favoritos |

Se usaron tabs inferiores porque en mobile es más natural que un menú superior de escritorio.

## 10. Estilos

Todos los estilos propios usan `StyleSheet.create()`.

No hay archivos `.css`, ni `className`, ni etiquetas HTML.

El diseño es vertical, con tarjetas horizontales, posters chicos, botones de al menos 44 px y una paleta oscura con acento dorado para evocar cine.

## 11. Errores encontrados

### Error 1: la terminal del entorno no devolvió salida al instalar dependencias

#### Error
Al intentar ejecutar `npx expo install` y comandos de Git desde el entorno del agente, la terminal no devolvió código de salida ni logs.

#### Causa
Limitación del entorno de ejecución de comandos, no un error de la aplicación en sí.

#### Diagnóstico
Se usó la consola/terminal del agente. El comando quedó sin `exit status`. También se comprobó que `package.json` no se actualizaba solo, por lo que la instalación no se había materializado.

#### Solución
Se cargaron en `package.json` las versiones compatibles con Expo SDK 54:

- `axios`
- `@react-navigation/native` `^7.1.8`
- `@react-navigation/bottom-tabs` `^7.4.0`
- `react-native-screens` `~4.16.0`
- `react-native-safe-area-context` `~5.6.0`

Las versiones nativas se tomaron de `node_modules/expo/bundledNativeModules.json`. React Navigation 7 es la línea compatible con Expo SDK 54.

Luego hay que ejecutar `npm install` o `npx expo install` en la carpeta del proyecto para descargar los paquetes.

#### Resultado
Quedó documentado el motivo y las versiones exactas. El código de la app ya importa esas librerías. La instalación real depende de ejecutar el comando en una terminal que sí responda.

### Error 2: `@expo/vector-icons` no estaba instalado en la plantilla blank

#### Error
La plantilla Expo blank no trae `@expo/vector-icons` como dependencia directa usable para los íconos de las tabs.

#### Causa
El proyecto se creó con `create-expo-app` y template blank. Esa plantilla solo incluye Expo, React y React Native.

#### Diagnóstico
Búsqueda en `node_modules` y lectura de `package.json`. No existía el paquete.

#### Solución
Los íconos de las tabs se resolvieron con `Text` nativo (`🎬` y `★`) y `StyleSheet.create()`. Así no se agregó una librería extra solo por íconos.

#### Resultado
La navegación no depende de una librería de íconos.

### Error 3: `genre` llega como array

#### Error
Si se renderiza `movie.genre` directo, no se ve un texto claro porque la API devuelve `["Drama", "Crime"]`.

#### Causa
La respuesta real de la API usa un array, no un string.

#### Diagnóstico
Consulta real a `https://devsapihub.com/api-movies` y lectura de la documentación oficial.

#### Solución
En `MovieCard` se usa `genre.join(', ')` cuando `genre` es un array. En la búsqueda se recorre el array con `.some()`.

#### Resultado
El género se lee bien en la tarjeta y también se puede buscar por género.

## 12. Diferencias con React Web

La versión web está en `TP-10---Repaso-post-vacaciones`, no dentro de este mismo repositorio.

| Tema | React Web | React Native |
|------|-----------|--------------|
| Markup | HTML | `View`, `Text`, `Image`, `Pressable`, `TextInput`, `FlatList` |
| Estilos | CSS | `StyleSheet.create()` |
| Navegación | React Router | React Navigation (tabs) |
| Listado | `.map()` | `FlatList` |
| Persistencia | `localStorage` | No se implementó AsyncStorage |
| Favoritos | Context + storage | Context en memoria |
| Diseño | grilla de escritorio | tarjetas horizontales para teléfono |
| Interacción | mouse | toque, botones más grandes |

No se copió el CSS ni las etiquetas HTML. Se adaptó la experiencia a mobile.

## 13. Auditoría final contra la consigna

| Requisito | Estado | Evidencia |
|-----------|--------|-----------|
| React Native + Expo SDK 54 | ✅ Cumplido | `package.json`: Expo `~54.0.36`, RN `0.81.5`, React `19.1.0` |
| Componentes funcionales | ✅ Cumplido | Todos los archivos de `src/` |
| `View`, `Text`, `Image`, `Pressable`, `TextInput`, `FlatList` | ✅ Cumplido | Header, MovieCard, FavoriteButton, SearchBar, MovieList |
| Sin HTML | ✅ Cumplido | No hay `div`, `p`, `button`, `input` ni `img` |
| `StyleSheet.create()` | ✅ Cumplido | Cada componente visual |
| Axios obligatorio | ✅ Cumplido | `src/services/api.js` |
| Consulta al montar con `useEffect` | ✅ Cumplido | `src/hooks/useMovies.js` |
| Listado con `FlatList` y `keyExtractor` por `id` | ✅ Cumplido | `MovieList.js` |
| Búsqueda con `useState` + `filter()` | ✅ Cumplido | `HomeScreen.js` |
| Loading | ✅ Cumplido | `Loading.js` + estado `loading` |
| Error amigable | ✅ Cumplido | `ErrorMessage.js` |
| Vacío distinto de loading/error | ✅ Cumplido | `EmptyMessage.js` |
| Favoritos agregar/quitar | ✅ Cumplido | `FavoritesContext.js` + `FavoriteButton.js` |
| Sin duplicados | ✅ Cumplido | `.some()` por `id` |
| Pantalla Home | ✅ Cumplido | `HomeScreen.js` |
| Pantalla Favoritos | ✅ Cumplido | `FavoritesScreen.js` |
| Navegación | ✅ Cumplido | `AppNavigator.js` |
| Componentes reutilizables | ✅ Cumplido | MovieCard, MovieList, Header, estados |
| Diseño mobile / cine | ✅ Cumplido | Tarjetas, posters, paleta oscura |
| Sin librerías de UI extra | ✅ Cumplido | Solo RN + StyleSheet |
| README.md | ✅ Cumplido | `README.md` |
| DOCUMENTACION.md | ✅ Cumplido | Este archivo |
| Integrantes | ✅ Cumplido | Sección en README |
| Diferencias Web vs Native | ✅ Cumplido | Sección 12 y README |
| Proyecto React Web existente | ✅ Cumplido | Carpeta hermana `TP-10---Repaso-post-vacaciones` |
| Commits progresivos | ⚠️ Parcial | El código está separado por etapas; los commits dependen de que Git responda en la terminal |
| Push a GitHub | ⚠️ Parcial | El `.git/config` local no tenía remote configurado al momento del análisis |
| App ejecutada en dispositivo | ⚠️ Parcial | El código está listo, pero la instalación de dependencias debe ejecutarse en una terminal local |

No se inventaron errores extra. Solo se documentaron problemas realmente encontrados durante el desarrollo.
