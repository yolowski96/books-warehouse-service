import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import { errorHandler } from './utils/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();

app.use(bodyParser.json());
app.use('/api',routes);
app.use(errorHandler);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
