# Gestión de Divisas y Tendencias - MyAlbatross

![pruebaAitor](https://github.com/user-attachments/assets/166f1e17-90e3-40a9-86cf-d7e0ece9728b)

Construida con:
- React Native
- TypeScript
- StyleSheet
  - SWR
  - Zustand
  - i18n para multidioma (inglés y español)
  - Jest

## **Características Principales**

### 1. **Gestión de Divisas**
- **Listado de Divisas:**
  - Visualización de todas las divisas disponibles con su valor actual.
  - Indicadores visuales de tendencias positivas o negativas.
- **Detalles de una Divisa:**
  - Gráficos interactivos con historial de tasas de cambio.
  - Valores máximos, mínimos y diferencia con respecto al día anterior.

### 2. **Insights Diarios**
- **Ganadores y Perdedores del Día:**
  - Muestra las divisas con mayor y menor rendimiento diario.
- **Promedio de Cambios:**
  - Calcula y muestra el cambio promedio entre todas las divisas.
- **Divisas Populares:**
  - Lista de las divisas más consultadas por los usuarios.

### 3. **Tendencias del Mercado**
- **Gráficos de Tendencias:**
  - Visualización histórica de tasas de cambio para diferentes divisas.
- **Indicadores de Tendencia:**
  - Colores e íconos que identifican fácilmente tendencias positivas o negativas.

### 4. **Gestión de Usuario**
- **Perfil Personal:**
  - Actualización de nombre, email, username y fecha de nacimiento.
  - Selector de fecha interactivo.
- **Preferencias de Tema:**
  - Cambia entre modos claro y oscuro.
- **Idioma:**
  - Selector para cambiar entre idiomas disponibles.

### 5. **Pantalla de Carga (SplashScreen)**
- Transición animada al abrir la aplicación.
- Interfaz fluida hacia la navegación principal


### Estructura de Directorios

```
src/
├── assets/           # Recursos estáticos (imágenes, fuentes, etc.)
├── components/       # Componentes compartidos
│   ├── CustomHeader/ # Header personalizado reutilizable
│   └── common/       # Componentes UI reutilizables
├── features/         # Funcionalidades principales
│   ├── currencies/   # Gestión de divisas
│   │   ├── components/ # Componentes específicos de divisas
│   │   ├── interfaces/ # Interfaces TypeScript para divisas
│   │   └── screens/    # Pantallas de divisas (Listado, Detalles)
│   ├── insights/     # Insights diarios
│   │   └── screens/    # Pantallas de insights
│   ├── trends/       # Tendencias de mercado
│   │   └── screens/    # Pantallas de tendencias
│   ├── user/         # Gestión del perfil de usuario
│   │   ├── components/ # Componentes relacionados con usuario
│   │   └── screens/    # Pantallas de usuario (Perfil)
│   └── splash/       # Pantalla de carga inicial
├── i18n/             # Configuración de internacionalización
├── navigation/       # Configuración y rutas de navegación
├── services/         # Servicios y clientes API
├── stores/           # Gestión del estado global (Zustand)
```

## **Archivos Testeados**

### 1. **CurrencyListScreen**
- **Pruebas:**
  - Renderiza la lista de divisas correctamente.
  - Navega a la pantalla de detalles de una divisa.
- **Herramientas:** `jest`, `@testing-library/react-native`

---

### 2. **UserProfileScreen**
- **Pruebas:**
  - Renderiza campos de entrada y el selector de fecha.
  - Maneja correctamente la actualización del perfil.
- **Herramientas:** `jest`, `@testing-library/react-native`

---

### 3. **InsightsScreen**
- **Pruebas:**
  - Muestra correctamente ganadores, perdedores y promedio diario.
- **Herramientas:** `jest`, `@testing-library/react-native`

---

### 4. **TrendsScreen**
- **Pruebas:**
  - Renderiza gráficos de tendencias.
  - Muestra indicadores positivos y negativos.
- **Herramientas:** `jest`, `@testing-library/react-native`


![image](https://github.com/user-attachments/assets/2cfb73be-8038-47f5-9f59-5e86f8dddcc9)
