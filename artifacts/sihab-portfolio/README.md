# Sihab Bin Sarwar Portfolio

An editable personal portfolio and research notebook for a computer science student focused on data science, machine learning, and software engineering.

## Features

- Responsive home, about, projects, research, notes, and contact pages
- Individual project, research, and blog routes
- Project category filtering
- Persistent light/dark theme toggle
- Optional image slots for profile, projects, and blog posts
- Centralized profile, education, skills, project, and research data
- Lightweight contact form that can connect to Formspree or Web3Forms
- SEO metadata, `robots.txt`, and `sitemap.xml`
- Static Vite output ready for Vercel or Cloudflare Pages

## Tech stack

React, Vite, JavaScript/JSX, Tailwind CSS, Wouter, and Lucide React. There is no backend, database, authentication, or required API.

## Local development

From the repository root:

```bash
pnpm install
pnpm --filter @workspace/sihab-portfolio run dev
```

Open the local preview shown by the development environment. For a production build:

```bash
pnpm --filter @workspace/sihab-portfolio run build
```

The static output is written to `dist/public`.

## How to customize

### Personal information

Edit `src/data/profile.js`:

- `identity` controls the name, role, bio, email, phone, GitHub, LinkedIn, and resume path
- `identity.photoUrl` controls the circular About-page portrait. Leave it empty to keep the blank placeholder.
- Put local images in `public/images/` and reference them with a path such as `/images/sihab.jpg`.
- `education` controls the education timeline
- `skills` controls the grouped skills shown on the About page

### Projects

Edit `src/data/projects.js`. Each project supports:

- `title`, `slug`, `description`, `category`, `year`
- `tags`, `featured`, `overview`, `challenge`, `approach`, and `outcome`
- `repo`, `live`, and `paper` URLs
- `image` optionally controls the project card visual. It falls back to the built-in grid artwork.

The detail page is generated automatically at `/projects/<slug>`.

### Research and paper explanations

Edit `src/data/research.js`. Add or update the title, status, area, research question, notes, PDF URL, and GitHub URL. Each item automatically gets a route at `/research/<slug>`; that route is the paper explanation page.

### Blog posts

Edit the array in `src/content/blog.js`. Each post supports a slug, title, date, category, reading time, summary, featured state, optional `coverImage`, and body blocks. Each post automatically gets a route at `/blog/<slug>`.

Use a local image like `coverImage: '/images/baseline-notes.jpg'`. The image appears on the notes card and the full post page.

To place an image inside the article, add an image block to the `body` array:

```js
{
  type: 'image',
  src: '/images/experiment-output.png',
  alt: 'Model comparison chart',
  caption: 'A short caption shown below the image.',
}
```

The renderer is intentionally simple and array-driven so the starter content is easy to replace. If you want full Markdown authoring later, replace the `body` array with Markdown files and add a Markdown parser at the content boundary.

### Theme

Use the moon/sun button in the header to switch themes. The preference is saved in the browser, so it remains selected when you return to the site.

### Resume

Replace `public/resume.pdf` with your real PDF. The header, home page, and About page all read the resume path from `src/data/profile.js`.

### Contact form

The form works locally with validation and a success state. To receive messages:

1. Create a free form endpoint with Formspree or Web3Forms.
2. In Vercel, add an environment variable named `VITE_FORM_ENDPOINT`.
3. Set its value to the endpoint URL.
4. Redeploy.

The same variable can be used locally in a `.env.local` file:

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

Do not commit `.env.local` or API keys.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Sign in at [vercel.com](https://vercel.com) and choose **Add New → Project**.
3. Import the GitHub repository.
4. Keep the project directory as the repository root.
5. Set the framework to **Vite** if it is not detected automatically.
6. Set the build command to `pnpm --filter @workspace/sihab-portfolio run build`.
7. Set the output directory to `artifacts/sihab-portfolio/dist/public`.
8. Deploy.

Vercel will provide a free `*.vercel.app` URL and automatically redeploy every time you push a new commit to the connected GitHub branch.

## Deploy to Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git**.
3. Select the repository.
4. Keep the root directory as the repository root.
5. Set the build command to `pnpm --filter @workspace/sihab-portfolio run build`.
6. Set the build output directory to `artifacts/sihab-portfolio/dist/public`.
7. Deploy the site.

Cloudflare Pages gives you a free `*.pages.dev` address. Add `VITE_FORM_ENDPOINT` under the project’s environment variables if you connect a form service.

## GitHub setup

From the repository root:

```bash
git init
git add .
git commit -m "Build personal portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Create the empty repository on GitHub first, and replace the placeholder remote with your own repository URL.

## Custom domain

Start with the free Vercel or Cloudflare domain. Later, open the hosting provider’s **Domains** settings, add your domain, and follow the DNS records it gives you. After DNS propagates, update the placeholder domain in `public/sitemap.xml`.

## Updating the website

1. Edit the relevant file in `src/data/`, `src/content/`, or `public/`.
2. Run the local build.
3. Commit and push:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

Your host will rebuild and publish the change automatically.