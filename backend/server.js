import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? 5000;
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret_change_me';

// Demo-användare
const DEMO_USER = {
  id: 'u1',
  email: 'admin@blogg.se',
  password: 'password',
  firstname: 'Admin',
  lastname: 'User',
};

let posts = [
  {
    id: nanoid(),
    title: 'Välkommen till min blogg',
    content: 'Det här är ett exempel-inlägg. Logga in för att skapa nya inlägg.',
    author: 'Admin User',
    coverImageUrl:
      'https://images.unsplash.com/photo-1528731708534-816fe59f90cb?auto=format&fit=crop&w=1400&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization ?? '';
  const [type, token] = header.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Auth
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body ?? {};

  if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken(DEMO_USER);
  const user = {
    id: DEMO_USER.id,
    email: DEMO_USER.email,
    firstname: DEMO_USER.firstname,
    lastname: DEMO_USER.lastname,
  };

  res.json({ user, token });
});

app.get('/auth/validate', authMiddleware, (req, res) => {
  const user = {
    id: req.user.sub,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
  };

  res.json({ user });
});

// Public posts
app.get('/posts', (req, res) => {
  // nyast först
  const sorted = [...posts].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  res.json(sorted);
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
});

// Protected CRUD
app.post('/posts', authMiddleware, (req, res) => {
  const { title, content, coverImageUrl } = req.body ?? {};

  if (!title || !content) {
    return res.status(400).json({ message: 'title och content är obligatoriska' });
  }

  const now = new Date().toISOString();

  const post = {
    id: nanoid(),
    title: String(title),
    content: String(content),
    author: `${req.user.firstname} ${req.user.lastname}`,
    coverImageUrl: typeof coverImageUrl === 'string' ? coverImageUrl : '',
    createdAt: now,
    updatedAt: now,
  };

  posts.unshift(post);
  res.status(201).json(post);
});

app.put('/posts/:id', authMiddleware, (req, res) => {
  const { title, content, coverImageUrl } = req.body ?? {};
  const idx = posts.findIndex((p) => p.id === req.params.id);

  if (idx === -1) return res.status(404).json({ message: 'Not found' });

  if (!title || !content) {
    return res.status(400).json({ message: 'title och content är obligatoriska' });
  }

  posts[idx] = {
    ...posts[idx],
    title: String(title),
    content: String(content),
    // Om man skickar coverImageUrl i requesten så uppdateras den, annars behålls den gamla
    coverImageUrl:
      typeof coverImageUrl === 'string' ? coverImageUrl : posts[idx].coverImageUrl ?? '',
    updatedAt: new Date().toISOString(),
  };

  res.json(posts[idx]);
});

app.delete('/posts/:id', authMiddleware, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });

  posts.splice(idx, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log('Demo login: admin@blogg.se / password');
});
