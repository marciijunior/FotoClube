import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

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
  }

  type Winner {
    id: ID!
    title: String!
    author: String!
    image: String!
    monthWon: String!
    judgesNotes: String
  }

  type Query {
    allEvents: [Event!]!
    allWinners: [Winner!]!
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(
      title: String!
      date: String!
      time: String!
      description: String!
      location: String!
      image: String
      category: String
    ): Event!
    createWinner(
      title: String!
      author: String!
      image: String!
      monthWon: String!
      judgesNotes: String
    ): Winner!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    allEvents: async () => await prisma.event.findMany(),
    allWinners: async () => await prisma.winner.findMany(),
    event: async (_, { id }) =>
      await prisma.event.findUnique({ where: { id: parseInt(id) } }),
  },
  Mutation: {
    createEvent: async (_, args) => await prisma.event.create({ data: args }),
    createWinner: async (_, args) => await prisma.winner.create({ data: args }),
  },
};

// Iniciar o Servidor
const server = new ApolloServer({ typeDefs, resolvers });

// CORS (dev): permitir frontends locais durante desenvolvimento
const devCors = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
};

const listenOptions = {
  port: 3002,
  // Em produção não definimos CORS aqui (usar configuração apropriada)
  cors: process.env.NODE_ENV === "production" ? undefined : devCors,
};

server.listen(listenOptions).then(({ url }) => {
  console.log(`🚀 Servidor rodando em: ${url}`);
});
