import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const deleteComment = async (commentId: number) => {
    return await prisma.comment.delete({
    where: {
        id: commentId
    }
    })
}

const commentDelete = { deleteComment };
export default commentDelete



