import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }

  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: session.user.id },
      include: { sections: true },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: portfolio });
  } catch (error) {
    console.error('Get portfolio error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du portfolio' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const portfolio = await prisma.portfolio.update({
      where: { userId: session.user.id },
      data: body,
      include: { sections: true },
    });

    return NextResponse.json({ success: true, data: portfolio });
  } catch (error) {
    console.error('Update portfolio error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du portfolio' },
      { status: 500 }
    );
  }
}
