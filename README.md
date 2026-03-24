# KeepinTrack 🏋️‍♂️📊

¡Hola! Este es un proyecto personal que armé para llevar un registro diario de mis objetivos de salud, nutrición y fitness. Funciona como un tracker donde voy anotando cosas día a día, como por ejemplo:

- Calorías y gramos de proteína por cada comida (desayuno, almuerzo, cena, snacks).
- Cantidad de pasos diarios.
- Consumo de agua en litros.
- Seguimiento de mi peso.
- Historial para ver mi progreso a lo largo del tiempo.

> **Nota:** Este proyecto es pura y exclusivamente para uso personal. No está pensado para mostrarse como material de portfolio, ni está buscando tener las mejores prácticas empresariales, simplemente es una herramienta que me sirve a mí.

## Stack Tecnológico 🛠️
Las tecnologías que estoy usando para levantar esto son:
- **Frontend:** React + Vite
- **Routing:** React Router
- **Base de Datos / Backend:** Supabase (almacenamiento de datos y métricas).

## Cómo correrlo localmente 🚀

Por si necesito levantar el proyecto en otra compu, estos son los pasos a seguir:

1. Entrar a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instalar las dependencias de Node:
   ```bash
   npm install
   ```
3. Arrancar el entorno de desarrollo:
   ```bash
   npm run dev
   ```

*(Recordatorio: hace falta tener configuradas las variables de entorno en un archivo `.env` dentro de la carpeta `frontend` con las credenciales de Supabase para poder guardar y cargar los datos correctamente).*