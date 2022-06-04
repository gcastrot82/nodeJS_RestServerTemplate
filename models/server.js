const express = require("express");
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios'

    // Middlewares - Son funciones que le agrega funcionalidades al Web Server
    this.middlewares();

    // Cuando se ejecute el contructor, llamo las rutas - Rutas de mi aplicación
    this.routes();
  }

  middlewares() {

    // CORS
    this.app.use( cors() );

    // Lectura y parseo del Body
    this.app.use( express.json() );

    // Directorio publico
    this.app.use(express.static("public"));
  }

  // Definir las rutas
  routes() {

    // Usar middleware condicional
    this.app.use(this.usuariosPath, require('../routes/user.routes'));


  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación activa http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
