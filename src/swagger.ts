import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API',
      version: '1.0.0',
      description: 'API for managing a bookstore inventory',
    },
  },
  apis: ['src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
