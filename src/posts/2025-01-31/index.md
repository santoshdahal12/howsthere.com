---
path: "/FastAPI-Nginx"
date: "2025-01-31"
title: "FastAPI Root Path Guide: Fixing Swagger UI with NGINX"
featuredImage: delivery-truck.jpg
featuredImgAlt: "Delivery truck blocked metaphor"
featuredImgSrc: |
    Photo by <a href="https://deepdreamgenerator.com">Deep dream Generator</a> on <a href="https://deepdreamgenerator.com/processing/20930566?ut=4mx8aWMwDxhN">Deep Dream Generator</a>
keyWords: ["fastapi swagger nginx", "fastapi behind reverse proxy" , "swagger ui broken nginx", "fastapi openapi docs not working"]
tags: ["FastAPI", "NGINX", "Swagger UI", "OpenAPI", "API Documentation", "Python", "Web Development"]
excerpt: "Learn how to properly configure FastAPI's root_path when running behind NGINX to ensure Swagger UI and OpenAPI documentation work correctly in production"

---

# FastAPI Root Path Guide: Fixing Swagger UI with NGINX

When deploying a **FastAPI application** behind a reverse proxy like **NGINX**, one of the biggest challenges is maintaining proper functionality of the interactive API documentation (Swagger UI) and OpenAPI schema. The issue arises because FastAPI needs to know the correct "root path" under which it's being served.

Consider this scenario: Your FastAPI application runs at `http://localhost:8000`, but in production, it's served by NGINX under `https://api.example.com/api/v1/`. Without proper configuration:

- ❌ The Swagger UI interface shows endpoints with incorrect URLs
- ❌ API clients generated from your OpenAPI schema have wrong base paths
- ❌ Interactive documentation features fail to work properly
- ❌ Request handling breaks due to unexpected path prefixes

This configuration becomes even more critical when dealing with:

- **API Versioning**: Managing multiple API versions (`/api/v1`, `/api/v2`)
- **Multi-App Routing**: Serving different services under various paths (`/service1/`, `/service2/`)
- **Load Balancing**: Distributing traffic across multiple FastAPI instances
- **Security & Rate Limiting**: Implementing access controls and rate limits at the proxy level

In this tutorial, we'll solve these challenges by properly configuring both FastAPI's `root_path` and NGINX's proxy settings to create a production-ready setup.

## Why Use NGINX with FastAPI?

Before diving into the implementation, let's understand why this setup is crucial for production deployments:

### API Versioning
Managing multiple versions of your API (`/api/v1`, `/api/v2`) becomes straightforward with proper routing configuration, ensuring backward compatibility while allowing your API to evolve.

### Multi-App Routing
Running multiple applications on the same NGINX instance becomes seamless, enabling you to direct traffic to different backend services based on URL paths (`/service1/`, `/service2/`).

### Load Balancing
NGINX excels at distributing traffic between multiple FastAPI instances, making horizontal scaling possible to handle high loads efficiently.

### Security & Rate Limiting
Implement authentication at the proxy level, restrict access to specific endpoints, and enforce rate limits before requests even reach your FastAPI application.

## Common Pitfalls

Without proper configuration, you'll encounter several issues:

- ❌ Swagger UI (`/docs`) and OpenAPI JSON (`/openapi.json`) break
- ❌ Client-generated API URLs become incorrect, making OpenAPI documentation unusable
- ❌ Requests reach FastAPI with unexpected prefixes (e.g., `/api/v1`), resulting in `404 Not Found` errors

Let's solve these issues and create a production-ready setup.

## Setting Up FastAPI with Base Path Support

First, let's create a properly configured FastAPI application that works seamlessly with base path routing:

```python
from fastapi import FastAPI
import os

# Configure base path (e.g., /api/v1)
root_path = os.getenv('ROOT_PATH', '/api/v1')

# Initialize FastAPI with proper configuration
app = FastAPI(
    title="My FastAPI API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    root_path=root_path
)

# Custom OpenAPI schema configuration
def custom_openapi():
    openapi_schema = app.openapi()
    openapi_schema["servers"] = [{"url": f"{root_path}"}]
    return openapi_schema

app.openapi = custom_openapi

@app.get("/items")
def read_items():
    return {"items": ["item1", "item2", "item3"]}
```

The key configurations here ensure:

1. Proper base path handling through `root_path`
2. Correct OpenAPI schema generation
3. Functional documentation endpoints

## Production-Ready NGINX Configuration

Here's a robust NGINX configuration that handles all our requirements:

```nginx
server {
    listen 8080;
    server_name api.localtest.me;

    # Rate limiting configuration
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

    location /api/v1/ {
        # Apply rate limiting
        limit_req zone=api_limit burst=20 nodelay;
        
        proxy_pass http://localhost:8000/;  # Note the trailing slash
        
        # Preserve client request details
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Performance optimizations
        proxy_http_version 1.1;
        proxy_redirect off;
        proxy_buffering off;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### Understanding the Configuration

The configuration above includes several production-ready features:

1. **Rate Limiting**: Protects your API from abuse
2. **Header Forwarding**: Ensures your FastAPI app receives correct client information
3. **Performance Optimizations**: Improves response times and reduces resource usage
4. **Timeout Settings**: Prevents hanging connections

### The Critical Trailing Slash

Pay special attention to the trailing slash in `proxy_pass http://localhost:8000/;`. Here's why it matters:

- ✅ With trailing slash: `/api/v1/docs` → `/docs` (Correct)
- ❌ Without trailing slash: `/api/v1/docs` → `/api/v1/docs` (Incorrect)

This detail is crucial for proper path forwarding.

## Local Development Environment

For development, set up a local domain by adding this to your `/etc/hosts` file:

```plaintext
127.0.0.1    api.localtest.me
```

This mirrors a production environment while keeping development simple.

## Deployment Steps

1. Start your FastAPI application:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

2. Apply NGINX configuration:
```bash
sudo nginx -s reload
```

3. Verify your endpoints:
- Swagger UI: `http://api.localtest.me:8080/api/v1/docs`
- OpenAPI JSON: `http://api.localtest.me:8080/api/v1/openapi.json`
- API Endpoint: `http://api.localtest.me:8080/api/v1/items`

## Production Considerations

For production deployment, consider these additional configurations:

### SSL/TLS Setup
```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Modern SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
}
```

### Load Balancing Configuration
```nginx
upstream fastapi_backend {
    server 127.0.0.1:8000;
    server 127.0.0.1:8001;
    server 127.0.0.1:8002;
}
```

## What We've Achieved

Our setup now properly handles:

- ✅ Correct routing under specified base paths
- ✅ Functional Swagger UI and OpenAPI documentation
- ✅ Production-grade NGINX configuration
- ✅ Rate limiting and security features
- ✅ Load balancing readiness

## Next Steps

Consider implementing:

- Automated SSL renewal with Let's Encrypt
- Advanced monitoring and logging
- Container orchestration (Docker, Kubernetes)
- CI/CD pipeline integration

## Conclusion

Properly configuring FastAPI behind NGINX requires attention to detail, but the result is a robust, production-ready API setup that can handle real-world requirements. By following this guide, you've created a foundation that supports API versioning, multi-app routing, load balancing, and security features.

Remember to test thoroughly in a staging environment before deploying to production, paying special attention to documentation endpoints and rate limiting behavior. Happy deploying!