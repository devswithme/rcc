'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
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
import {
	ArrowRight,
	ArrowUpRight,
	Copy,
	Download,
	Info,
	Loader2,
} from 'lucide-react'
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
import {
	RadioGroup,
	RadioGroupItem,
} from '@/components/ui/radio-group'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'

export default function Home() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nama: '',
			whatsapp: '',
			umur: '',
			alamat: '',
			komsel: 'belum',
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
		whatsapp: string
		link: string
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

	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		async function getQuota() {
			try {
				const result = await axios.get(
					'https://rccdenpasar.org/api/quota'
				)
				setData(result.data)
				setIsLoading(false)
			} catch (err) {
				console.error(err)
			}
		}

		getQuota()
	}, [])

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		try {
			console.log(values)
			const result = await axios.post(
				'https://rccdenpasar.org/api/users',
				JSON.stringify(values)
			)
			setResult(result.data)
			setIsLoading(false)
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className='p-4'>
			<Card className='max-w-sm mx-auto'>
				<CardHeader>
					<CardTitle>
						{!home ? 'Christmas Celebration' : 'Son Of Man'}
					</CardTitle>
					<CardDescription>
						{home ? '22 Desember 2024' : 'Registrasi Online'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{home ? (
						<>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className='w-[100px]'>
											Ibadah
										</TableHead>
										<TableHead>Jam</TableHead>
										<TableHead className='text-right'>
											Pembicara
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{[
										{
											ibadah: 'KU1',
											jam: '8:30 WITA',
											pembicara: 'Pdt. David Limanto',
										},
										{
											ibadah: 'KU2',
											jam: '12:00 WITA',
											pembicara: 'Pdt. David Limanto',
										},
										{
											ibadah: 'KU3',
											jam: '16:00 WITA',
											pembicara: 'Pdt. David Limanto',
										},
									].map((data) => (
										<TableRow key={data.ibadah}>
											<TableCell className='font-medium'>
												{data.ibadah}
											</TableCell>
											<TableCell>{data.jam}</TableCell>
											<TableCell className='text-right'>
												{data.pembicara}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							<Button
								className='!mt-6 w-full'
								onClick={() => setHome(false)}>
								Daftar Sekarang <ArrowRight />
							</Button>
						</>
					) : result ? (
						<div className='space-y-3'>
							<div className='p-6 bg-neutral-50 rounded-lg border'>
								<QRCode
									className='w-full h-auto col-span-2'
									value={result.link}
								/>
							</div>
							<div>
								<Label className='font-normal'>Nama Lengkap</Label>
								<p className='font-semibold line-clamp-1'>
									{result.nama}
								</p>
							</div>
							<div>
								<Label className='font-normal'>Ibadah</Label>
								<p className='font-semibold'>{result.ibadah}</p>
							</div>
							<div>
								<Label className='font-normal'>Link</Label>
								<div className='flex gap-x-2 mt-1.5'>
									<Input
										value={result.link}
										disabled
									/>
									<Button
										className='aspect-square'
										size='icon'
										variant='outline'
										onClick={() => {
											window.navigator.clipboard.writeText('hi')
											toast('Link berhasil disalin ke clipboard!', {
												description: result.link,
											})
										}}>
										<Copy />
									</Button>
								</div>
							</div>
							<Alert className='bg-neutral-50'>
								<Info className='w-4 h-4' />
								<AlertTitle className='font-semibold'>
									Informasi
								</AlertTitle>
								<AlertDescription>
									Jemaat Wajib untuk melakukan registrasi ulang saat
									ibadah. Mohon hadir 30 menit sebelum jam ibadah dan
									menunjukan kode QR diatas kepada petugas registrasi.
								</AlertDescription>
							</Alert>
							<div className='flex w-full justify-between gap-x-2'>
								<Button
									variant='outline'
									className='w-full'
									onClick={() => {
										toast('Link berhasil disimpan ke Whatsapp!', {
											description: result.link,
										})
										setTimeout(() => {
											window.location.href = `https://api.whatsapp.com/send/?phone=${result.whatsapp}&text=${result.link}`
										}, 1000)
									}}>
									Simpan <Download />
								</Button>
								<Button
									onClick={() => window.location.reload()}
									className='w-full'>
									Daftar Lagi <ArrowRight />
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
											<FormLabel className='font-semibold'>
												<span className=' font-light text-xs font-mono'>
													[1]
												</span>{' '}
												Ibadah *
											</FormLabel>
											<Select onValueChange={field.onChange}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Pilih Ibadah' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{data?.KU1 > 0 && (
														<SelectItem value='KU1'>
															KU 1 - 8.30 WITA{' '}
															<span className='font-semibold'>
																({data?.KU1} orang)
															</span>
														</SelectItem>
													)}
													{data?.KU2 > 0 && (
														<SelectItem value='KU2'>
															KU 2 - 12.00 WITA{' '}
															<span className='font-semibold'>
																({data?.KU2} orang)
															</span>
														</SelectItem>
													)}
													{data?.KU3 > 0 && (
														<SelectItem value='KU3'>
															KU 3 - 16.00 WITA{' '}
															<span className='font-semibold'>
																({data?.KU3} orang)
															</span>
														</SelectItem>
													)}
												</SelectContent>
											</Select>
											{/* <FormMessage /> */}
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='nama'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='font-semibold'>
												<span className=' font-light text-xs font-mono'>
													[2]
												</span>{' '}
												Nama Lengkap *
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											{/* <FormMessage /> */}
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='whatsapp'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='font-semibold'>
												<span className=' font-light text-xs font-mono'>
													[3]
												</span>{' '}
												Nomor Whatsapp *
											</FormLabel>
											<FormControl>
												<Input {...field} placeholder='62'/>
											</FormControl>
											{/* <FormMessage /> */}
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='umur'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='font-semibold'>
												<span className=' font-light text-xs font-mono'>
													[4]
												</span>{' '}
												Usia *
											</FormLabel>
											<FormControl>
												<Input
													type='number'
													{...field}
												/>
											</FormControl>
											{/* <FormMessage /> */}
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='alamat'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='font-semibold'>
												<span className=' font-light text-xs font-mono'>
													[5]
												</span>{' '}
												Alamat Lengkap *
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											{/* <FormMessage /> */}
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='komsel'
									render={({ field }) => (
										<FormItem className='space-y-3'>
											<FormLabel className='font-semibold'>
												<span className=' font-light text-xs font-mono'>
													[6]
												</span>{' '}
												Sudah Berkomsel?
											</FormLabel>
											<FormControl>
												<RadioGroup
													onValueChange={field.onChange}
													defaultValue={field.value}
													className='flex'>
													<FormItem className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem value='sudah' />
														</FormControl>
														<FormLabel className='font-normal'>
															Sudah
														</FormLabel>
													</FormItem>
													<FormItem className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem value='belum' />
														</FormControl>
														<FormLabel className='font-normal'>
															Belum
														</FormLabel>
													</FormItem>
												</RadioGroup>
											</FormControl>
											{/* <FormMessage /> */}
										</FormItem>
									)}
								/>
								{form.getValues('komsel') === 'sudah' && (
									<>
										<FormField
											control={form.control}
											name='GKK'
											render={({ field }) => (
												<FormItem>
													<FormLabel className='font-semibold'>
														<span className=' font-light text-xs font-mono'>
															[7]
														</span>{' '}
														Nama GKK *
													</FormLabel>
													<FormControl>
														<Input
															placeholder='Nama Gembala Komsel'
															{...field}
														/>
													</FormControl>
													{/* <FormMessage /> */}
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='KK'
											render={({ field }) => (
												<FormItem>
													<FormLabel className='font-semibold'>
														<span className=' font-light text-xs font-mono'>
															[8]
														</span>{' '}
														Nama KK *
													</FormLabel>
													<FormControl>
														<Input
															placeholder='Nama Komsel'
															{...field}
														/>
													</FormControl>
													{/* <FormMessage /> */}
												</FormItem>
											)}
										/>
									</>
								)}
								<Button
									type='submit'
									className='w-full !mt-6'
									disabled={isLoading}>
									{!isLoading ? (
										<>
											Kirim Sekarang <ArrowUpRight />
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
					)}
				</CardContent>
			</Card>
		</div>
	)
}
