import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const update = async (text:string, commentId: number, userId: number) => {
    return await prisma.comment.update({
    where: {
        id: commentId,
        authorId: userId 
    },
    data: {
        text
    },
    })
}

const commentUpdate = { update };
export default commentUpdate