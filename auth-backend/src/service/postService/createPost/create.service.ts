import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const create = async (userId: number, title: string, content: string) => {
  return await prisma.post.create({
    data: {
      title,
      content,
      authorId: userId,
    },
  });
};

const createService = { create };
export default createService;
