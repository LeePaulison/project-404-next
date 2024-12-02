import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";
import requestIp from "request-ip";

import connectDB from "./config/db";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const port = process.env.PORT || 4000;

export const server = new ApolloServer<{ ip: string | null }>({ typeDefs, resolvers });

const startServer = async () => {
  await connectDB();

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ ip: requestIp.getClientIp(req) }),
  });
  console.log(`🚀 GraphQL Server ready at ${url}`);
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
