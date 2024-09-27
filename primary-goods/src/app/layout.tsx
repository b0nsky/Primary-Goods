import './globals.css';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Primary Goods',
  description: 'E-commerce platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-7xl mx-auto px-4">
          <Navbar />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </body>
    </html>
  );
}
