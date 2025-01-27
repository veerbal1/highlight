import pino from 'pino'
import { CONSTANTS } from './constants'
import { H } from '@highlight-run/node'

export function startPino() {
	H.init({
		projectID: CONSTANTS.HIGHLIGHT_PROJECT_ID ?? '1',
		debug: true,
		serviceName: 'e2e-express-pino-manual-init',
		serviceVersion: 'git-sha',
		otlpEndpoint: CONSTANTS.HIGHLIGHT_OTLP_ENDPOINT,
	})

	const logger = pino({
		transport: {
			targets: [
				{
					target: '@highlight-run/pino',
					options: {
						projectID: CONSTANTS.HIGHLIGHT_PROJECT_ID,
						debug: true,
						serviceVersion: 'git-sha',
						otlpEndpoint: CONSTANTS.HIGHLIGHT_OTLP_ENDPOINT,
						serviceName: 'e2e-express-pino',
					},
					level: 'info',
				},
				{
					target: 'pino-pretty',
					options: {
						colorize: true,
					},
					level: 'info',
				},
			],
		},
	})

	H.runWithHeaders({ 'x-highlight-request': '987654/321654' }, () => {
		logger.info('hello world')

		const child = logger.child({ a: 'property' })

		child.info('hello child!')
	})
}
