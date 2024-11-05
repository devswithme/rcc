'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { formSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight, Info } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '@/components/ui/alert'
import { Label } from '@/components/ui/label'

export default function Home() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nama: '',
			whatsapp: '',
			umur: '',
			alamat: '',
			email: '',
			komsel: false,
			link: '',
			GKK: '',
			KK: '',
		},
	})

	const [home, setHome] = useState(true)

	const [result, setResult] = useState<{
		id: string
		nama: string
		ibadah: string
	}>()

	const [data, setData] = useState<{
		KU1: number
		KU2: number
		KU3: number
	}>({
		KU1: 0,
		KU2: 0,
		KU3: 0,
	})

	useEffect(() => {
		async function getQuota() {
			try {
				const result = await axios.get(
					'http://localhost:3000/api/quota'
				)
				setData(result.data)
			} catch (err) {
				console.error(err)
			}
		}

		getQuota()
	}, [])

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const result = await axios.post(
				'http://localhost:3000/api/users',
				JSON.stringify(values)
			)
			setResult(result.data)
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className='p-4'>
			<Card className='max-w-sm mx-auto'>
				<CardHeader>
					<CardTitle>Christmas Celebration</CardTitle>
					<CardDescription>Registrasi Online</CardDescription>
				</CardHeader>
				<CardContent>
					{home ? (
						<div className='space-y-3'>
							<h1 className='text-2xl font-semibold uppercase'>
								Son Of Man
							</h1>
							<span>Jadwal Ibadah: 22 Desember 2024</span>
							<ul className='ml-4 list-disc'>
								<li>KU 1 - Pk. 08.00 - Pdt. David Limanto</li>
								<li>KU 2 - Pk. 11.00 - Pdt. David Limanto</li>
								<li>KU 3 - Pk. 17.00 - Pdt. David Limanto</li>
							</ul>
							<Button onClick={() => setHome(false)}>
								Daftar Sekarang
							</Button>
						</div>
					) : result ? (
						<div className='space-y-3'>
							<div className='grid grid-cols-4 gap-x-4'>
								<QRCode
									className='w-full h-auto col-span-2'
									value={`http://localhost:3000/id/${result.id}`}
								/>
								<div className='col-span-2 space-y-1'>
									<div>
										<Label className='font-normal'>
											Nama Lengkap
										</Label>
										<p className='font-medium line-clamp-2 leading-tight'>
											{result.nama}
										</p>
									</div>
									<div>
										<Label className='font-normal'>Ibadah</Label>
										<p className='font-medium'>KU {result.ibadah}</p>
									</div>
								</div>
							</div>

							<Alert>
								<Info className='w-4 h-4' />
								<AlertTitle>Informasi</AlertTitle>
								<AlertDescription>
									Jemaat Wajib untuk melakukan registrasi ulang saat
									ibadah. Mohon hadir 30 menit sebelum jam ibadah dan
									menunjukan kode QR diatas kepada petugas registrasi.
								</AlertDescription>
							</Alert>
							<div className='flex w-full justify-between gap-x-2'>
								<Button
									variant='outline'
									className='w-full'>
									Screenshot
								</Button>
								<Button
									onClick={() => window.location.reload()}
									className='w-full'>
									Daftar Lagi
								</Button>
							</div>
						</div>
					) : (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-3'>
								<FormField
									control={form.control}
									name='ibadah'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ibadah</FormLabel>
											<Select onValueChange={field.onChange}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Pilih Ibadah' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{data?.KU1 > 0 && (
														<SelectItem value='1'>
															KU 1 - Pukul 8.00 - Kuota: {data?.KU1}{' '}
															orang
														</SelectItem>
													)}
													{data?.KU2 > 0 && (
														<SelectItem value='2'>
															KU 2 - Pukul 10.00 - Kuota: {data?.KU2}{' '}
															orang
														</SelectItem>
													)}
													{data?.KU3 > 0 && (
														<SelectItem value='3'>
															KU 3 - Pukul 12.00 - Kuota: {data?.KU3}{' '}
															orang
														</SelectItem>
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='nama'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nama Lengkap</FormLabel>
											<FormControl>
												<Input
													placeholder='Nama Lengkap'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='whatsapp'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nomor Whatsapp</FormLabel>
											<FormControl>
												<Input
													placeholder='08'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='umur'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Usia</FormLabel>
											<FormControl>
												<Input
													placeholder='Usia'
													type='number'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='alamat'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Alamat Lengkap</FormLabel>
											<FormControl>
												<Input
													placeholder='Alamat Lengkap'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Alamat Email</FormLabel>
											<FormControl>
												<Input
													placeholder='Alamat Email'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='komsel'
									render={({ field }) => (
										<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3'>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<div className='space-y-1 leading-none'>
												<FormLabel>Sudah Berkomsel?</FormLabel>
												<FormDescription>
													Sudah / Belum
												</FormDescription>
											</div>
										</FormItem>
									)}
								/>
								{form.getValues('komsel') && (
									<>
										<FormField
											control={form.control}
											name='GKK'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Nama GKK</FormLabel>
													<FormControl>
														<Input
															placeholder='Nama Gembala Komsel'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='KK'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Nama KK</FormLabel>
													<FormControl>
														<Input
															placeholder='Nama Komsel'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</>
								)}
								<Button
									type='submit'
									className='w-full'>
									Kirim Sekarang <ArrowUpRight />
								</Button>
							</form>
						</Form>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
