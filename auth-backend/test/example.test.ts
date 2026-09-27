import { describe } from 'mocha'
import { expect } from 'chai'
import exampleService from '../src/service/example.service'

describe('Example Service testing', () => {
	describe('Sunny Day Scenario', async () => {
		it('test 1', async () => {
			const response = exampleService.list()
			expect(response).to.be.an('array')
			expect(response).to.have.lengthOf(1)
			expect(response[0]).to.have.property('name').to.be.a('string').to.equal('John Doe')
			expect(response[0]).to.have.property('age').to.be.a('number').to.equal(30)
		})
	})
})
