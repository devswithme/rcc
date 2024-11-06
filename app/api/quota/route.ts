import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
	try {
		const data = await db.quota.findMany()
		const response = NextResponse.json(data[0], { status: 200 })
		response.headers.set('Access-Control-Allow-Origin', '*');  // Adjust origin as needed

		return response
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
