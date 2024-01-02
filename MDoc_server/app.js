import  express   from 'express';
import mongoose  from 'mongoose';
import  authRoutes  from './routes/authRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import cors from 'cors';

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: '*'
}))

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = ' mongodb+srv://efratdev0933:efrat0933@efratcluster.gccfpzb.mongodb.net/node-auth';

async function connect () {
  try {
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then((result) => {
      console.log('connect to mongoDb');  
      app.listen(3000, () => {
        console.log('port  is running on 3000');
      });
    }) 
  } 
  catch (error) {
    console.error(error);
  }
}

connect();


// routes
app.use(authRoutes);
app.use(ratingRoutes);

app.get('/', (req, res) => res.render('home'));
