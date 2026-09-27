var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value)
					})
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value))
				} catch (e) {
					reject(e)
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value))
				} catch (e) {
					reject(e)
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next())
		})
	}
import { describe } from 'mocha'
import { expect } from 'chai'
import exampleService from '../src/service/example.service'
describe('Example Service testing', () => {
	describe('Sunny Day Scenario', () =>
		__awaiter(void 0, void 0, void 0, function* () {
			it('test 1', () =>
				__awaiter(void 0, void 0, void 0, function* () {
					const response = exampleService.list()
					expect(response).to.be.an('array')
					expect(response).to.have.lengthOf(1)
					expect(response[0]).to.have.property('name').to.be.a('string').to.equal('John Doe')
					expect(response[0]).to.have.property('age').to.be.a('number').to.equal(30)
				}))
		}))
})
//# sourceMappingURL=example.test.js.map
