import { User } from "../models/User";
import { Preferences } from "../models/Preferences";
import { Conversation } from "../models/Conversation";
import { ObjectId } from "mongodb";

export const userResolvers = {
  Query: {
    getUser: async (_: any, { userId }: { userId: string }) => {
      return await User.findById(userId).populate("preferences").populate("conversations");
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { firebaseUID, googleUID, email }: { firebaseUID: string; googleUID?: string; email?: string },
      { ip }: { ip: string }
    ) => {
      console.log("Creating user with firebaseUID:", firebaseUID, "googleUID:", googleUID, "email:", email);
      console.log("IP Address:", ip);
      try {
        const userIP = ip || "";
        const normalizedEmail = email ? email.toLowerCase() : "";
        const currentTime = Date.now();

        // 1. Check if a user already exists
        let existingUser = await User.findOne({
          $or: [
            { "firebaseUIDs.uid": firebaseUID },
            { googleUID },
            { email: normalizedEmail },
            { lastKnownIP: userIP },
          ],
        });

        if (existingUser) {
          // Update Google UID and email
          if (googleUID && !existingUser.googleUID) {
            existingUser.googleUID = googleUID;
            existingUser.email = normalizedEmail;
            existingUser.lastKnownIP = userIP;
            existingUser.updatedAt = new Date(currentTime);
          }

          // Archive anonymous UID
          const anonymousUID = existingUser.firebaseUIDs.find((uid) => uid.uid === firebaseUID);
          if (anonymousUID && !anonymousUID.archived) {
            anonymousUID.archived = true;
            anonymousUID.archivedAt = new Date(currentTime);
          }

          // Merge Preferences
          let preferences = await Preferences.findOne({ userId: existingUser._id });
          if (!preferences) {
            preferences = new Preferences({ userId: existingUser._id });
            await preferences.save();
          }

          await existingUser.save();
          return existingUser;
        }

        // 2. Set up new user data structure
        let newUserData: any = {
          createdAt: currentTime,
          updatedAt: currentTime,
          lastKnownIP: userIP,
        };

        // Add Google data if available
        if (googleUID && email) {
          newUserData.googleUID = googleUID;
          newUserData.email = normalizedEmail;
        }

        // Add anonymous UID
        if (firebaseUID) {
          newUserData.firebaseUIDs = [
            {
              uid: firebaseUID,
              createdAt: currentTime,
              updatedAt: currentTime,
              archived: false,
              archivedAt: null,
            },
          ];
        }

        // 3. Create the new user
        const newUser = await User.create(newUserData);

        // 4. Create default preferences
        const defaultPreferences = new Preferences({ userId: newUser._id });
        await defaultPreferences.save();

        // 5. Create a starter conversation for the new user
        const starterConversation = new Conversation({
          userId: newUser._id,
          conversationTitle: "Welcome to Project 404!",
          messages: [
            {
              role: "system",
              content: "This is your first conversation. Start exploring!",
              timestamp: currentTime,
            },
          ],
          createdAt: currentTime,
          updatedAt: currentTime,
        });

        await starterConversation.save();

        return newUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Internal server error");
      }
    },
    updateUser: async (_: any, { userId, input }: any) => {
      return await User.findByIdAndUpdate(userId, input, { new: true });
    },
    deleteUser: async (_: any, { userId }: any) => {
      await User.findByIdAndDelete(userId);
      return { message: "User deleted successfully" };
    },
    mergeUserUIDs: async (_: any, { primaryUID, googleUID, email }: any, { ip }: any) => {
      try {
        const userIP = ip; // Access IP from context
        const currentTime = Date.now();
        const normalizedEmail = email ? email.toLowerCase() : "";

        // Step 1: Find users by googleUID and primaryUID
        const [googleUser, anonymousUser] = await Promise.all([
          User.findOne({ googleUID }),
          User.findOne({ $or: [{ "firebaseUIDs.uid": primaryUID }, { lastKnownIP: userIP }] }),
        ]);

        // console.log("Merging UIDs - googleUser:", googleUser, "anonymousUser:", anonymousUser);

        if (googleUser) {
          // If there's an anonymous user, delete it after merging
          if (anonymousUser) {
            // Merge anonymous preferences into googleUser if googleUser has no preferences
            const googleUserPreferences = await Preferences.findOne({ userId: googleUser._id });
            const anonymousUserPreferences = await Preferences.findOne({ userId: anonymousUser._id });

            if (!googleUserPreferences && anonymousUserPreferences) {
              anonymousUserPreferences.userId = googleUser._id as unknown as ObjectId;
              await anonymousUserPreferences.save();
            } else if (anonymousUserPreferences) {
              await anonymousUserPreferences.deleteOne();
            }

            await anonymousUser.deleteOne();
          }

          // Check if primaryUID already exists in googleUser's firebaseUIDs
          const existingUID = googleUser.firebaseUIDs.find((uid) => uid.uid === primaryUID);

          if (!existingUID) {
            // Add new primaryUID entry if not already present
            googleUser.firebaseUIDs.push({
              uid: primaryUID,
              createdAt: new Date(),
              updatedAt: new Date(),
              archived: true,
              archivedAt: new Date(),
              mergedAt: new Date(),
            });
          } else if (!existingUID.archived) {
            // Archive existing primaryUID if not already archived
            existingUID.archived = true;
            existingUID.archivedAt = new Date(currentTime);
          }

          // Update timestamps
          googleUser.updatedAt = new Date(currentTime);
          googleUser.mergedAt = new Date(currentTime);

          await googleUser.save();
          return googleUser;
        }

        // Case 2: No googleUID found, handle anonymous user with primaryUID
        if (anonymousUser) {
          // Archive all existing firebaseUIDs
          anonymousUser.firebaseUIDs = anonymousUser.firebaseUIDs.map((uid) => ({
            ...uid,
            archived: true,
            archivedAt: new Date(currentTime),
          }));

          // Add Google-specific details to the anonymous user
          Object.assign(anonymousUser, {
            googleUID,
            email: normalizedEmail,
            updatedAt: currentTime,
            mergedAt: currentTime,
          });

          await anonymousUser.save();
          return anonymousUser;
        }

        // If neither user was found
        throw new Error("User not found for merging.");
      } catch (error) {
        if (error instanceof Error && error.message === "User not found for merging.") {
          throw error; // Re-throw specific error
        }

        console.error("Error merging UIDs:", error);
        throw new Error("Internal server error");
      }
    },
  },
};
