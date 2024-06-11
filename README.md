# Desafío Always Music v2 - Gestión de Estudiantes

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando npm install (instalará pg y chalk).
3. Configura la BD (ve al siguiente punto).

## Base de datos

1. Ejecuta el Script en la Shell de Psql (Debes tener instalado Postgres).
2. La Base de datos es llamada "escuela_a_m", la cual será borrada en caso de existencia y creada junto a su tabla "estudiante".
3. En el proyecto modificar parámetros de conexión a la BD según sea tú caso.

## Ejecución y pruebas

### En el terminal del proyecto, copia y pega los siguientes comandos para hacer pruebas:

1. Para agregar estudiante: node server.js nuevo "22.588.685-6" "maria maurel" "guitarra" 5 
2. Para editar estudiante: node server.js editar "22.588.685-6" "maria maurel" "guitarra" 7
3. Para buscar por RUT: node server.js rut "22.588.685-6"
4. Para mostrar a todos los estudiantes: node server.js consulta 
5. Para eliminar un estudiante: node server.js eliminar "22.588.685-6"


