import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation with JWT Auth',
    },
    schemas: {
      UserResponse: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          role: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              label: { type: 'string' },
              isDeleted: { type: 'boolean' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      // global security (optional)
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/api/routes/userRoutes.ts', './src/api/routes/authRoutes.ts'],
};

export const specs = swaggerJSDoc(options);

