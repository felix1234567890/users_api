import express from 'express';
import indexRoutes from './routes';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db } from './database';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRoutes);
migrate(db, {migrationsFolder: "./src/migrations"});
app.listen(3000);
