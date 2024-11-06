import { NextResponse } from 'next/server'
import db from '@/lib/db'
import corsMiddleware from '@/lib/cors'
import { NextApiRequest, NextApiResponse } from 'next'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	await corsMiddleware(req, res)
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

		await db.quota.update({
			where: { id: 1 },
			data: {
				// @ts-ignore: Explanation of why this error is ignored
				[propQuota]: quota[0][propQuota] - 1,
			},
		})
		return NextResponse.json(result, { status: 201 })
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
		return NextResponse.json({ ok: true }, { status: 201 })
	} catch (err) {
		return NextResponse.json(err, { status: 500 })
	}
}
