// test/login.test.ts
import chai from 'chai'
import chaiHttp from 'chai-http'
import { PrismaClient } from '@prisma/client'
import hash from '../src/utils/hash/hashUtils'
import initExpress from '../src/initExpress'

chai.use(chaiHttp)
const { expect } = chai

const prisma = new PrismaClient()
const app = initExpress() // Bu initExpress.ts içindeki Express app olmalı

describe('POST /login', () => {
	const testEmail = 'testuser@example.com'
	const testPassword = '123456'

	before(async () => {
		// Kullanıcıyı DB'ye ekle
		await prisma.user.create({
			data: {
				email: testEmail,
				password: hash(testPassword), // Hash fonksiyonun varsa
				role: 'USER',
			},
		})
	})

	after(async () => {
		// Kullanıcıyı DB'den sil
		await prisma.user.deleteMany({
			where: { email: testEmail },
		})
	})

	it('should return 400 if email or password is missing', (done) => {
		chai
			.request(app)
			.post('/login')
			.send({ email: testEmail }) // Şifre eksik
			.end((err, res) => {
				expect(res).to.have.status(400)
				expect(res.text).to.equal('Email and password are required')
				done()
			})
	})

	it('should return error if email is incorrect', (done) => {
		chai
			.request(app)
			.post('/login')
			.send({ email: 'wrong@example.com', password: testPassword })
			.end((err, res) => {
				expect(res).to.have.status(200)
				expect(res.text).to.equal('Login unsuccessful your email is not corretct')
				done()
			})
	})

	it('should return 401 if password is incorrect', (done) => {
		chai
			.request(app)
			.post('/login')
			.send({ email: testEmail, password: 'wrongpass' })
			.end((err, res) => {
				expect(res).to.have.status(401)
				expect(res.text).to.equal('Invalid email or password...')
				done()
			})
	})

	it('should return token on successful login', (done) => {
		chai
			.request(app)
			.post('/login')
			.send({ email: testEmail, password: testPassword })
			.end((err, res) => {
				expect(res).to.have.status(200)
				expect(res.body).to.have.property('msg', 'Login is successful.')
				expect(res.body).to.have.property('token')
				done()
			})
	})
})
