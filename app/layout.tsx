import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Metadata } from 'next';
import { Roboto } from "next/font/google";
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "NoteHub | Manage your notes",
  description: "NoteHub is a simple and efficient application for managing personal notes.",
  openGraph: {
    title: "NoteHub | Manage your notes",
    description: "NoteHub helps you organize and access your notes easily.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],
  },
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal} 
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}


