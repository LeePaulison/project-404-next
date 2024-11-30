import { conversationResolvers } from "../resolvers/conversationResolvers";
import { Conversation } from "../models/Conversation";

jest.mock("../models/Conversation");

describe("conversationResolvers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Query: getConversations", () => {
    it("should retrieve all conversations for a valid userId", async () => {
      const mockConversations = [
        { _id: "conv1", userId: "user-id", title: "Conversation 1" },
        { _id: "conv2", userId: "user-id", title: "Conversation 2" },
      ];

      (Conversation.find as jest.Mock).mockResolvedValue(mockConversations);

      const result = await conversationResolvers.Query.getConversations(null, { userId: "user-id" });

      expect(Conversation.find).toHaveBeenCalledWith({ userId: "user-id" });
      expect(result).toEqual(mockConversations);
    });

    it("should return an empty array if no conversations exist", async () => {
      (Conversation.find as jest.Mock).mockResolvedValue([]);

      const result = await conversationResolvers.Query.getConversations(null, { userId: "user-id" });

      expect(Conversation.find).toHaveBeenCalledWith({ userId: "user-id" });
      expect(result).toEqual([]);
    });
  });

  describe("Query: getConversation", () => {
    it("should retrieve a conversation for valid userId and conversationId", async () => {
      const mockConversation = {
        _id: "conv1",
        userId: "user-id",
        title: "Test Conversation",
      };

      (Conversation.findOne as jest.Mock).mockResolvedValue(mockConversation);

      const result = await conversationResolvers.Query.getConversation(null, {
        userId: "user-id",
        conversationId: "conv1",
      });

      expect(Conversation.findOne).toHaveBeenCalledWith({ _id: "conv1", userId: "user-id" });
      expect(result).toEqual(mockConversation);
    });

    it("should return null if the conversation is not found", async () => {
      (Conversation.findOne as jest.Mock).mockResolvedValue(null);

      const result = await conversationResolvers.Query.getConversation(null, {
        userId: "user-id",
        conversationId: "nonexistent",
      });

      expect(Conversation.findOne).toHaveBeenCalledWith({ _id: "nonexistent", userId: "user-id" });
      expect(result).toBeNull();
    });
  });

  describe("Mutation: createConversation", () => {
    it("should create a conversation successfully", async () => {
      const mockConversation = {
        _id: "conv1",
        userId: "user-id",
        title: "New Conversation",
        messages: [],
      };

      (Conversation.create as jest.Mock).mockResolvedValue(mockConversation);

      const result = await conversationResolvers.Mutation.createConversation(null, {
        userId: "user-id",
        conversationTitle: "New Conversation",
        messages: [],
      });

      expect(Conversation.create).toHaveBeenCalledWith({
        userId: "user-id",
        conversationTitle: "New Conversation",
        messages: [],
      });
      expect(result).toEqual(mockConversation);
    });

    it("should throw an error if creation fails", async () => {
      (Conversation.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(
        conversationResolvers.Mutation.createConversation(null, {
          userId: "user-id",
          conversationTitle: "New Conversation",
          messages: [],
        })
      ).rejects.toThrow("Database error");

      expect(Conversation.create).toHaveBeenCalled();
    });
  });

  describe("Mutation: updateConversation", () => {
    it("should update a conversation successfully", async () => {
      const mockUpdatedConversation = {
        _id: "conv1",
        userId: "user-id",
        title: "Updated Conversation",
      };

      (Conversation.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedConversation);

      const result = await conversationResolvers.Mutation.updateConversation(null, {
        conversationId: "conv1",
        input: { conversationTitle: "Updated Conversation" },
      });

      expect(Conversation.findByIdAndUpdate).toHaveBeenCalledWith(
        "conv1",
        { conversationTitle: "Updated Conversation" },
        { new: true }
      );
      expect(result).toEqual(mockUpdatedConversation);
    });

    it("should throw an error if update fails", async () => {
      (Conversation.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(
        conversationResolvers.Mutation.updateConversation(null, {
          conversationId: "conv1",
          input: { conversationTitle: "Updated Conversation" },
        })
      ).rejects.toThrow("Database error");

      expect(Conversation.findByIdAndUpdate).toHaveBeenCalled();
    });
  });

  describe("Mutation: deleteConversation", () => {
    it("should delete a conversation successfully", async () => {
      (Conversation.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

      const result = await conversationResolvers.Mutation.deleteConversation(null, {
        conversationId: "conv1",
      });

      expect(Conversation.findByIdAndDelete).toHaveBeenCalledWith("conv1");
      expect(result).toEqual({ message: "Conversation deleted successfully" });
    });

    it("should throw an error if deletion fails", async () => {
      (Conversation.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(
        conversationResolvers.Mutation.deleteConversation(null, {
          conversationId: "conv1",
        })
      ).rejects.toThrow("Database error");

      expect(Conversation.findByIdAndDelete).toHaveBeenCalled();
    });
  });
});
