# Deployment Guide - AI SME Portfolio

## 🚀 Quick Deploy to Vercel (10 minutes)

This guide will walk you through deploying your portfolio site to Vercel, making it live on the internet.

### Prerequisites

- GitHub account (free)
- Vercel account (free) - sign up at [vercel.com](https://vercel.com)

---

## Step 1: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Name it: `ai-sme-portfolio`
   - Make it Public or Private (your choice)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code:**

```bash
cd ai-sme-portfolio

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio build - Week 1 complete"

# Add your GitHub repo as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/ai-sme-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Method A: Import from GitHub (Easiest)

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Project:**
   - Click "Add New Project"
   - Find `ai-sme-portfolio` in your repository list
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset**: Vercel will auto-detect Next.js ✅
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - Click "Deploy"

4. **Wait for deployment** (2-3 minutes)

5. **Your site is live!** 🎉
   - You'll get a URL like: `https://ai-sme-portfolio-abc123.vercel.app`

### Method B: Vercel CLI (For Developers)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to your project
cd ai-sme-portfolio

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? ai-sme-portfolio
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

---

## Step 3: Connect Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain (e.g., `chrystelle-ai.com`)

2. **Update DNS:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Wait for DNS propagation (5-60 minutes)

3. **SSL Certificate:**
   - Vercel automatically generates SSL (HTTPS)
   - No configuration needed ✅

---

## Step 4: Set Up Automatic Deployments

**Already done!** If you used GitHub integration, Vercel automatically:
- Deploys on every `git push` to main branch
- Creates preview deployments for pull requests
- Provides deployment logs and analytics

---

## Environment Variables (If Needed Later)

When you add API keys or secrets:

1. **In Vercel Dashboard:**
   - Project Settings → Environment Variables
   - Add variables (e.g., `OPENAI_API_KEY`)
   - Select environment: Production, Preview, or Development

2. **In Local Development:**
   - Create `.env.local` file
   - Add: `OPENAI_API_KEY=your-key-here`
   - Never commit this file (already in .gitignore)

---

## Continuous Deployment Workflow

```bash
# Make changes to your code
git add .
git commit -m "Add case studies section"
git push origin main

# Vercel automatically:
# ✅ Detects the push
# ✅ Builds your site
# ✅ Deploys to production
# ✅ Sends you a notification

# Your live site updates in ~2 minutes
```

---

## Monitoring & Analytics

### Built-in Vercel Analytics

1. Enable in Dashboard:
   - Project → Analytics
   - Enable "Web Analytics"
   - Free for hobby projects

2. See metrics:
   - Page views
   - Top pages
   - Devices & browsers
   - Geographic data

### Add Google Analytics (Optional)

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)

2. Add tracking code to `app/layout.tsx`:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Troubleshooting

### Build Fails

**Error: `Module not found`**
- Solution: Run `npm install` locally
- Commit `package-lock.json`
- Push again

**Error: `TypeScript errors`**
- Solution: Run `npm run build` locally to test
- Fix errors shown
- Push again

### Site Not Updating

- Check deployment status in Vercel dashboard
- Verify you pushed to correct branch
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

### Custom Domain Not Working

- Verify DNS settings in domain registrar
- Wait 24-48 hours for full propagation
- Check Vercel's domain verification status

---

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Image optimization
- ✅ Automatic code splitting
- ✅ Edge caching
- ✅ Gzip compression

Expected Performance:
- **Lighthouse Score**: 95-100
- **Load Time**: <1 second
- **First Contentful Paint**: <0.5s

---

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project connected
- [ ] Initial deployment successful
- [ ] Live URL works
- [ ] Mobile responsive (test on phone)
- [ ] Navigation works on all pages
- [ ] No console errors
- [ ] Analytics enabled (optional)
- [ ] Custom domain connected (optional)
- [ ] SSL certificate active (HTTPS)

---

## Next Deployment (Week 2+)

As you complete bootcamp weeks:

```bash
# After adding new content
git add .
git commit -m "Week 2: Add prompt library with 50+ prompts"
git push

# Vercel auto-deploys ✅
# Check your live site in 2 minutes
```

---

## Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deploy Guide**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## Cost

**Vercel Free Tier includes:**
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- 100GB bandwidth/month
- Serverless functions

**Perfect for portfolio sites!**

You'll only need to upgrade if you:
- Exceed 100GB bandwidth
- Need team collaboration features
- Want advanced analytics

---

**🎉 Congratulations! Your portfolio is live on the internet!**

Share your URL and start building your AI SME brand.

---

*Last updated: February 2026*  
*Part of the AI SME Accelerator Bootcamp - Week 1*
