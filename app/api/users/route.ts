import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
		try {
			// @ts-ignore
		const data = await req.json()
		const result = await db.user.create({
			data,
			select: { id: true, nama: true, ibadah: true },
		})
		await db.user.update({
			where: { id: result.id },
			data: {
				link: `https://www.rccdenpasar.org/id/${result.id}`,
			},
		})

		const propQuota = `KU${result.ibadah}`
		const quota = await db.quota.findMany()

		// @ts-expect-error: Fixing issue with dynamic object property access
		await db.quota.update({
			where: { id: 1 },
			data: {
				[propQuota]: quota[0][propQuota] - 1,
			},
		})
		const response = NextResponse.json(result, { status: 201 })
		response.headers.set('Access-Control-Allow-Origin', '*');  // Adjust origin as needed

		return response
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}

export async function PATCH(req: Request) {
	try {
		const { slug } = await req.json()
		await db.user.update({
			where: {
				id: slug,
			},
			data: {
				isVerified: true,
			},
		})
		const response =  NextResponse.json({ ok: true }, { status: 201 })
		response.headers.set('Access-Control-Allow-Origin', '*');  // Adjust origin as needed

		return response
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
