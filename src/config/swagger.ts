import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Job System API Documentation',
    version: '1.0.0',
    description: 'This is the API documentation for the Job System.',
    contact: {
      name: 'Ashil Prakash',
      email: 'ashilprakash369@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development Server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts', './src/controllers/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
