import { NextResponse } from 'next/server'
import db from '@/lib/db'
import corsMiddleware from '@/lib/cors'

export async function GET(req: Request, res: Response) {
	await corsMiddleware(req, res) // Enable CORS
	try {
		const data = await db.quota.findMany()
		return NextResponse.json(data[0], { status: 200 })
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
