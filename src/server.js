import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import authRoutes from './api/routes/v1/auth.routes.js';
import catalogRoutes from './api/routes/v1/catalog.routes.js';
import adminRoutes from './api/routes/v1/admin/admin.routes.js';

const app = express();
const port = process.env.PORT || 4000;

// Initialize database first
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/catalog', catalogRoutes);
app.use('/api/v1/admin', adminRoutes);

app.get('/', (req, res) => res.send('API working'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});