#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Folio - Setup Script${NC}"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}📝 Creating .env.local from .env.example...${NC}"
    cp .env.example .env.local
    echo -e "${GREEN}✓ .env.local created${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env.local with your credentials${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencies installed${NC}"

echo -e "${YELLOW}🗄️  Setting up database...${NC}"
npm run db:push

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to setup database${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Database setup completed${NC}"

echo -e "${YELLOW}🌱 Seeding database with initial templates...${NC}"
npm run db:seed

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to seed database${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Database seeded${NC}"

echo ""
echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Review and edit .env.local with your credentials"
echo -e "  2. Run ${GREEN}npm run dev${NC} to start development server"
echo -e "  3. Open http://localhost:3000 in your browser"
echo ""
echo -e "${YELLOW}Documentation:${NC}"
echo -e "  - GitHub: https://github.com/draboange25-lab/folio"
echo -e "  - Docs: See README.md for more information"
