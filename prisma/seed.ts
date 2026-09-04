import { prisma } from '@/lib/prisma';

const TEMPLATES = [
  {
    name: 'Minimaliste Designer',
    slug: 'minimaliste-designer',
    description: 'Un template épuré pour les designers avec focus sur le portfolio visuel',
    category: 'Designer',
    thumbnail: 'https://via.placeholder.com/400x300?text=Minimaliste+Designer',
    preview: 'https://via.placeholder.com/800x600?text=Preview',
    isPublished: true,
  },
  {
    name: 'Développeur Tech',
    slug: 'developpeur-tech',
    description: 'Template moderne pour développeurs avec projets et compétences techniques',
    category: 'Développeur',
    thumbnail: 'https://via.placeholder.com/400x300?text=Developpeur+Tech',
    preview: 'https://via.placeholder.com/800x600?text=Preview',
    isPublished: true,
  },
  {
    name: 'Photographe Pro',
    slug: 'photographe-pro',
    description: 'Galerie professionnelle pour photographes avec mise en avant des images',
    category: 'Photographe',
    thumbnail: 'https://via.placeholder.com/400x300?text=Photographe+Pro',
    preview: 'https://via.placeholder.com/800x600?text=Preview',
    isPublished: true,
  },
  {
    name: 'Entrepreneur',
    slug: 'entrepreneur',
    description: 'Template pour entrepreneurs avec section services et témoignages',
    category: 'Entrepreneur',
    thumbnail: 'https://via.placeholder.com/400x300?text=Entrepreneur',
    preview: 'https://via.placeholder.com/800x600?text=Preview',
    isPublished: true,
  },
  {
    name: 'Étudiant Créatif',
    slug: 'etudiant-creatif',
    description: 'Portfolio pour étudiants avec projets académiques et compétences',
    category: 'Étudiant',
    thumbnail: 'https://via.placeholder.com/400x300?text=Etudiant+Creatif',
    preview: 'https://via.placeholder.com/800x600?text=Preview',
    isPublished: true,
  },
  {
    name: 'Artiste Créatif',
    slug: 'artiste-creatif',
    description: 'Portfolio artistique avec galerie et présentation créative',
    category: 'Créatif',
    thumbnail: 'https://via.placeholder.com/400x300?text=Artiste+Creatif',
    preview: 'https://via.placeholder.com/800x600?text=Preview',
    isPublished: true,
  },
  {
    name: 'Agence Digitale',
    slug: 'agence-digitale',
    description: 'Portfolio pour agences avec portfolio clients et services',
    category: 'Agence',
    thumbnail: 'https://via.placeholder.com/400x300?text=Agence+Digitale',
    preview: 'https://via.placeholder.com/800x600?text=Preview',
    isPublished: true,
  },
];

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Delete existing templates
    await prisma.template.deleteMany();
    console.log('✓ Cleared existing templates');

    // Create templates
    for (let i = 0; i < TEMPLATES.length; i++) {
      await prisma.template.create({
        data: {
          ...TEMPLATES[i],
          order: i,
          content: {
            sections: [],
          },
        },
      });
    }
    console.log(`✓ Created ${TEMPLATES.length} templates`);

    // Create/update global statistics
    await prisma.statisticsGlobal.deleteMany();
    await prisma.statisticsGlobal.create({
      data: {
        totalPortfolios: 0,
        totalTemplates: TEMPLATES.length,
        totalUsers: 0,
      },
    });
    console.log('✓ Updated global statistics');

    console.log('✅ Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Error during seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
