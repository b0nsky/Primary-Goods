import './globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Primary Goods',
  description: 'E-commerce platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </body>
    </html>
  )
}
