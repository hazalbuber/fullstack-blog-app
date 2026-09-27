import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const create = async (userId: number, text:string, postId: number) => {
    return await prisma.comment.create({
        data: {
        authorId: userId,
        text,
        postId
    }
    })
}

const commentCrearte = { create };
export default commentCrearte