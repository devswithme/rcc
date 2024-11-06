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
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { pinSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { CheckCircle2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function Page() {
	const { slug } = useParams()
	const [isSuccess, setIsSuccess] = useState<boolean>(false)

	const form = useForm<z.infer<typeof pinSchema>>({
		resolver: zodResolver(pinSchema),
		defaultValues: {
			pin: '',
		},
	})

	async function onSubmit(values: z.infer<typeof pinSchema>) {
		if (values.pin === process.env.NEXT_PUBLIC_PIN_PWD) {
			try {
				await axios.patch('https://rccdenpasar.org/api/users', {
					slug,
				})
				form.reset()
				setIsSuccess(true)
			} catch (err) {
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
					{isSuccess ? (
						<div className='flex flex-col items-center justify-center'>
							<CardHeader className='text-center flex items-center justify-center'>
								<CheckCircle2 className='w-16 h-16 mb-2 text-green-600' />
								<CardTitle>Success</CardTitle>
								<CardDescription>Selamat beribadah.</CardDescription>
							</CardHeader>
						</div>
					) : (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-3'>
								<FormField
									control={form.control}
									name='pin'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Enter PIN</FormLabel>
											<FormControl>
												<Input
													type='password'
													placeholder='PIN'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type='submit'
									className='w-full'>
									Verify
								</Button>
							</form>
						</Form>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
