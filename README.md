# CIS Data Science Department Website

A modern website for the Department of Data Science at Chavan Institute of Science, featuring a red theme, interactive animations, and responsive design.

## Features

- Responsive design with mobile-first approach
- Modern UI with animations using Framer Motion
- Light and dark mode support
- Department highlights with infinite slider
- Interactive sections showcasing department activities and resources

## Deployment to Vercel

To deploy this website to Vercel:

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." > "Project"
4. Select the "Data_Science_YCIS" repository
5. Vercel will automatically detect Next.js settings
6. Review the configuration (Framework preset should be Next.js)
7. Click "Deploy"

The site will be automatically deployed and available at a Vercel-provided URL. You can later connect a custom domain if needed.

### Post-Deployment Steps

After successful deployment:
1. Your site will be assigned a URL (typically `data-science-ycis.vercel.app`)
2. You can configure custom domains in the Vercel project settings
3. Set up environment variables if needed
4. Enable automatic deployments to keep the site updated whenever you push changes to GitHub

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Technologies Used

- Next.js 15
- React 18
- Tailwind CSS
- Framer Motion
- Shadcn UI Components 