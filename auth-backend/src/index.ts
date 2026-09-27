import initExpress from './initExpress'

const main = async () => {
	const expressReady = initExpress()
	return {
		expressReady,
	}
}

main().then(console.log)
