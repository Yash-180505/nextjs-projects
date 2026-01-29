import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
