import { preferencesResolvers } from "../resolvers/preferencesResolvers";
import { Preferences } from "../models/Preferences";

jest.mock("../models/Preferences");

describe("preferencesResolvers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Query: getPreferences", () => {
    it("should retrieve preferences for a valid userId", async () => {
      const mockPreferences = {
        _id: "preferences-id",
        userId: "user-id",
        theme: "dark",
        notifications: true,
      };

      (Preferences.findOne as jest.Mock).mockResolvedValue(mockPreferences);

      const result = await preferencesResolvers.Query.getPreferences(null, { userId: "user-id" });

      expect(Preferences.findOne).toHaveBeenCalledWith({ userId: "user-id" });
      expect(result).toEqual(mockPreferences);
    });

    it("should return null if preferences are not found", async () => {
      (Preferences.findOne as jest.Mock).mockResolvedValue(null);

      const result = await preferencesResolvers.Query.getPreferences(null, { userId: "nonexistent-id" });

      expect(Preferences.findOne).toHaveBeenCalledWith({ userId: "nonexistent-id" });
      expect(result).toBeNull();
    });
  });

  describe("Mutation: updatePreferences", () => {
    it("should update preferences successfully", async () => {
      const mockUpdatedPreferences = {
        _id: "preferences-id",
        userId: "user-id",
        theme: "light",
        notifications: false,
      };

      (Preferences.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedPreferences);

      const result = await preferencesResolvers.Mutation.updatePreferences(null, {
        userId: "user-id",
        input: { theme: "light", notifications: false },
      });

      expect(Preferences.findOneAndUpdate).toHaveBeenCalledWith(
        { userId: "user-id" },
        { $set: { theme: "light", notifications: false } },
        { new: true, runValidators: true }
      );
      expect(result).toEqual(mockUpdatedPreferences);
    });

    it("should throw an error if update fails", async () => {
      (Preferences.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(
        preferencesResolvers.Mutation.updatePreferences(null, {
          userId: "user-id",
          input: { theme: "light", notifications: false },
        })
      ).rejects.toThrow("Database error");

      expect(Preferences.findOneAndUpdate).toHaveBeenCalled();
    });
  });
});
