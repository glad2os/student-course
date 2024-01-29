import express, { Express } from 'express';
import studentRoutes from '@routes/studentRoutes';
// ... import other necessary modules

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

// Setup routes
app.use('/students', studentRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

