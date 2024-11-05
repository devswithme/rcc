import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
	try {
		const data = await db.quota.findMany()
		return NextResponse.json(data[0], { status: 200 })
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
