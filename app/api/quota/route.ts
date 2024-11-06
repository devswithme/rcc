import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		const data = await db.quota.findMany()
		const response = NextResponse.json(data[0], { status: 200 })
		response.headers.set('Access-Control-Allow-Origin', '*');  // Adjust origin as needed

		return response
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
