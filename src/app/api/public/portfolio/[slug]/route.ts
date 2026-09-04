import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { slug: params.slug },
      include: { user: true },
    });

    if (!portfolio || !portfolio.isPublished) {
      return NextResponse.json(
        { error: 'Portfolio non trouvé' },
        { status: 404 }
      );
    }

    // Increment views
    await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ success: true, data: portfolio });
  } catch (error) {
    console.error('Get public portfolio error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du portfolio' },
      { status: 500 }
    );
  }
}
