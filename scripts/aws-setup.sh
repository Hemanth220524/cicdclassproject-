#!/bin/bash

# AWS EC2 Setup Script for Freelancer Marketplace
set -e

echo "🚀 Setting up Freelancer Marketplace on AWS EC2..."

# Update system
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Docker
echo "📦 Installing Docker..."
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Install Docker Compose
echo "📦 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER

# Install Git
sudo apt-get install -y git

# Clone repository
echo "📥 Cloning repository..."
cd /home/ubuntu
git clone https://github.com/your-username/freelancer-marketplace.git
cd freelancer-marketplace

# Set up environment variables
echo "⚙️ Setting up environment variables..."
cat > .env << EOF
MYSQL_ROOT_PASSWORD=your-secure-root-password
MYSQL_USER=freelancer_user
MYSQL_PASSWORD=your-secure-password
NEXTAUTH_SECRET=your-very-secure-secret-key
NEXTAUTH_URL=https://your-domain.com
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
EOF

# Set up SSL with Let's Encrypt
echo "🔒 Setting up SSL certificates..."
sudo apt-get install -y certbot
# sudo certbot certonly --standalone -d your-domain.com

# Create uploads directory
mkdir -p uploads
sudo chown -R $USER:$USER uploads

# Set up log rotation
sudo tee /etc/logrotate.d/freelancer-marketplace << EOF
/home/ubuntu/freelancer-marketplace/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 ubuntu ubuntu
}
EOF

# Set up systemd service for auto-start
sudo tee /etc/systemd/system/freelancer-marketplace.service << EOF
[Unit]
Description=Freelancer Marketplace
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/freelancer-marketplace
ExecStart=/usr/local/bin/docker-compose -f aws/docker-compose.aws.yml up -d
ExecStop=/usr/local/bin/docker-compose -f aws/docker-compose.aws.yml down
TimeoutStartSec=0
User=ubuntu

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable freelancer-marketplace.service

# Set up monitoring
echo "📊 Setting up basic monitoring..."
sudo apt-get install -y htop iotop

# Set up firewall
echo "🔥 Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Set up backup script
cat > /home/ubuntu/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/backups"
mkdir -p $BACKUP_DIR

# Backup database
docker exec freelancer-mysql-prod mysqldump -u root -p$MYSQL_ROOT_PASSWORD freelancer_marketplace > $BACKUP_DIR/db_backup_$DATE.sql

# Backup uploads
tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz /home/ubuntu/freelancer-marketplace/uploads

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /home/ubuntu/backup.sh

# Set up cron job for daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /home/ubuntu/backup.sh >> /home/ubuntu/backup.log 2>&1") | crontab -

echo ""
echo "✅ AWS EC2 setup completed!"
echo ""
echo "📝 Next steps:"
echo "   1. Update the .env file with your actual credentials"
echo "   2. Configure your domain DNS to point to this server"
echo "   3. Run: sudo systemctl start freelancer-marketplace"
echo "   4. Set up SSL certificates with: sudo certbot certonly --standalone -d your-domain.com"
echo "   5. Update nginx configuration with your domain"
echo ""
echo "🔧 Useful commands:"
echo "   - Start services: sudo systemctl start freelancer-marketplace"
echo "   - Stop services: sudo systemctl stop freelancer-marketplace"
echo "   - View logs: docker-compose -f aws/docker-compose.aws.yml logs"
echo "   - Backup manually: /home/ubuntu/backup.sh"
