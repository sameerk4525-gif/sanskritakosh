#!/bin/bash
# 🕉️ SanskritKosh - Quick Start Script
# Run this to get everything started!

echo "🕉️  SanskritKosh Project - Complete Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📂 Project Location:${NC}"
echo "/home/sameer-khan/Desktop/sanskrit/"
echo ""

echo -e "${GREEN}✅ STEP 1: Verify Backend Environment${NC}"
echo "cd /home/sameer-khan/Desktop/sanskrit/apps/api"
echo ""

echo -e "${GREEN}✅ STEP 2: Start Backend (Terminal 1)${NC}"
echo "cd /home/sameer-khan/Desktop/sanskrit/apps/api"
echo "npm run dev"
echo ""
echo -e "${YELLOW}⏳ Wait for:${NC} 🕉️  SanskritKosh API running on port 3001"
echo ""

echo -e "${GREEN}✅ STEP 3: Start Frontend (Terminal 2)${NC}"
echo "cd /home/sameer-khan/Desktop/sanskrit/apps/web"
echo "npm run dev"
echo ""
echo -e "${YELLOW}⏳ Wait for:${NC} Local:  http://localhost:3000"
echo ""

echo -e "${GREEN}✅ STEP 4: Open Browser${NC}"
echo "URL: http://localhost:3000"
echo ""

echo -e "${BLUE}📊 Pages to Test:${NC}"
echo "  ✅ http://localhost:3000/grammar"
echo "  ✅ http://localhost:3000/dictionary"
echo "  ✅ http://localhost:3000/subhashit"
echo "  ✅ http://localhost:3000/songs"
echo "  ✅ http://localhost:3000/stories"
echo "  ✅ http://localhost:3000/daily"
echo ""

echo -e "${BLUE}🔧 Useful Commands:${NC}"
echo ""
echo "Reset database:"
echo "  cd /home/sameer-khan/Desktop/sanskrit/apps/api"
echo "  rm dev.db"
echo "  npm run seed"
echo ""

echo "View database GUI:"
echo "  cd /home/sameer-khan/Desktop/sanskrit/apps/api"
echo "  npx prisma studio"
echo ""

echo "Check API health:"
echo "  curl http://localhost:3001/api/v1/health"
echo ""

echo -e "${BLUE}📚 Documentation:${NC}"
echo "  • SETUP_COMPLETE.md - Setup guide"
echo "  • COMPLETE_STATUS.md - Project status"
echo "  • PROJECT_STRUCTURE.md - File paths"
echo "  • API_ENDPOINTS_GUIDE.md - API reference"
echo ""

echo -e "${GREEN}🎉 All Set! Start Backend → Frontend → Browser${NC}"
echo ""
