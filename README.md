# Universidad Distrital Francisco José de Caldas
## Facultad Ingeniería

## Investigacion de Operaciones 3
## Grupo 8

### Descripcion

Juego para presentacion de proyecto final de IO 3

### Pagina
[Pagina del Juego](https://vmgabriel.gitlab.io/game-io3)

### Integrantes

* Raul
* Emmanuel
* Alejandro Hernandez
* Daniel Perea
* Gabriel Vargas

### Guia de Instalacion y Uso

#### Instalacion Necesaria

* Node
* NPM
* Mongo

#### Creacion de DB

Lo primero que hay que hacer es cargar mongo, luego de ello se ingresa a una base de datos llamada `game-io3` de la siguiente manera:
 ``` SQL
 use game-io3
 show collections
 ```
 El ultimo comando es para ver si existen colecciones que son como las tablas de SQL.
 
 De no haber ninguna habria que crearlas pero para ello habria que ingresar los datos, datos que estan dentro de la carpeta DB,
 ahi estan los datos, hay que hacer este proceso con todos los jugadores
 ```
 db.jugadors.insert({<datos aqui>});
 ```
 recuerde para que mongo reconozca los datos a cada coleccion hay que ponerle una s al final `jugadors` o `puntajes`.
 
 Luego de ello el proceso sigue con actualizar en la consola lo que necesitaremos para arrancar el server.

#### Necesario para el Server

Lo primero que debemos hacer es actualizar los archivos
 ```bash
 npm install
 ```
 Luego procedemos a ejecutar el servidor
  ```bash
 npm init
 ```
 Con esto cargariamos el servidor, por defecto esta en [localhost:8080](http:localhost/8080) o [127.0.0.1:8080](http:127.0.0.1/8080)
