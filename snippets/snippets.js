const storage = require("../scripts/storage");

const storageEnum = require("../scripts/enums/storageEnum");

const items = (context) => [
  {
    key: "swaggerui",
    snippet: `
    // Define la información de tu API en un objeto

    // Crea un objeto Swagger-jsdoc con las opciones
    const swaggerDocument = (path) => {
     const scheme =  fs.readFileSync(path, 'utf8');
        return JSON.parse(scheme);
    }
   // Usa swagger-ui-express para montar la interfaz Swagger UI
    
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument('.${storage(context).getProyect(
      "outputFile",
      storage(context).get(storageEnum.SELECTED_WORKSPACE)
    )}')));
    `,
    lenguage: "javascript",
  },
];
module.exports = items;
