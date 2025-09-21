# Freelancer Marketplace

A comprehensive full-stack freelancer marketplace platform built with Next.js, MySQL, and Docker. Connect clients with skilled professionals for project-based work with secure payments, project tracking, and reviews.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login/registration with JWT tokens
- **User Profiles** - Detailed freelancer portfolios and client profiles
- **Project Management** - Post projects, manage proposals, track progress
- **Bidding System** - Freelancers can bid on projects with custom proposals
- **Secure Payments** - Stripe integration with escrow system
- **Communication** - Real-time messaging between clients and freelancers
- **Review System** - Comprehensive rating and review system
- **File Management** - Upload and manage project files

### Advanced Features
- **Role-based Access Control** - Client and freelancer specific dashboards
- **Search & Filtering** - Advanced project and freelancer search
- **Milestone Payments** - Break payments into milestones
- **Real-time Notifications** - Stay updated on project activities
- **Responsive Design** - Works perfectly on all devices
- **SEO Optimized** - Built with Next.js for optimal performance

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **SWR** - Data fetching and caching

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MySQL 8.0** - Relational database
- **Redis** - Caching and session storage
- **JWT** - Authentication tokens
- **Stripe** - Payment processing

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancing
- **GitHub Actions** - CI/CD pipeline
- **AWS EC2** - Cloud deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose
- Git

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/freelancer-marketplace.git
   cd freelancer-marketplace
   \`\`\`

2. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

3. **Start development services**
   \`\`\`bash
   npm run docker:dev
   \`\`\`

4. **Install dependencies and start the app**
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

5. **Access the application**
   - Main App: http://localhost:3000
   - Database Admin: http://localhost:8080

### Production Deployment

#### Using Docker Compose

1. **Build and start production services**
   \`\`\`bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   \`\`\`

2. **Access the application**
   - Main App: http://localhost
   - HTTPS: https://localhost (after SSL setup)

#### AWS EC2 Deployment

1. **Launch an EC2 instance** (Ubuntu 20.04 LTS recommended)

2. **Run the AWS setup script**
   \`\`\`bash
   wget https://raw.githubusercontent.com/your-username/freelancer-marketplace/main/scripts/aws-setup.sh
   chmod +x aws-setup.sh
   ./aws-setup.sh
   \`\`\`

3. **Configure your domain and SSL**
   \`\`\`bash
   sudo certbot certonly --standalone -d your-domain.com
   \`\`\`

4. **Start the services**
   \`\`\`bash
   sudo systemctl start freelancer-marketplace
   \`\`\`

## 📁 Project Structure

\`\`\`
freelancer-marketplace/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── projects/          # Project pages
│   ├── messages/          # Messaging pages
│   └── reviews/           # Review pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── projects/         # Project components
│   └── payments/         # Payment components
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── database.ts       # Database connection
│   └── types.ts          # TypeScript types
├── scripts/              # Database and deployment scripts
├── aws/                  # AWS deployment configurations
├── docker-compose.yml    # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
├── Dockerfile            # Application container
├── nginx.conf            # Nginx configuration
└── .github/workflows/    # CI/CD pipelines
\`\`\`

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

- **Database**: MySQL connection details
- **Authentication**: JWT secrets and session configuration
- **Payments**: Stripe API keys and webhook secrets
- **Email**: SMTP configuration for notifications
- **File Storage**: Upload directory and size limits

### Database Setup

The application automatically creates the database schema on first run. Manual setup:

\`\`\`bash
# Run database migrations
docker exec -it freelancer-mysql mysql -u root -p < scripts/01-create-database-schema.sql

# Seed initial data
docker exec -it freelancer-mysql mysql -u root -p < scripts/02-seed-initial-data.sql
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check

# Linting
npm run lint
\`\`\`

## 📊 Monitoring

### Health Checks
- Application: http://localhost:3000/api/health
- Database: Built into Docker Compose
- Redis: Built into Docker Compose

### Logs
\`\`\`bash
# View application logs
docker-compose logs app

# View all service logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f
\`\`\`

### Backups
Automated daily backups are configured for production:
- Database backups: `/home/ubuntu/backups/`
- File uploads: Included in backup routine
- Retention: 7 days

## 🔒 Security

- **Authentication**: JWT tokens with secure httpOnly cookies
- **Authorization**: Role-based access control
- **Data Validation**: Zod schema validation
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Content Security Policy headers
- **Rate Limiting**: API endpoint protection
- **HTTPS**: SSL/TLS encryption in production

## 🚀 Performance

- **Caching**: Redis for session and data caching
- **CDN**: Static asset optimization
- **Database**: Indexed queries and connection pooling
- **Images**: Next.js Image optimization
- **Bundle**: Code splitting and tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🗺 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Video calling integration
- [ ] AI-powered project matching
- [ ] Blockchain-based payments
- [ ] Advanced project templates

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
