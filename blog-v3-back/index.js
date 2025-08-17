require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportMongoose = require('passport-local-mongoose');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const app = express();

/* ---- ENV ---- */
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const NODE_ENV = process.env.NODE_ENV || 'development';

/* ---- CORS ---- */
app.use(cors({
  origin: [FRONTEND_URL],
  credentials: true,
}));

/* ---- Parsers ---- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---- Mongo ---- */
mongoose.connect(MONGO_URI).then(() => console.log('✅ MongoDB connected')).catch(e => {
  console.error('❌ MongoDB connection error:', e.message);
});

/* ---- Trust proxy (needed for secure cookies on Render/HTTPS) ---- */
app.set('trust proxy', 1);

/* ---- Session ---- */
app.use(session({
  secret: process.env.SECRET || 'changeme',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI, collectionName: 'sessions' }),
  cookie: {
    httpOnly: true,
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    secure: NODE_ENV === 'production', // true only on HTTPS
  },
}));

/* ---- Passport ---- */
app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({ name: String, username: String, password: String, mobile: Number });
const textSchema = new mongoose.Schema({ title: String, content: String, author: String });
userSchema.plugin(passportMongoose);
const User = mongoose.model('User', userSchema);
const Text = mongoose.model('Text', textSchema);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ---- Routes ---- */
app.get('/health', (_req, res) => res.json({ ok: true, env: NODE_ENV }));

app.get('/current_user', (req, res) => res.json({ user: req.isAuthenticated() ? req.user : null }));

app.post('/register', (req, res, next) => {
  const newUser = new User({ name: req.body.name, username: req.body.username, mobile: req.body.mobile });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    req.login(user, (e) => (e ? next(e) : res.json({ user })));
  });
});

app.post('/login', passport.authenticate('local'), (req, res) => res.status(200).json({ user: req.user }));

app.get('/logout', (req, res, next) => {
  req.logout(err => err ? next(err) : req.session.destroy(e => e ? next(e) : res.json({ message: 'Logout successful' })));
});

app.get('/posts', async (_req, res) => res.json(await Text.find()));
app.post('/compose', async (req, res) => {
  try {
    await new Text(req.body).save();
    res.status(200).send('Text Saved Successfully');
  } catch { res.status(500).send('Failed to save text'); }
});

app.listen(PORT, () => console.log(`Server live at ${PORT}`));
