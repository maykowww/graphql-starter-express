import { PrismaClient } from "@prisma/client";
import { extractSelection } from "../utils/extractSelections";
import { GraphQLResolveInfo } from "graphql";

type GetUsersArgs = {
  info: GraphQLResolveInfo;
};

type GetUserArgs = GetUsersArgs & {
  id: string;
};

type UserInput = {
  email: string;
  username?: string;
};

type UpdateUserInput = Pick<GetUserArgs, "id"> & UserInput;

const prisma = new PrismaClient();

export const getUsers = async ({ info }: GetUsersArgs) => {
  const extractedSelections = extractSelection(info);
  const postsIncluded = extractedSelections.includes("posts");

  if (postsIncluded) {
    return await prisma.user.findMany({ include: { posts: true } });
  }

  return await prisma.user.findMany();
};

export const getUser = async ({ id, info }: GetUserArgs) => {
  const extractedSelections = extractSelection(info);
  const postsIncluded = extractedSelections.includes("posts");

  if (postsIncluded) {
    return await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async ({ email, username }: UserInput) => {
  const createdUser = await prisma.user.create({
    data: {
      email,
      username,
    },
  });

  return createdUser;
};

export const updateUser = async ({ id, username, email }: UpdateUserInput) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      username,
      email,
    },
  });

  return updatedUser;
};

export const deleteUser = async ({ id }: Pick<GetUserArgs, "id">) => {
  const deletedUser = await prisma.user.delete({
    where: { id },
    include: { posts: true },
  });

  return deletedUser;
};
