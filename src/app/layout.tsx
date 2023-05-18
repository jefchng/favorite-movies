import { Providers } from '@/app/providers'

// These styles apply to every route in the application
import './globals.css'

export const metadata = {
  title: 'Movies App',
  description: 'View and save popular movies.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className=" bg-teal-500 sticky top-0 z-10">
          <div className="text-white font-semibold text-xl p-4">
            <a href="/">Movies</a>
          </div>
          <div className="text- p-4  bg-teal-200">
            <a href="/favorites">My Favorites</a>
          </div>
        </nav>
        <div>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
