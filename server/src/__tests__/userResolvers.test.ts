import { userResolvers } from "../resolvers/userResolvers";
import { User } from "../models/User";
import { Preferences } from "../models/Preferences";

jest.mock("../models/User"); // Mock User model
jest.mock("../models/Preferences"); // Mock Preferences model

describe("userResolvers - Query: getUser", () => {
  let mockUser: any;

  beforeEach(() => {
    // Mock user with preferences and conversations
    mockUser = {
      _id: "12345",
      preferences: { theme: "dark", notifications: true },
      conversations: [{ _id: "conv1", title: "Test Conversation" }],
      populate: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve a user with preferences and conversations", async () => {
    (User.findById as jest.Mock).mockReturnValueOnce(mockUser);

    const result = await userResolvers.Query.getUser(null, { userId: "12345" });

    expect(User.findById).toHaveBeenCalledWith("12345");
    expect(mockUser.populate).toHaveBeenCalledWith("preferences");
    expect(mockUser.populate).toHaveBeenCalledWith("conversations");
    expect(result).toEqual(mockUser);
  });

  it("should throw an error if the user is not found", async () => {
    (User.findById as jest.Mock).mockReturnValueOnce(null);

    await expect(userResolvers.Query.getUser(null, { userId: "nonexistent" })).rejects.toThrowError(
      "Cannot read properties of null (reading 'populate')"
    );
  });
});

describe("userResolvers - Mutation: createUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user successfully", async () => {
    const mockUser = {
      _id: "12345",
      firebaseUIDs: [{ uid: "firebase-uid" }],
      googleUID: "google-uid",
      email: "test@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      save: jest.fn().mockResolvedValue(true), // Mock save method
    };

    // Mock User constructor to return our mockUser
    (User as unknown as jest.Mock).mockImplementation(() => mockUser);

    const result = await userResolvers.Mutation.createUser(null, {
      firebaseUID: "firebase-uid",
      googleUID: "google-uid",
      email: "test@example.com",
    });

    expect(User).toHaveBeenCalledWith({
      firebaseUIDs: [{ uid: "firebase-uid" }],
      googleUID: "google-uid",
      email: "test@example.com",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(mockUser.save).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it("should throw an error if user creation fails", async () => {
    const mockUser = {
      save: jest.fn().mockRejectedValue(new Error("Database error")), // Simulate save failure
    };

    (User as unknown as jest.Mock).mockImplementation(() => mockUser);

    await expect(
      userResolvers.Mutation.createUser(null, {
        firebaseUID: "firebase-uid",
        googleUID: "google-uid",
        email: "test@example.com",
      })
    ).rejects.toThrowError("Database error");

    expect(mockUser.save).toHaveBeenCalled();
  });
});

describe("userResolvers - Mutation: updateUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update an existing user successfully", async () => {
    const mockUpdatedUser = {
      _id: "12345",
      email: "updated@example.com",
      displayName: "Updated User",
    };

    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

    const result = await userResolvers.Mutation.updateUser(null, {
      userId: "12345",
      input: { email: "updated@example.com", displayName: "Updated User" },
    });

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "12345",
      { email: "updated@example.com", displayName: "Updated User" },
      { new: true }
    );
    expect(result).toEqual(mockUpdatedUser);
  });

  it("should throw an error if user update fails", async () => {
    (User.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(
      userResolvers.Mutation.updateUser(null, { userId: "12345", input: { email: "updated@example.com" } })
    ).rejects.toThrowError("Database error");

    expect(User.findByIdAndUpdate).toHaveBeenCalled();
  });
});

describe("userResolvers - Mutation: deleteUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a user successfully", async () => {
    (User.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

    const result = await userResolvers.Mutation.deleteUser(null, { userId: "12345" });

    expect(User.findByIdAndDelete).toHaveBeenCalledWith("12345");
    expect(result).toEqual({ message: "User deleted successfully" });
  });

  it("should throw an error if user deletion fails", async () => {
    (User.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(userResolvers.Mutation.deleteUser(null, { userId: "12345" })).rejects.toThrowError("Database error");

    expect(User.findByIdAndDelete).toHaveBeenCalled();
  });
});

describe("userResolvers - Mutation: mergeUserUIDs", () => {
  let googleUser: any;
  let anonymousUser: any;

  function mockResolvedValueOnce(arg0: { _id: string; userId: any; save: jest.Mock<any, any, any> }) {
    throw new Error("Function not implemented.");
  }

  beforeEach(() => {
    googleUser = {
      _id: "google-user-id",
      firebaseUIDs: [{ uid: "firebase-uid-1" }],
      save: jest.fn().mockResolvedValue(true),
    };
    anonymousUser = {
      _id: "anonymous-user-id",
      firebaseUIDs: [{ uid: "firebase-uid-2" }],
      deleteOne: jest.fn().mockResolvedValue(true),
      save: jest.fn().mockResolvedValue(true),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should merge Firebase UIDs and preferences successfully", async () => {
    (User.findOne as jest.Mock)
      .mockResolvedValueOnce(googleUser) // Google user
      .mockResolvedValueOnce(anonymousUser); // Anonymous user

    (Preferences.findOne as jest.Mock)
      .mockResolvedValueOnce(null) // No preferences for Google user
      .mockResolvedValueOnce({ _id: "anonymous-prefs-id", save: jest.fn().mockResolvedValue(true) });

    const result = await userResolvers.Mutation.mergeUserUIDs(
      null,
      { primaryUID: "firebase-uid-2", googleUID: "google-uid", email: "test@example.com" },
      { ip: "127.0.0.1" }
    );

    expect(User.findOne).toHaveBeenCalledTimes(2);
    expect(googleUser.save).toHaveBeenCalled();
    expect(anonymousUser.deleteOne).toHaveBeenCalled();
    expect(result).toEqual(googleUser);
  });

  it("should throw an error if neither user is found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      userResolvers.Mutation.mergeUserUIDs(
        null,
        { primaryUID: "firebase-uid-2", googleUID: "google-uid", email: "test@example.com" },
        { ip: "127.0.0.1" }
      )
    ).rejects.toThrow("User not found for merging.");

    expect(User.findOne).toHaveBeenCalledTimes(2);
  });

  it("should throw an error if database operations fail", async () => {
    (User.findOne as jest.Mock)
      .mockResolvedValueOnce(googleUser) // Google user
      .mockResolvedValueOnce(anonymousUser); // Anonymous user
    (anonymousUser.deleteOne as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(
      userResolvers.Mutation.mergeUserUIDs(
        null,
        { primaryUID: "firebase-uid-2", googleUID: "google-uid", email: "test@example.com" },
        { ip: "127.0.0.1" }
      )
    ).rejects.toThrow("Internal server error");

    expect(anonymousUser.deleteOne).toHaveBeenCalled();
  });
});
