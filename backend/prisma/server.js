import { ApolloServer, gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import sharp from "sharp";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET =
  process.env.JWT_SECRET || "seu-secret-super-secreto-aqui-change-me";

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Apenas imagens são permitidas!"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Configuração Simplificada
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" }, {});
const prisma = new PrismaClient({ adapter });

// Definição do Schema GraphQL
const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    date: String!
    time: String!
    description: String
    location: String
    image: String
    category: String
    createdAt: String
  }

  type Winner {
    id: ID!
    title: String!
    author: String!
    image: String!
    monthWon: String!
    judgesNotes: String
    isWinner: Boolean!
    position: Int!
    isCurrent: Boolean!
    createdAt: String
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: String!
  }

  type Slide {
    id: ID!
    image: String!
    title: String!
    subtitle: String!
    author: String!
    order: Int!
  }

  type Member {
    id: ID!
    name: String!
    email: String!
    phone: String
    bio: String
    avatar: String
    joinedAt: String!
    role: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    image: String
    category: String!
    createdAt: String
  }

  type AuthPayload {
    ok: Boolean!
    token: String
    user: User
    message: String
  }

  type Query {
    allEvents: [Event!]!
    allWinners: [Winner!]!
    allSlides: [Slide!]!
    allMembers: [Member!]!
    allPosts: [Post!]!
    event(id: ID!): Event
    winner(id: ID!): Winner
    member(id: ID!): Member
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(email: String!, password: String!, name: String!): AuthPayload!
    createUser(
      email: String!
      password: String!
      name: String!
      role: String
    ): User!
    createSlide(
      image: String!
      title: String!
      subtitle: String!
      author: String!
      order: Int!
    ): Slide!
    updateSlide(
      id: ID!
      image: String
      title: String
      subtitle: String
      author: String
      order: Int
    ): Slide!
    deleteSlide(id: ID!): Slide!
    createMember(
      name: String!
      email: String!
      phone: String
      bio: String
      avatar: String
      role: String
    ): Member!
    updateMember(
      id: ID!
      name: String
      email: String
      phone: String
      bio: String
      avatar: String
      role: String
    ): Member!
    deleteMember(id: ID!): Member!
    createEvent(
      title: String!
      date: String!
      time: String!
      description: String!
      location: String!
      image: String
      category: String
    ): Event!
    updateEvent(
      id: ID!
      title: String
      date: String
      time: String
      description: String
      location: String
      image: String
      category: String
    ): Event!
    deleteEvent(id: ID!): Event!
    createWinner(
      title: String!
      author: String!
      image: String!
      monthWon: String!
      judgesNotes: String
      isWinner: Boolean
      position: Int
    ): Winner!
    updateWinner(
      id: ID!
      title: String
      author: String
      image: String
      monthWon: String
      judgesNotes: String
      isWinner: Boolean
      position: Int
    ): Winner!
    deleteWinner(id: ID!): Winner!
    setCurrentContest(monthWon: String!): Boolean!
    createPost(
      title: String!
      content: String!
      image: String
      category: String
    ): Post!
    updatePost(
      id: ID!
      title: String
      content: String
      image: String
      category: String
    ): Post!
    deletePost(id: ID!): Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    allSlides: async () =>
      await prisma.slide.findMany({ orderBy: { order: "asc" } }),
    allEvents: async () =>
      await prisma.event.findMany({ orderBy: { createdAt: "desc" } }),
    allWinners: async () =>
      await prisma.winner.findMany({ orderBy: { createdAt: "desc" } }),
    allMembers: async () =>
      await prisma.member.findMany({ orderBy: { name: "asc" } }),
    allPosts: async () =>
      await prisma.post.findMany({ orderBy: { createdAt: "desc" } }),
    event: async (_, { id }) =>
      await prisma.event.findUnique({ where: { id: parseInt(id) } }),
    winner: async (_, { id }) =>
      await prisma.winner.findUnique({ where: { id: parseInt(id) } }),
    member: async (_, { id }) =>
      await prisma.member.findUnique({ where: { id: parseInt(id) } }),
    me: async (_, __, context) => {
      if (!context.userId) {
        throw new Error("Não autenticado");
      }
      return await prisma.user.findUnique({ where: { id: context.userId } });
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return { ok: false, message: "Credenciais inválidas" };
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return { ok: false, message: "Credenciais inválidas" };
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        ok: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    },
    createUser: async (_, { email, password, name, role }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: role || "user",
        },
      });

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    },
    register: async (_, { email, password, name }) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return { ok: false, message: "Email já cadastrado" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: "user",
        },
      });

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        ok: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    },
    createSlide: async (_, args) => {
      console.log("createSlide chamado com:", args);
      try {
        const slide = await prisma.slide.create({ data: args });
        console.log("Slide criado com sucesso:", slide);
        return slide;
      } catch (error) {
        console.error("Erro ao criar slide:", error);
        throw error;
      }
    },
    updateSlide: async (_, { id, ...data }) => {
      return await prisma.slide.update({
        where: { id: parseInt(id) },
        data,
      });
    },
    deleteSlide: async (_, { id }) => {
      return await prisma.slide.delete({ where: { id: parseInt(id) } });
    },
    createMember: async (_, args) => await prisma.member.create({ data: args }),
    updateMember: async (_, { id, ...data }) => {
      return await prisma.member.update({
        where: { id: parseInt(id) },
        data,
      });
    },
    deleteMember: async (_, { id }) => {
      return await prisma.member.delete({ where: { id: parseInt(id) } });
    },
    createEvent: async (_, args) => await prisma.event.create({ data: args }),
    updateEvent: async (_, { id, ...data }) => {
      return await prisma.event.update({
        where: { id: parseInt(id) },
        data,
      });
    },
    deleteEvent: async (_, { id }) => {
      return await prisma.event.delete({ where: { id: parseInt(id) } });
    },
    createWinner: async (_, args) => await prisma.winner.create({ data: args }),
    updateWinner: async (_, { id, ...data }) => {
      return await prisma.winner.update({
        where: { id: parseInt(id) },
        data,
      });
    },
    deleteWinner: async (_, { id }) => {
      return await prisma.winner.delete({ where: { id: parseInt(id) } });
    },
    setCurrentContest: async (_, { monthWon }) => {
      try {
        // Primeiro, define todos como não atuais
        await prisma.winner.updateMany({
          data: { isCurrent: false },
        });

        // Depois, marca o mês especificado como atual
        await prisma.winner.updateMany({
          where: { monthWon },
          data: { isCurrent: true },
        });

        return true;
      } catch (error) {
        console.error("Erro ao definir concurso atual:", error);
        return false;
      }
    },
    createPost: async (_, args) => {
      console.log("[createPost] args:", args);
      const postData = {
        title: args.title,
        content: args.content,
        image: args.image || null,
        category: args.category || "Notícia",
      };
      try {
        const post = await prisma.post.create({ data: postData });
        console.log("[createPost] post criado:", post);
        return post;
      } catch (error) {
        console.error("[createPost] erro ao criar post:", error);
        throw error;
      }
    },
    updatePost: async (_, { id, ...data }) => {
      return await prisma.post.update({
        where: { id: parseInt(id) },
        data,
      });
    },
    deletePost: async (_, { id }) => {
      return await prisma.post.delete({ where: { id: parseInt(id) } });
    },
  },
};

// Configurar Express
const app = express();

// Configurar CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Servir arquivos estáticos da pasta uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rota de upload de imagem com conversão para WebP
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const originalPath = req.file.path;
    const webpFilename = req.file.filename.replace(/\.[^.]+$/, ".webp");
    const webpPath = path.join(__dirname, "../uploads", webpFilename);

    // Converter para WebP com otimização
    await sharp(originalPath)
      .webp({ quality: 85 }) // Qualidade 85% mantém ótima qualidade visual
      .resize(1920, 1080, {
        // Resize máximo mantendo aspect ratio
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFile(webpPath);

    // Deletar arquivo original
    fs.unlinkSync(originalPath);

    const imageUrl = `http://localhost:3002/uploads/${webpFilename}`;
    res.json({ url: imageUrl, filename: webpFilename });
  } catch (error) {
    console.error("Erro no upload:", error);
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o Servidor Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return { userId: decoded.userId, role: decoded.role };
      } catch (err) {
        console.log("Token inválido:", err.message);
      }
    }

    return {};
  },
  csrfPrevention: true,
  cache: "bounded",
});

// Aplicar middleware do Apollo Server ao Express
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/" });

  const PORT = 3002;

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}/`);
    console.log(`📁 Upload disponível em: http://localhost:${PORT}/upload`);
  });
}

startServer();
