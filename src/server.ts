import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers, typeDefs } from "./graphql";

dotenv.config();

const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 4000;

const bootstrapServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    return res.send("SIM!");
  });

  app.listen(port, () => {
    console.log(`Express ready at ${host}:${port}`);
    console.log(`GraphQL ready at ${host}:${port}/graphql`);
  });
};

bootstrapServer();

console.log("Fodase");
