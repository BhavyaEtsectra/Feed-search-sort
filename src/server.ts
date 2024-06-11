import express from 'express';
import postRoutes from './routes/postRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', postRoutes);
console.log('Routes initialized');


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
