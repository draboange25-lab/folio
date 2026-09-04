import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 12;
    const skip = (page - 1) * limit;

    const where: any = {
      isPublished: true,
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const templates = await prisma.template.findMany({
      where,
      skip,
      take: limit,
      orderBy: { order: 'asc' },
    });

    const total = await prisma.template.count({ where });

    return NextResponse.json({
      success: true,
      data: templates,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get templates error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des templates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }

  // TODO: Check if user is admin

  try {
    const body = await request.json();
    const { name, slug, description, category, thumbnail, preview, content } = body;

    const template = await prisma.template.create({
      data: {
        name,
        slug,
        description,
        category,
        thumbnail,
        preview,
        content,
        isPublished: false,
      },
    });

    return NextResponse.json(
      { success: true, data: template },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create template error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du template' },
      { status: 500 }
    );
  }
}
