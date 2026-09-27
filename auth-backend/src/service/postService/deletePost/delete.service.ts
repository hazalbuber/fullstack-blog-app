import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const deletePost = async (postId: number, userId: number) => {
    return await prisma.post.delete({
    where: {
        authorId: userId,
        id: postId 
    }
    })

}

const deleteService = {deletePost}
export default deleteService