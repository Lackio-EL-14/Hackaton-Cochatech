import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Chatbot } from './Chatbot';

export function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
