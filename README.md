# RedEncendida

## Descripción

**RedEncendida** es una aplicación de notificaciones de apagones programados que permite a los usuarios recibir avisos sobre cortes de energía en su región. La aplicación utiliza Node.js, Express y web-push para enviar notificaciones web, y está configurada para conectarse a una base de datos PostgreSQL para el manejo de los datos relacionados.

## Características

- Envío de notificaciones push de apagones programados a usuarios suscritos.
- API RESTful para administrar las programaciones de apagones.
- Base de datos PostgreSQL para almacenar información relevante de las programaciones.
- Arquitectura organizada en rutas y módulos para facilitar el mantenimiento y la escalabilidad del proyecto.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/) v18.15.0 o superior
- [PostgreSQL](https://www.postgresql.org/) para la base de datos

## Instalación

Sigue estos pasos para clonar e instalar el proyecto en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/RedEncendida.git
   cd RedEncendida

2. Instala las dependencias
    npm install

3. Crea un archivo .env en la raíz del proyecto y define las siguientes variables:
    PUBLIC_VAPID_KEY=***********
    PRIVATE_VAPID_KEY=***********
    DB_USER=postgresql
    DB_HOST=localhost
    DB_NAME=power_outages
    DB_PASSWORD=********
    DB_PORT=5432

Nota: Las claves VAPID se pueden generar con la biblioteca web-push o mediante un generador en línea de claves de Web Push.

4. Inicializa la base de datos PostgreSQL y crea una tabla para las programaciones de apagones si aún no la has creado.

## Uso

Para iniciar el servidor en un entorno de desarrollo, ejecuta:
    node index.js

La aplicación debería mostrar un mensaje indicando que el servidor está corriendo, junto con los mensajes de prueba de las claves VAPID:

    Server is running on port 5000
    Public VAPID Key: *********
    Private VAPID Key: *********

## Endpoints Principales

    GET /api/schedules: Obtener todas las programaciones de apagones.
    POST /subscribe: Suscribirse a las notificaciones push de apagones programados.

## Tecnologías

    Node.js y Express: Para crear el servidor backend y manejar las peticiones HTTP.
    web-push: Para el envío de notificaciones push.
    PostgreSQL: Base de datos para almacenar información de los apagones programados.
    dotenv: Para gestionar las variables de entorno de manera segura.

## Estructura del Proyecto

RedEncendida/
├── backend/
│   └── routes/
│       └── scheduleRoutes.js     # Rutas para la API de apagones programados
├── node_modules/                 # Dependencias instaladas
├── .env                          # Variables de entorno
├── index.js                      # Punto de entrada de la aplicación
├── package.json                  # Configuración del proyecto y dependencias
└── README.md                     # Documentación del proyecto

## Contribución

1. Haz un fork del proyecto.
2. Crea una nueva rama (git checkout -b feature/nueva-feature).
3. Realiza los cambios necesarios y haz un commit (git commit -m 'Agrega nueva feature').
4. az push a la rama (git push origin feature/nueva-feature).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.