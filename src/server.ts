import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { corsConfig } from './config/cors';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(cors(corsConfig));
app.use(morgan('dev'));
app.use(express.json());

// Rutas principales
app.get('/', (req, res) => res.send('API Gestor de Tareas'));
app.get('/health', (req, res) => res.status(200).send('OK'));

// Rutas de la API
app.use('/api', authRoutes); // Todas las rutas de authRoutes empezarán con /api
app.use('/api/projects', projectRoutes);

export default app;