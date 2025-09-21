#!/bin/bash

# Freelancer Marketplace Deployment Script
set -e

echo "🚀 Starting deployment process..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Set environment variables
export MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-"rootpassword"}
export MYSQL_USER=${MYSQL_USER:-"freelancer_user"}
export MYSQL_PASSWORD=${MYSQL_PASSWORD:-"freelancer_password"}
export NEXTAUTH_SECRET=${NEXTAUTH_SECRET:-"your-secret-key-here"}
export NEXTAUTH_URL=${NEXTAUTH_URL:-"http://localhost:3000"}

# Create necessary directories
mkdir -p uploads
mkdir -p ssl

# Build and start services
echo "📦 Building Docker images..."
docker-compose build

echo "🔄 Starting services..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running successfully!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   - Main App: http://localhost:3000"
    echo "   - Database Admin: http://localhost:8080 (dev only)"
    echo ""
    echo "📊 Service Status:"
    docker-compose ps
else
    echo "❌ Some services failed to start. Check logs:"
    docker-compose logs
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo "📝 Next steps:"
echo "   1. Configure your environment variables in .env file"
echo "   2. Set up SSL certificates for production"
echo "   3. Configure your domain and DNS settings"
echo "   4. Set up monitoring and backups"
