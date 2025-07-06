import { ClerkProvider } from '@clerk/nextjs';
import Footer from './Footer';
import Navbar from './Navbar';
import '../styles/global.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
