'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Portfolio } from '@/types';
import toast from 'react-hot-toast';

export default function PublicPortfolioPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/public/portfolio/${slug}`);
        const data = await response.json();
        if (data.success) {
          setPortfolio(data.data);
        } else {
          toast.error('Portfolio non trouvé');
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        toast.error('Erreur lors du chargement du portfolio');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPortfolio();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime"></div>
          <p className="text-gray-400 mt-4">Chargement du portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-lime mb-2">404</h1>
          <p className="text-gray-400">Portfolio non trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header with Share Buttons */}
      <header className="sticky top-0 z-40 border-b border-dark-tertiary bg-dark/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-4">
          <h1 className="font-display text-2xl font-bold text-lime">{portfolio.user?.name}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Lien copié !');
              }}
              className="btn-ghost text-sm"
              title="Copier le lien"
            >
              🔗
            </button>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
              title="Partager sur LinkedIn"
            >
              in
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href
              )}&text=Découvrez mon portfolio`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
              title="Partager sur X"
            >
              🐦
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
              title="Partager sur Facebook"
            >
              f
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Regarde mon portfolio: ${window.location.href}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
              title="Partager sur WhatsApp"
            >
              📱
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-20 space-y-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-center"
        >
          <div>
            <h1 className="font-display text-6xl font-bold mb-4">
              {portfolio.title}
            </h1>
            <p className="text-xl text-gray-300">{portfolio.description}</p>
          </div>
          <div className="flex justify-center gap-4">
            <button className="btn-primary">Télécharger CV</button>
            <button className="btn-secondary">Me contacter</button>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="font-display text-4xl font-bold mb-4 text-lime">
              À propos de moi
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Passionné par mon domaine, j'améliore constamment mes compétences et j'améliore
              mes projets. Avec une expérience de plusieurs années, je suis en mesure de
              livrer des résultats de qualité.
            </p>
          </div>
          <div className="bg-dark-tertiary rounded-lg aspect-square flex items-center justify-center">
            <p className="text-gray-500">Image à venir</p>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h2 className="font-display text-4xl font-bold text-lime">Compétences</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Python', 'PostgreSQL', 'Git'].map(
              (skill) => (
                <div key={skill} className="card text-center">
                  <p className="font-semibold text-lime">{skill}</p>
                </div>
              )
            )}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h2 className="font-display text-4xl font-bold text-lime">Projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card space-y-4">
                <div className="bg-dark-tertiary rounded-lg aspect-video flex items-center justify-center">
                  <p className="text-gray-500">Image du projet</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-lime">Nom du projet</h3>
                  <p className="text-gray-300 mb-3">Description courte du projet et de ses objectifs.</p>
                  <div className="flex gap-2">
                    <a href="#" className="text-sm text-lime hover:underline">
                      Voir le projet →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="card text-center space-y-6"
        >
          <h2 className="font-display text-4xl font-bold text-lime">Me contacter</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Intéressé par une collaboration ? N'hésitez pas à m'envoyer un message.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:contact@example.com" className="btn-primary">
              📧 Email
            </a>
            <a href="https://linkedin.com" target="_blank" className="btn-secondary">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" className="btn-secondary">
              GitHub
            </a>
            <a href="https://twitter.com" target="_blank" className="btn-secondary">
              X
            </a>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-tertiary py-8 text-center text-gray-400">
        <p>© 2024 {portfolio.user?.name}. Fait avec Folio.</p>
      </footer>
    </div>
  );
}
