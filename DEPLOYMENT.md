# Deployment Guide for Nivaas

This guide will help you deploy the Nivaas application to production.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud-based like MongoDB Atlas)
- Cloudinary account for image storage
- Environment variables configured

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Node Environment
NODE_ENV=production

# Server Configuration
PORT=8080

# Database Configuration
MONGODB_URI=mongodb://your-production-database-uri

# Session Secret (IMPORTANT: Generate a strong random secret!)
# Generate one using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SESSION_SECRET=your-generated-secret-key-here

# Cloudinary Configuration
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_SECRET_KEY=your-cloudinary-secret-key
CLOUDINARY_FOLDER=nivaas_PROD
```

## Security Checklist

### ✅ Before Deploying:

1. **Session Secret**: Generate a strong random secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Database URI**: Use a secure MongoDB connection string (MongoDB Atlas recommended for production)

3. **Environment Variables**: Ensure all sensitive data is in environment variables, not hardcoded

4. **HTTPS**: Deploy behind a reverse proxy (nginx/Apache) with SSL certificate

5. **Firewall**: Configure firewall rules to only allow necessary ports

6. **Error Handling**: Review error messages to ensure they don't leak sensitive information

## Deployment Steps

### 1. Install Dependencies

```bash
npm install --production
```

### 2. Set Environment Variables

Set all required environment variables in your hosting platform or `.env` file.

### 3. Initialize Database (First Time Only)

```bash
npm run init-db
```

This will create an admin user and seed sample data.

### 4. Start the Application

```bash
npm start
```

### 5. Using Process Manager (Recommended)

For production, use a process manager like PM2:

```bash
npm install -g pm2
pm2 start app.js --name nivaas
pm2 save
pm2 startup
```

## Production Considerations

### Database

- Use MongoDB Atlas or a managed MongoDB service
- Enable authentication and use strong credentials
- Configure backups
- Set up monitoring

### Cloudinary

- Use a production folder name (set via `CLOUDINARY_FOLDER`)
- Configure image optimization settings
- Set up usage alerts

### Server

- Use a reverse proxy (nginx/Apache) for HTTPS
- Configure rate limiting
- Set up logging
- Monitor server resources

### Security

- ✅ Session secret is now environment-based
- ✅ Secure cookies enabled in production
- ✅ Database URI is environment-based
- ⚠️ Ensure HTTPS is configured
- ⚠️ Set up proper firewall rules
- ⚠️ Regular security updates

## Monitoring

Monitor the following:

- Server uptime and response times
- Database connection status
- Error logs
- Resource usage (CPU, memory, disk)
- Application logs

## Troubleshooting

### Database Connection Issues

- Verify `MONGODB_URI` is correct
- Check database server is accessible
- Verify network/firewall rules

### Session Issues

- Ensure `SESSION_SECRET` is set and consistent across instances
- Check cookie settings match your domain

### Image Upload Issues

- Verify Cloudinary credentials are correct
- Check `CLOUDINARY_FOLDER` is set appropriately
- Verify file size limits

## Support

For issues or questions, check the application logs and error messages.

