#### Server Web

----

###### Puesta en marcha 


- Dev
    * Clonar el repositorio
    * Definir las variables de entorno en el .env
    * Crear los keys dentro del directorio con el comando 
        ```sh
            openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
        ```
    * Poner a correr el proyecto con el comando 
        ```sh
            yarn dev
        ```        

