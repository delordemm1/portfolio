# 🚀 Dynamic Personal Portfolio & Advanced Blog Platform

A modern, high-performance personal portfolio website built with SvelteKit, featuring a sophisticated block-based blog editor and secure admin panel. This project showcases cutting-edge web technologies and best practices for creating professional portfolio sites.

## ✨ Features

### 🌐 Public Website
- **Modern Portfolio**: Responsive design showcasing projects and skills
- **Dynamic Blog**: Block-based content system with rich media support
- **Interactive Resume**: Database-driven resume with PDF download functionality
- **Contact Forms**: Professional contact and client feedback forms
- **SEO Optimized**: Dynamic meta tags, structured data, and automatic sitemap generation

### 🔐 Admin Panel
- **Secure Authentication**: Lucia Auth with session management
- **Project Management**: Full CRUD operations with draft/published status
- **Advanced Blog Editor**: Block-based content system supporting:
  - Rich text blocks
  - Image uploads with optimization
  - YouTube video embeds
  - Styled link previews
- **AI-Powered Summaries**: Cloudflare Worker AI integration for automatic content summaries
- **Resume Builder**: Structured resume management with PDF generation
- **Request Management**: View and manage contact form submissions

### 🛡️ Security & Performance
- **CAPTCHA Protection**: Cloudflare Turnstile integration on public forms
- **Edge Performance**: Optimized for Cloudflare Pages & Workers
- **Image Optimization**: Automatic compression and R2 storage
- **Type Safety**: Full TypeScript implementation with Drizzle ORM

## 🛠️ Technology Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with Svelte 5 (Runes)
- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager
- **Database**: [Turso](https://turso.tech/) (Distributed SQLite)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
- **Authentication**: [Lucia Auth](https://lucia-auth.com/)
- **Storage**: Cloudflare R2 for images and assets
- **AI**: Cloudflare Worker AI for content generation
- **Security**: Cloudflare Turnstile for CAPTCHA protection
- **Deployment**: Cloudflare Pages & Workers
- **Styling**: Tailwind CSS with custom design system

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.17 or later)
- [Node.js](https://nodejs.org/) (v18 or later) - for compatibility
- Cloudflare account for deployment and services

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies with Bun**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following variables in `.env`:
   ```env
   # Database (Turso)
   DATABASE_URL="your-turso-database-url"
   DATABASE_AUTH_TOKEN="your-turso-auth-token"
   
   # Cloudflare R2 Storage
   R2_ACCOUNT_ID="your-cloudflare-account-id"
   R2_ACCESS_KEY_ID="your-r2-access-key"
   R2_SECRET_ACCESS_KEY="your-r2-secret-key"
   R2_BUCKET_NAME="your-r2-bucket-name"
   
   # Cloudflare AI (Optional)
   CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
   CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
   CLOUDFLARE_AI_MODEL="@cf/meta/llama-2-7b-chat-int8"
   
   # Cloudflare Turnstile (Optional)
   TURNSTILE_SITE_KEY="your-turnstile-site-key"
   TURNSTILE_SECRET_KEY="your-turnstile-secret-key"
   ```

4. **Set up the database**
   ```bash
   bun run db:push
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── lib/
│   └── server/
│       ├── auth.ts          # Authentication logic
│       ├── db/              # Database configuration and schema
│       └── r2.ts            # Cloudflare R2 integration
├── routes/
│   ├── admin/               # Admin panel routes
│   │   ├── blog/            # Blog management
│   │   ├── projects/        # Project management
│   │   ├── resume/          # Resume management
│   │   └── requests/        # Form submissions
│   ├── api/                 # API endpoints
│   ├── blog/                # Public blog pages
│   ├── projects/            # Public project pages
│   └── [other-pages]/       # Other public pages
└── app.html                 # HTML template
```

## 🔧 Development Commands

```bash
# Development
bun run dev              # Start development server
bun run build            # Build for production
bun run preview          # Preview production build

# Database
bun run db:push          # Push schema changes to database
bun run db:migrate       # Run database migrations
bun run db:studio        # Open Drizzle Studio

# Code Quality
bun run check            # Run Svelte check
bun run check:watch      # Run Svelte check in watch mode
```

## 🎨 Customization

### Design System
The project uses a custom design system built on Tailwind CSS:
- **Colors**: Blue primary, with gray neutrals and semantic colors
- **Typography**: Responsive scale with proper line heights
- **Spacing**: 8px grid system for consistent layouts
- **Components**: Reusable UI patterns with hover states and animations

### Content Management
1. **Admin Access**: Visit `/admin/login` to access the admin panel
2. **Projects**: Add projects with images, descriptions, and links
3. **Blog Posts**: Create rich content using the block-based editor
4. **Resume**: Build your resume using structured data fields

## 🚀 Deployment

### Cloudflare Pages

1. **Connect your repository** to Cloudflare Pages
2. **Set build settings**:
   - Build command: `bun run build`
   - Build output directory: `build`
   - Node.js version: `18` or later

3. **Configure environment variables** in Cloudflare Pages dashboard
4. **Deploy**: Push to your main branch to trigger deployment

### Environment Setup

Ensure all required environment variables are configured in your Cloudflare Pages settings:
- Database credentials (Turso)
- R2 storage configuration
- AI and Turnstile keys (if using these features)

## 🔐 Security Features

- **Authentication**: Secure session-based auth with Lucia
- **CAPTCHA**: Cloudflare Turnstile protection on public forms
- **Input Validation**: Server-side validation for all form submissions
- **File Upload Security**: Type and size validation for image uploads
- **SQL Injection Protection**: Parameterized queries with Drizzle ORM

## 🤖 AI Integration

The platform includes optional AI-powered features:
- **Content Summaries**: Automatic blog post summary generation
- **SEO Optimization**: AI-generated meta descriptions
- **Content Suggestions**: Smart content recommendations

To enable AI features, configure your Cloudflare AI credentials in the environment variables.

## 📊 SEO Features

- **Dynamic Meta Tags**: Automatic title and description generation
- **Structured Data**: JSON-LD schemas for rich search results
- **Sitemap**: Automatically generated XML sitemap at `/sitemap.xml`
- **Performance**: Optimized for Core Web Vitals
- **Social Sharing**: Open Graph and Twitter Card support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SvelteKit](https://kit.svelte.dev/) for the amazing framework
- [Bun](https://bun.sh/) for the fast runtime and package manager
- [Cloudflare](https://cloudflare.com/) for edge computing services
- [Turso](https://turso.tech/) for distributed SQLite
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the [documentation](docs/)
2. Search existing [issues](issues/)
3. Create a new [issue](issues/new) if needed

---

**Built with ❤️ using Bun and SvelteKit**