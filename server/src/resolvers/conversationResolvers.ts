import { Conversation } from "../models/Conversation";

export const conversationResolvers = {
  Query: {
    getConversations: async (_: any, { userId }: { userId: string }) => {
      return await Conversation.find({ userId });
    },
    getConversation: async (_: any, { userId, conversationId }: any) => {
      return await Conversation.findOne({ _id: conversationId, userId });
    },
  },
  Mutation: {
    createConversation: async (_: any, { userId, conversationTitle, messages }: any) => {
      return await Conversation.create({ userId, conversationTitle, messages });
    },
    updateConversation: async (_: any, { conversationId, input }: any) => {
      return await Conversation.findByIdAndUpdate(conversationId, input, { new: true });
    },
    deleteConversation: async (_: any, { conversationId }: any) => {
      await Conversation.findByIdAndDelete(conversationId);
      return { message: "Conversation deleted successfully" };
    },
  },
};
