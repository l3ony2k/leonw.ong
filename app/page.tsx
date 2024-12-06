import { Metadata } from 'next'
import PersonalSite from '@/components/personal-site'

export const metadata: Metadata = {
  title: 'Leon Wong',
  description: 'Welcome to my little corner of the internet! Check out my blog and social platforms.',
  openGraph: {
    title: "Leon's Site",
    description: 'Welcome to my little corner of the internet! Check out my blog and social platforms.',
    url: 'https://leonw.ong/',
    siteName: 'Leon Wong',
    images: [
      {
        url: 'https://leonw.ong/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Leon's Site",
    description: 'Welcome to my little corner of the internet! Check out my blog and social platforms.',
    images: ['https://leonw.ong/og-image.png'],
  },
}

export default function Home() {
  return <PersonalSite />
}

