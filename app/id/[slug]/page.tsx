'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { pinSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function Page() {
	const { slug } = useParams()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<z.infer<typeof pinSchema>>({
		resolver: zodResolver(pinSchema),
		defaultValues: {
			pin: '',
		},
	})

	async function onSubmit(values: z.infer<typeof pinSchema>) {
		setIsLoading(true)
		if (values.pin === process.env.NEXT_PUBLIC_PIN_PWD) {
			try {
				await axios.patch('https://rccdenpasar.org/api/users', {
					slug,
				})
				toast('User berhasil diverifikasi', {
					description: 'Selamat beribadah!',
				})
				form.reset()
				setIsLoading(false)
			} catch (err) {
				toast('Mohon periksa ID', {
					description: 'ID tidak ditemukan atau teregistrasi',
				})
				console.error(err)
			}
		}
	}
	return (
		<div className='p-4'>
			<Card className='max-w-sm mx-auto'>
				<CardHeader>
					<CardTitle>Verification</CardTitle>
					<CardDescription>
						Mohon tunjukan kepada petugas.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-3'>
							<FormField
								control={form.control}
								name='pin'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='font-semibold'>
											Enter PIN *
										</FormLabel>
										<FormControl>
											<Input
												type='password'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<Button
								type='submit'
								className='w-full !mt-6'
								disabled={isLoading}>
								{!isLoading ? (
									<>
										Verify <ArrowUpRight />
									</>
								) : (
									<>
										Mohon tunggu..{' '}
										<Loader2 className='animate-spin' />
									</>
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
