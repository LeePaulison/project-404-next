import { userResolvers } from "../resolvers/userResolvers";
import { preferencesResolvers } from "../resolvers/preferencesResolvers";
import { conversationResolvers } from "../resolvers/conversationResolvers";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...preferencesResolvers.Query,
    ...conversationResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...preferencesResolvers.Mutation,
    ...conversationResolvers.Mutation,
  },
};
