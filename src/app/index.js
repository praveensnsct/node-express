import express from 'express';
import session from 'express-session';

// Security
import cors from 'cors';
import timeout from 'connect-timeout';
import helmet from 'helmet';

// Error handler
import { errorHandler, tokenValidator } from '../middlewares';

// Routes
import userRoutes from '../controllers/users';
import authRoutes from '../controllers/auth';

// Database
import connectDB from '../mongo/connect';

connectDB();

const app = express();
const { NODE_ENV, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(helmet());
app.use(timeout('30s'));
app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  cookie: {
    secure: NODE_ENV === 'production',
    httpOnly: true,
    maxAge: null,
  },
  saveUninitialized: false,
}));

app.use('/', tokenValidator);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

export default app;
