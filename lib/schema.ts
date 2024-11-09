import { z } from 'zod'

const formSchema = z
	.object({
		ibadah: z.enum(['KU1', 'KU2', 'KU3']),
		nama: z.string().nonempty(),
		whatsapp: z.string().nonempty(),
		umur: z.string().nonempty(),
		alamat: z.string().nonempty(),
		komsel: z.enum(['sudah', 'belum']).default('belum'),
		link: z.string(),
		GKK: z.string(),
		KK: z.string(),
	})
	.refine(
		(data) => {
			if (data.komsel === 'sudah') {
				return data.GKK
			}
			return true
		},
		{
			path: ['GKK'],
		}
	)
	.refine(
		(data) => {
			if (data.komsel === 'sudah') {
				return data.KK
			}
			return true
		},
		{
			path: ['KK'],
		}
	)

const pinSchema = z.object({
	pin: z.string().min(6),
})

export { formSchema, pinSchema }
