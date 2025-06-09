# Personal Website

My personal portfolio website built with Next.js, featuring an interactive folder-based navigation system and modern design.

## Features

- Interactive folder interface
- Responsive design
- Contact form with email integration
- Modern animations using Framer Motion
- Clean, minimalist aesthetic

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Node.js
- Nodemailer

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/personal-website.git
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your email configuration:
```
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-app-specific-password
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This website is configured for GitHub Pages deployment. The deployment process is automated using GitHub Actions.

To deploy:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy to the gh-pages branch
3. Your site will be available at: https://YOUR_USERNAME.github.io/personal-website

## License

MIT License - feel free to use this code for your own portfolio! 