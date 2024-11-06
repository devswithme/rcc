import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
  try {
    // Ensure the request body is parsed as JSON
    const data = await req.json()
    
    // Creating a new user entry
    const result = await db.user.create({
      data,
      select: { id: true, nama: true, ibadah: true },
    })

    // Update the newly created user with a link
    await db.user.update({
      where: { id: result.id },
      data: {
        link: `https://www.rccdenpasar.org/id/${result.id}`,
      },
    })

    // Prepare the dynamic property name for quota based on the user's ibadah
    const propQuota = `KU${result.ibadah}` as keyof typeof db.quota
    const quota = await db.quota.findMany()

    // Dynamically update the quota
    await db.quota.update({
      where: { id: 1 },
      data: {
        [propQuota]: quota[0][propQuota] - 1,
      },
    })

    // Return the result in the response
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
