
## Description

Chat application using NestJS, Socket.io, ReatJs or Angular.
### https://fogcxy.com/

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Nest CLI](https://docs.nestjs.com/cli/overview)
- [Angular CLI](https://cli.angular.io/)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)

## Installation


# Explicación del Proyecto con Principios SOLID y Patrones de Diseño
## Principios SOLID Aplicados
## Corriendo En El Puerto 5170

### Single Responsibility Principle (SRP):

* UsersService: Se centra únicamente en la gestión de usuarios conectados, validando alias y manteniendo el registro de usuarios.
* ChatGateway: Maneja las conexiones WebSocket y la lógica de comunicación entre usuarios, separando claramente esta responsabilidad del manejo de usuarios.

### Open/Closed Principle (OCP):

* El código está estructurado de tal manera que se pueden añadir nuevas funcionalidades (como nuevos métodos en UsersService) sin modificar las existentes.

### Liskov Substitution Principle (LSP):

* Aunque en este caso concreto no se utilizan clases base o herencia, el diseño permite la sustitución de componentes, como cambiar la implementación de UsersService sin afectar a ChatGateway.

### Interface Segregation Principle (ISP):

* Cada servicio y gateway proporciona interfaces bien definidas para sus responsabilidades específicas, evitando interfaces "gruesas" o sobrecargadas.

### Dependency Inversion Principle (DIP):

* ChatGateway depende de abstracciones (como UsersService) en lugar de detalles concretos, facilitando el manejo de dependencias y la posible sustitución o mockeo en pruebas.

# Patrones de Diseño Utilizados

## Patrones Creacionales:
* La inyección de dependencias en NestJS (como inyectar UsersService en ChatGateway) sigue el patrón creacional, centralizando la creación de objetos y promoviendo la flexibilidad y la reutilización.

## Patrones Estructurales:
* La modularización del código (separación en diferentes servicios y módulos) sigue patrones estructurales, facilitando la organización y la escalabilidad del código.
Patrones de Comportamiento: El uso de eventos en WebSocket (como sendMessage y connectUser) sigue el patrón observador, permitiendo que los objetos se comuniquen de manera flexible.

# Aspectos Importantes del Desarrollo
* Separación de Responsabilidades: Cada parte del sistema tiene responsabilidades bien definidas, lo que facilita el mantenimiento y la escalabilidad.
* Flexibilidad y Escalabilidad: La aplicación está diseñada para facilitar la adición de nuevas características y manejar un mayor número de usuarios conectados.
* Seguridad y Validación: Se realiza validación de datos (por ejemplo, en alias de usuario), lo cual es crucial para la seguridad y la integridad de la aplicación.


# Documentación para Ejecutar la Aplicación y Utilizar la API


## Ejecución de la Aplicación:

- Asegúrate de tener Node.js y NestJS instalados.
- Clona el repositorio y navega al directorio del proyecto.
- Ejecuta 

```bash
# Ejecuta
$ npm install
```


- Inicia el servidor con:
  
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Uso de la API WebSocket:

- Conéctate al servidor WebSocket en ws://localhost:3000 (ajusta el puerto si es necesario).
- Utiliza el evento connectUser con { "alias": "tu_alias" } para conectarte.
- { "alias": "pedro" }  event: connectUser
- Envía mensajes con sendMessage y { "recipientAlias": "destinatario", "message": "tu mensaje" }.
- {"recipientAlias": "pedro", "message": "test mensaje 1"}  event: sendMessage
- Utiliza sendMessageAll con { "message": "tu mensaje" } para enviar un mensaje a todos los usuarios.
- Para recibir mensajes, escucha el evento message (error, usersList, messageFromServerToAll, privateMessage)



## Stay in touch

- Linkedin - [Mauricio Quintero](https://www.linkedin.com/in/alzheimeer)
- Website - [https://fogcxy.com]([https://fogcxy.com)


## License

ChatSocket [MIT licensed](LICENSE).