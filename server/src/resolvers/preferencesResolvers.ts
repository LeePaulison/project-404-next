import { Preferences } from "../models/Preferences";

export const preferencesResolvers = {
  Query: {
    getPreferences: async (_: any, { userId }: { userId: string }) => {
      return await Preferences.findOne({ userId });
    },
  },
  Mutation: {
    updatePreferences: async (_: any, { userId, input }: any) => {
      return await Preferences.findOneAndUpdate({ userId }, { $set: input }, { new: true, runValidators: true });
    },
  },
};
