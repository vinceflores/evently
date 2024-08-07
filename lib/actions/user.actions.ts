"use server";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Order from "../database/models/order.model";
//
import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { revalidatePath } from "next/cache";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();
    const created = await User.create(user);
    return JSON.parse(JSON.stringify(created));
  } catch (error) {
    handleError(error);
  }
};

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();
    //find user to delete
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: user.events } },
        { $pull: { organizer: user._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany({ _id: { $in: user.orders } }, { $unset: { buyer: 1 } }),
    ]);

    const deleted = await User.deleteOne({ clerkId });
    revalidatePath("/");
    return JSON.parse(JSON.stringify(deleted));
  } catch (error) {
    handleError(error);
  }
};
