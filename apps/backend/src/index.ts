import './oauth/passport';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/userRoutes';
import { OauthRouter } from './oauth/main';


const app = express();

// Session configuration
app.use(
    session({
        // secret: process.env.SESSION_SECRET || 'defaultsecret',
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
        },
    })
);

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("TPO Notice Board SERVER is UP!");
})

app.use("/api/auth/user", UserRouter);
app.use("/auth", OauthRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port http://localhost:${PORT}`));