import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const update = async (postId: number, title: string, content: string) => {
  return await prisma.post.update({
    where: {
       id: postId 
    },
    data: {
        title,
        content
    },
  });
};

const updateService = {update};
export default updateService;