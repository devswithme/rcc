import { z } from 'zod'

const formSchema = z
	.object({
		ibadah: z.enum(['1', '2', '3']).default('1'),
		nama: z.string().nonempty(),
		whatsapp: z.string().nonempty(),
		umur: z.string().nonempty(),
		alamat: z.string().nonempty(),
		email: z.string().email().nonempty(),
		komsel: z.boolean().default(false),
		link: z.string(),
		GKK: z.string(),
		KK: z.string(),
	})
	.refine((data) => !data.komsel || (data.GKK && data.KK), {
		message: 'required',
		path: ['GKK'], // Specifies where the error should appear
	})

const pinSchema = z.object({
	pin: z.string().min(6),
})

export { formSchema, pinSchema }
