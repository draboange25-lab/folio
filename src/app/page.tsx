'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
                Créez votre portfolio en ligne
                <span className="text-lime"> sans code</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                Une plateforme simple et élégante pour montrer vos meilleurs projets et
                attirer vos futurs clients ou employeurs.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Link href="/auth/signup" className="btn-primary">
                Créer mon portfolio
              </Link>
              <Link href="/templates" className="btn-secondary">
                Explorer les modèles
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="container py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="card text-center"
          >
            <div className="text-4xl font-bold text-lime mb-2">1000+</div>
            <p className="text-gray-400">Portfolios créés</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <div className="text-4xl font-bold text-lime mb-2">20+</div>
            <p className="text-gray-400">Modèles gratuits</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card text-center"
          >
            <div className="text-4xl font-bold text-lime mb-2">7</div>
            <p className="text-gray-400">Catégories</p>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container py-20">
          <h2 className="font-display text-4xl font-bold mb-12 text-center">
            Pourquoi Folio ?
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Simple et intuitif',
                description: 'Pas de code requis. Glissez, déposez et publiez.',
              },
              {
                title: 'Design moderne',
                description: 'Interface sombre et élégante avec accent lime fluo.',
              },
              {
                title: 'Modèles gratuits',
                description: 'Choisissez parmi nos 20+ modèles ou commencez de zéro.',
              },
              {
                title: 'Responsive',
                description: 'Votre portfolio s'affiche parfaitement sur tous les appareils.',
              },
              {
                title: 'SEO optimisé',
                description: 'Gérez vos meta descriptions et images de partage.',
              },
              {
                title: 'Partage social',
                description: 'Partagez facilement sur LinkedIn, X, Facebook et WhatsApp.',
              },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="card">
                <h3 className="font-semibold text-lg mb-2 text-lime">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="font-display text-4xl font-bold">
              Prêt à créer votre portfolio ?
            </h2>
            <Link href="/auth/signup" className="btn-primary inline-block">
              Commencer gratuitement
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
}
