import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
	try {
		const data = await req.json()

		const result = await db.user.create({
			data,
			select: {
				id: true,
				nama: true,
				ibadah: true,
				whatsapp: true,
				link: true,
			},
		})

		const update = await db.user.update({
			where: { id: result.id },
			data: {
				link: `https://www.rccdenpasar.org/id/${result.id}`,
			},
			select: {
				link: true
			}
		})

		const quota = await db.quota.findMany()

		await db.quota.update({
			where: { id: 1 },
			data: {
				[result.ibadah]: quota[0][result.ibadah] - 1,
			},
		})

		result.link = update.link

		const response = NextResponse.json(result, { status: 201 })
		response.headers.set('Access-Control-Allow-Origin', '*') // Adjust origin as needed

		return response
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}

export async function PATCH(req: Request) {
	try {
		// Extract the slug from the request body
		const { slug } = await req.json()

		// Update the user as verified
		await db.user.update({
			where: { id: slug },
			data: { isVerified: true },
		})

		const response = NextResponse.json({ ok: true }, { status: 200 })
		response.headers.set('Access-Control-Allow-Origin', '*') // Adjust origin as needed

		return response
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
