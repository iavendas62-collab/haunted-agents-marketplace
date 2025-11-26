# Terraform Helper Bundle

## Overview

Transform your Kiro into a Terraform expert! This agent bundle provides comprehensive guidance for infrastructure as code with Terraform. Perfect for DevOps engineers and infrastructure teams building scalable, maintainable infrastructure.

## What's Included

### 📋 Steering Files
- **terraform-best-practices.md** - Comprehensive Terraform best practices covering module design, state management, testing, and multi-cloud deployments

### 📝 Spec Templates
- **infrastructure-requirements.md** - Template for defining infrastructure requirements

## Use Cases

### 1. Create AWS Infrastructure
Design and implement AWS infrastructure with Terraform:
```
Help me create Terraform modules for a production AWS environment with VPC, ECS, RDS, and load balancer
```

### 2. Refactor to Modules
Refactor existing Terraform code into reusable modules:
```
Review my Terraform configuration and help me refactor it into reusable modules with proper variable design
```

### 3. Multi-Environment Setup
Set up Terraform for multiple environments:
```
Design a Terraform workspace structure for managing dev, staging, and production environments with shared modules
```

### 4. State Management
Configure remote state and state locking:
```
Help me set up remote state in S3 with DynamoDB locking and proper backend configuration
```

## Installation

```bash
kiro-agent install terraform-helper
```

## What You'll Get

After installation, Kiro will have expert knowledge of:

- **Project Structure** - Recommended directory layouts and file organization
- **Module Design** - Creating reusable, composable modules
- **State Management** - Remote state, locking, versioning, backup
- **Variable Management** - Types, validation, sensitive variables
- **Resource Management** - Naming, dependencies, count vs for_each
- **Provider Configuration** - Version constraints, multiple providers
- **Data Sources** - Querying existing infrastructure
- **Testing Strategies** - Validation, integration, policy testing
- **Security Best Practices** - Secrets management, least privilege, encryption
- **Performance Optimization** - Parallelism, targeted operations
- **Common Patterns** - Multi-environment, conditional resources, dynamic blocks
- **Troubleshooting** - Common issues and solutions

## Example Workflows

### Creating New Infrastructure

1. Use the spec template to define your requirements:
   ```
   Help me fill out the infrastructure requirements template for a production web application on AWS
   ```

2. Design the module structure:
   ```
   Based on these requirements, design a Terraform module structure with VPC, compute, and database modules
   ```

3. Implement the modules:
   ```
   Write the Terraform code for the VPC module with public and private subnets across 3 availability zones
   ```

### Refactoring Existing Code

1. Share your current Terraform configuration
2. Ask for refactoring suggestions:
   ```
   Review this Terraform code and suggest how to refactor it into reusable modules
   ```

### Setting Up Remote State

```
Help me set up Terraform remote state in S3 with DynamoDB locking for my team
```

### Troubleshooting Issues

```
I'm getting a state lock error when running terraform apply. How do I resolve this safely?
```

## Best Practices Covered

### Project Organization
- ✅ Recommended directory structure
- ✅ File organization (main.tf, variables.tf, outputs.tf)
- ✅ Module structure and documentation
- ✅ Environment separation

### Module Design
- ✅ Single responsibility principle
- ✅ Composable modules
- ✅ Variable validation
- ✅ Comprehensive outputs
- ✅ Semantic versioning

### State Management
- ✅ Remote state backends (S3, Azure, GCS)
- ✅ State locking with DynamoDB
- ✅ State encryption
- ✅ State versioning and backup
- ✅ State commands and operations

### Security
- ✅ Secrets management (no hardcoded secrets)
- ✅ Sensitive variable handling
- ✅ Least privilege IAM policies
- ✅ Security group best practices
- ✅ Encryption at rest and in transit

### Testing
- ✅ Validation testing (fmt, validate)
- ✅ Integration testing (Terratest)
- ✅ Policy testing (Sentinel, OPA)
- ✅ Plan review and approval

### Performance
- ✅ Parallelism optimization
- ✅ Targeted operations
- ✅ Refresh optimization
- ✅ Resource dependencies

## Common Patterns

### Multi-Environment Infrastructure
```hcl
# environments/production/main.tf
module "infrastructure" {
  source = "../../modules/infrastructure"
  
  environment    = "production"
  instance_count = 5
  instance_type  = "t3.large"
}
```

### Conditional Resources
```hcl
resource "aws_instance" "app" {
  count = var.create_instance ? 1 : 0
  # ...
}
```

### Dynamic Blocks
```hcl
dynamic "ingress" {
  for_each = var.ingress_rules
  content {
    from_port   = ingress.value.from_port
    to_port     = ingress.value.to_port
    protocol    = ingress.value.protocol
    cidr_blocks = ingress.value.cidr_blocks
  }
}
```

## Requirements

- Terraform 1.0 or later
- Cloud provider CLI (aws-cli, az, gcloud)
- Basic understanding of infrastructure concepts

## Troubleshooting Guide

The steering file includes comprehensive troubleshooting for:
- State lock errors
- Resource already exists errors
- Dependency errors
- Plan differences
- Import operations

## Quick Reference

### Essential Commands
```bash
# Initialize
terraform init

# Format code
terraform fmt -recursive

# Validate configuration
terraform validate

# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy infrastructure
terraform destroy

# State operations
terraform state list
terraform state show <resource>
terraform import <resource> <id>
```

### State Management
```bash
# View state
terraform state list

# Import existing resource
terraform import aws_instance.app i-1234567890

# Move resource in state
terraform state mv aws_instance.old aws_instance.new

# Remove from state
terraform state rm aws_instance.app
```

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
