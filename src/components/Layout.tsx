import Footer from './Footer';
import NavbarWrapper from './NavbarWrapper';
import '../styles/global.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-gray-100 flex flex-col">
      <NavbarWrapper />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
