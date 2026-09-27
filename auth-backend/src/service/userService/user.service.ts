import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const userInfo = async (userId: number) => {
	return await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			surname: true,
			role: true,
		},
	})
}

const userUpdate = async (userId: number, name: string, surname: string, password: string, phoneNumber: string) => {
	return await prisma.user.update({
		where: { id: userId },
		data: {
			name,
			surname,
			password,
			phoneNumber,
		},
	})
}

const userService = { userInfo, userUpdate }
export default userService
