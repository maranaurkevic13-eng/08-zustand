import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "404 - Page not found | NoteHub",
  description: "This page does not exist",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "Requested page could not be found",
    url: "https://notehub.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404",
      },
    ],
  },
}

export default function NotFoundPage() {
    return (
        <main>
           <h1>404 - Page not found</h1>
           <p>Sorry, the page you are looking for does not exist.</p>
        </main> 
    )
}