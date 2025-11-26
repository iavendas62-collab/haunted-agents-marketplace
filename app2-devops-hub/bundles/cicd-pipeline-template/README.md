# CI/CD Pipeline Template Bundle

## Overview

Transform your Kiro into a CI/CD expert! This agent bundle provides comprehensive guidance for designing, implementing, and maintaining continuous integration and deployment pipelines across multiple platforms.

## What's Included

### 📋 Steering Files
- **cicd-best-practices.md** - Comprehensive CI/CD best practices covering GitHub Actions, GitLab CI, Jenkins, and more

### 📝 Spec Templates
- **pipeline-requirements.md** - Template for defining CI/CD pipeline requirements

## Use Cases

### 1. GitHub Actions Workflow
Create a complete CI/CD workflow with testing, building, and deployment:
```
Help me create a GitHub Actions workflow that runs tests, builds a Docker image, and deploys to AWS ECS
```

### 2. Multi-Stage Pipeline
Design a pipeline with development, staging, and production stages:
```
Design a multi-stage CI/CD pipeline with automated testing in dev, manual approval for staging, and blue-green deployment to production
```

### 3. Pipeline Optimization
Optimize existing pipeline for speed and reliability:
```
Review my current CI/CD pipeline and suggest optimizations for faster builds and better caching strategies
```

## Installation

```bash
kiro-agent install cicd-pipeline-template
```

## What You'll Get

After installation, Kiro will have expert knowledge of:

- **Pipeline Design Principles** - Fail fast, idempotency, reproducibility
- **Stage Organization** - Validate, build, test, deploy patterns
- **Platform-Specific Best Practices** - GitHub Actions, GitLab CI, Jenkins, CircleCI
- **Docker Best Practices** - Multi-stage builds, image optimization, security
- **Testing Strategies** - Test pyramid, parallel execution, coverage
- **Security** - Secret management, dependency scanning, image scanning
- **Deployment Strategies** - Blue-green, canary, rolling deployments
- **Monitoring & Observability** - Metrics, alerting, troubleshooting
- **Optimization** - Build speed, cost optimization, caching

## Example Workflows

### Creating a New Pipeline

1. Use the spec template to define your requirements:
   ```
   Help me fill out the CI/CD pipeline requirements template for my Node.js application
   ```

2. Design the pipeline architecture:
   ```
   Based on these requirements, design a GitHub Actions workflow with optimal stage organization
   ```

3. Implement the configuration:
   ```
   Write the complete GitHub Actions workflow file with all stages and jobs
   ```

### Optimizing an Existing Pipeline

1. Share your current pipeline configuration
2. Ask for optimization suggestions:
   ```
   Review this pipeline and suggest improvements for speed and reliability
   ```

### Troubleshooting Pipeline Issues

```
My GitHub Actions workflow is failing at the deployment stage with this error: [paste error]. Help me debug and fix it.
```

## Best Practices Covered

- ✅ Fail fast with quick validation stages
- ✅ Parallel job execution for speed
- ✅ Aggressive caching strategies
- ✅ Security scanning and vulnerability detection
- ✅ Proper secret management
- ✅ Multi-stage Docker builds
- ✅ Automated testing at multiple levels
- ✅ Deployment strategies (blue-green, canary, rolling)
- ✅ Monitoring and alerting
- ✅ Rollback capabilities

## Requirements

- Git version control
- CI/CD platform (GitHub Actions, GitLab CI, Jenkins, etc.)
- Basic understanding of your deployment target

## Support

For issues or questions about this bundle:
- Check the steering file for comprehensive guidance
- Use the spec template to structure your requirements
- Ask Kiro for specific implementation help

## Version

1.0.0

## License

MIT

## Author

Haunted Agents Team
