import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }

  try {
    const { templateId } = await request.json();

    // Get template
    const template = await prisma.template.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template non trouvé' },
        { status: 404 }
      );
    }

    // Delete existing portfolio if any
    await prisma.portfolio.deleteMany({
      where: { userId: session.user.id },
    });

    // Create new portfolio from template
    const slug = generateSlug(session.user.name || session.user.email) + '-' + Math.random().toString(36).substr(2, 9);
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: session.user.id,
        slug,
        title: template.name,
        description: template.description,
        content: template.content,
        theme: template.content.theme || {
          primaryColor: '#ffffff',
          accentColor: '#D7FF3F',
          font: 'Inter',
          layout: 'modern',
        },
      },
    });

    return NextResponse.json(
      { success: true, data: portfolio },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create portfolio from template error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du portfolio' },
      { status: 500 }
    );
  }
}
