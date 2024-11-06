import { NextResponse } from 'next/server'
import db from '@/lib/db'
import corsMiddleware from '@/lib/cors'
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	await corsMiddleware(req, res)
	try {
		const data = await db.quota.findMany()
		return NextResponse.json(data[0], { status: 200 })
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
