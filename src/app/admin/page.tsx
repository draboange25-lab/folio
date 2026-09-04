'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // TODO: Check if user is admin
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime"></div>
          <p className="text-gray-400 mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h1 className="font-display text-4xl font-bold">Administration</h1>
              <p className="text-gray-400">Gérez les templates et les utilisateurs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Templates',
                  description: 'Créer, modifier et publier des templates',
                  href: '/admin/templates',
                  icon: '📋',
                },
                {
                  title: 'Utilisateurs',
                  description: 'Gérer les utilisateurs et leurs portfolios',
                  href: '/admin/users',
                  icon: '👥',
                },
                {
                  title: 'Statistiques',
                  description: 'Voir les statistiques globales de la plateforme',
                  href: '/admin/stats',
                  icon: '📊',
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card group hover:border-lime"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h2 className="text-xl font-bold group-hover:text-lime transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">{item.description}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
