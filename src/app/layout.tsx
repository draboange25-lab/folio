import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Folio - Créez votre portfolio en ligne',
  description: 'Plateforme de création de portfolios professionnels sans code. Design moderne, templates gratuits.',
  keywords: ['portfolio', 'freelance', 'designer', 'développeur', 'créateur'],
  openGraph: {
    title: 'Folio - Créez votre portfolio en ligne',
    description: 'Plateforme de création de portfolios professionnels sans code.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-dark text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
