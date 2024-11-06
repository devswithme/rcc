// lib/corsMiddleware.ts
import Cors from 'cors'

// Initialize the cors middleware
const cors = Cors({
	methods: ['GET', 'POST', 'PATCH'], // Add allowed methods here
	origin: '*', // Replace with a specific origin or an array of origins in production
})

// Helper function to wait for middleware to complete
function runMiddleware(req: Request, res: Response, fn: Function) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result)
			}
			return resolve(result)
		})
	})
}

export default async function corsMiddleware(
	req: Request,
	res: Response
) {
	await runMiddleware(req, res, cors)
}
