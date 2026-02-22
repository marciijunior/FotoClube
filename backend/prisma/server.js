import { ApolloServer, gql } from "apollo-server-express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
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
import nodemailer from "nodemailer";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.JWT_SECRET) {
  console.error(
    "ERRO FATAL: JWT_SECRET não definido nas variáveis de ambiente.",
  );
  process.exit(1);
}
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para verificar autenticação em rotas protegidas
function requireAuth(context) {
  if (!context.userId) {
    throw new Error("Não autenticado. Faça login para continuar.");
  }
}

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + crypto.randomBytes(8).toString("hex");
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
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
    author: String!
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

  type ContactResponse {
    ok: Boolean!
    message: String
  }

  type Mutation {
    sendContactMessage(
      name: String!
      email: String!
      subject: String
      message: String!
    ): ContactResponse!
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
      author: String
      category: String
    ): Post!
    updatePost(
      id: ID!
      title: String
      content: String
      image: String
      author: String
      category: String
    ): Post!
    deletePost(id: ID!): Post!
  }
`;

// Resolvers
// Configuração do transporter de e-mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    sendContactMessage: async (_, { name, email, subject, message }) => {
      try {
        // Sanitizar input para prevenir XSS no email HTML
        const esc = (str) =>
          (str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
        const safeName = esc(name);
        const safeEmail = esc(email);
        const safeSubject = esc(subject);
        const safeMessage = esc(message);

        const mailOptions = {
          from: `"FotoClube Contato" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: safeSubject || `Mensagem de Contato - ${safeName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #003b56;">Nova mensagem de contato</h2>
              <p><strong>Nome:</strong> ${safeName}</p>
              <p><strong>E-mail:</strong> ${safeEmail}</p>
              <p><strong>Assunto:</strong> ${safeSubject || "Não informado"}</p>
              <hr style="border: 1px solid #eee;" />
              <h3 style="color: #ff5c00;">Mensagem:</h3>
              <p style="white-space: pre-wrap;">${safeMessage}</p>
              <hr style="border: 1px solid #eee;" />
              <p style="color: #888; font-size: 12px;">Esta mensagem foi enviada através do formulário de contato do site FotoClube de Araçatuba.</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        return { ok: true, message: "Mensagem enviada com sucesso!" };
      } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return {
          ok: false,
          message: "Erro ao enviar mensagem. Tente novamente.",
        };
      }
    },
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
        { expiresIn: "7d" },
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
        { expiresIn: "7d" },
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
    createSlide: async (_, args, context) => {
      requireAuth(context);
      return await prisma.slide.create({ data: args });
    },
    updateSlide: async (_, { id, ...data }, context) => {
      requireAuth(context);
      return await prisma.slide.update({
        where: { id: parseInt(id) },
        data,
      });
    },
    deleteSlide: async (_, { id }, context) => {
      requireAuth(context);
      return await prisma.slide.delete({ where: { id: parseInt(id) } });
    },
    createMember: async (_, args, context) => {
      requireAuth(context);
      return await prisma.member.create({ data: args });
    },
    updateMember: async (_, { id, ...data }, context) => {
      requireAuth(context);
      return await prisma.member.update({
        where: { id: parseInt(id) },
        data,
      });
    },
    deleteMember: async (_, { id }, context) => {
      requireAuth(context);
      return await prisma.member.delete({ where: { id: parseInt(id) } });
    },
    createEvent: async (_, args, context) => {
      requireAuth(context);
      const { title, date, time, description, location, image, category } =
        args;
      const eventData = {
        title,
        date,
        time,
        description,
        location,
        category: category || "Geral",
      };
      if (image) eventData.image = image;
      return await prisma.event.create({ data: eventData });
    },
    updateEvent: async (_, { id, ...data }, context) => {
      requireAuth(context);
      return await prisma.event.update({
        where: { id: parseInt(id) },
        data,
      });
    },
    deleteEvent: async (_, { id }, context) => {
      requireAuth(context);
      return await prisma.event.delete({ where: { id: parseInt(id) } });
    },
    createWinner: async (_, args, context) => {
      requireAuth(context);
      return await prisma.winner.create({ data: args });
    },
    updateWinner: async (_, { id, ...data }, context) => {
      requireAuth(context);
      return await prisma.winner.update({
        where: { id: parseInt(id) },
        data,
      });
    },
    deleteWinner: async (_, { id }, context) => {
      requireAuth(context);
      return await prisma.winner.delete({ where: { id: parseInt(id) } });
    },
    setCurrentContest: async (_, { monthWon }, context) => {
      requireAuth(context);
      try {
        await prisma.winner.updateMany({
          data: { isCurrent: false },
        });
        await prisma.winner.updateMany({
          where: { monthWon },
          data: { isCurrent: true },
        });
        return true;
      } catch {
        return false;
      }
    },
    createPost: async (_, args, context) => {
      requireAuth(context);
      const postData = {
        title: args.title,
        content: args.content,
        image: args.image || null,
        author: args.author || "FotoClube",
        category: args.category || "Notícia",
      };
      return await prisma.post.create({ data: postData });
    },
    updatePost: async (_, { id, ...data }, context) => {
      requireAuth(context);
      return await prisma.post.update({
        where: { id: parseInt(id) },
        data,
      });
    },
    deletePost: async (_, { id }, context) => {
      requireAuth(context);
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
      "http://localhost:5175",
      "http://localhost:3000",
      "https://foto-clube-mqa6kg3qz-marciijuniors-projects.vercel.app",
      "https://foto-clube.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());

// Servir arquivos estáticos da pasta uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rota de upload de imagem com conversão para WebP (protegida por auth)
app.post(
  "/upload",
  (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        return next();
      } catch {
        // token inválido
      }
    }
    return res.status(401).json({ error: "Não autenticado" });
  },
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
      }

      const originalPath = req.file.path;

      // Verificar se o arquivo existe
      if (!fs.existsSync(originalPath)) {
        return res
          .status(400)
          .json({ error: "Arquivo não foi salvo corretamente" });
      }

      // Gerar um nome único com timestamp para evitar conflitos
      const timestamp = Date.now();
      const random = crypto.randomBytes(6).toString("hex");
      const webpFilename = `${timestamp}-${random}.webp`;
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

      // Deletar arquivo original apenas se for diferente do novo
      if (originalPath !== webpPath) {
        try {
          fs.unlinkSync(originalPath);
        } catch (e) {
          console.warn("Não foi possível deletar arquivo original:", e.message);
        }
      }

      const baseUrl =
        process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
      const imageUrl = `${baseUrl}/uploads/${webpFilename}`;
      res.json({ url: imageUrl, filename: webpFilename });
    } catch (error) {
      res.status(500).json({ error: "Erro ao processar upload" });
    }
  },
);

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
        // Token inválido — continua sem autenticação
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
