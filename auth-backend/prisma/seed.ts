import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient()
import hashUtils from '../src/utils/hash/hashUtils'

async function main() {
	const adminEmail = process.env.API_ADMIN_EMAIL ?? 'elifbuber@dt.net.tr'
	const adminPassword = hashUtils.hash(process.env.API_ADMIN_PASSWORD ?? 'yu5WiU775OvO')

	await prisma.user.upsert({
		where: { email: adminEmail },
		update: {},
		create: {
			email: adminEmail,
			name: 'Admin',
			role: Role.ADMIN,
			password: adminPassword,
		},
	})
	console.log('Admin user ensured')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
