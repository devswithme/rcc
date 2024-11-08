import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const roboto = Manrope({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '700'],
})

export const metadata: Metadata = {
	title: 'Registrasi Online - Son Of Man',
	description: 'Christmas Celebration 2024',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.className} antialiased bg-red-900`}>
				{children}
				<Toaster />
			</body>
		</html>
	)
}
