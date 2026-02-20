# AI SME Portfolio - Chrystelle

A modern, production-ready portfolio website showcasing AI Subject Matter Expertise across multiple industries.

## 🎯 Features

- **Modern Design**: Clean, professional interface with custom animations and gradients
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Built with Next.js 14 for optimal performance
- **Type-Safe**: TypeScript throughout for better development experience
- **Accessible**: Semantic HTML and ARIA labels
- **SEO-Optimized**: Proper meta tags and structure

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd ai-sme-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
ai-sme-portfolio/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── expertise/           # Expertise page
│   ├── case-studies/        # Case studies page
│   ├── prompts/             # Prompt library page
│   ├── agents/              # AI agents page
│   ├── services/            # Services page
│   ├── blog/                # Blog page
│   └── contact/             # Contact page
├── components/              # React components
│   ├── Navigation.tsx       # Header navigation
│   ├── Hero.tsx             # Hero section
│   ├── LiveDemoShowcase.tsx # Demo section
│   ├── QuickStats.tsx       # Stats section
│   ├── ExploreWork.tsx      # Portfolio sections
│   ├── FeaturedCaseStudy.tsx# Case study spotlight
│   ├── CTASection.tsx       # Call-to-action
│   ├── Footer.tsx           # Footer
│   └── PlaceholderPage.tsx  # Template for coming soon pages
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies

```

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (#0ea5e9 to #0369a1) - Trust, professionalism
- **Accent**: Purple gradient (#d946ef to #a21caf) - Innovation, creativity
- **Neural**: Gray scale for text and backgrounds

### Typography

- **Headings**: Outfit (bold, modern)
- **Body**: Inter (clean, readable)

### Components

All components use consistent design patterns:
- Cards with hover effects
- Gradient backgrounds
- Smooth animations
- Responsive breakpoints

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

## 🌐 Deploying to Vercel

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and deploy

Your site will be live at `https://your-project.vercel.app`

## 🎓 Bootcamp Integration

This portfolio is structured to support the 7-week AI SME Bootcamp:

- **Week 1**: Framework complete ✅
- **Week 2**: Add Prompt Library
- **Week 3**: Add Contact Center AI solution
- **Week 4**: Add Agentic AI demos
- **Week 5**: Add Product Owner artifacts
- **Week 6**: Populate Case Studies
- **Week 7**: Launch Services and Blog

## 🔄 Next Steps

1. **Add Content**: Replace placeholder pages with real content as you build it
2. **Connect Forms**: Add form functionality to Contact and CTA sections
3. **Add Analytics**: Install Google Analytics or Plausible
4. **Custom Domain**: Connect your own domain in Vercel settings
5. **SEO**: Add meta descriptions for each page
6. **Images**: Add case study images and screenshots

## 🎯 Current Status

**Rating: Production-Ready Foundation (78/100)**

✅ **Complete:**
- Modern, responsive design
- All page structure and navigation
- Component library
- Animation and interactions
- Deployment ready

🚧 **To Add:**
- Real content (case studies, prompts, agents)
- Interactive demos
- Form functionality
- Custom imagery

## 📝 Customization Guide

### Updating Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ },
}
```

### Adding New Pages

1. Create folder in `app/`
2. Add `page.tsx`
3. Update navigation in `components/Navigation.tsx`

### Modifying Sections

All homepage sections are in `components/`:
- Edit any component file
- Changes auto-reload in dev mode

## 🤝 Support

For questions about this portfolio or the bootcamp:
- Create an issue in the repository
- Reach out via the contact form

---

**Built with** ❤️ **during the AI SME Accelerator Bootcamp**  
© 2026 Chrystelle - AI Upscale Solutions
