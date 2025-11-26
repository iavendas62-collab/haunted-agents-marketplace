# Terraform Best Practices

## Overview

This steering document provides comprehensive guidance for writing, testing, and managing infrastructure as code with Terraform. Follow these best practices to create maintainable, scalable, and reliable infrastructure.

## Core Terraform Concepts

### Infrastructure as Code Principles
- **Declarative**: Describe desired state, not steps to achieve it
- **Idempotent**: Running multiple times produces same result
- **Version Controlled**: All infrastructure code in Git
- **Reviewable**: Changes reviewed before applying
- **Testable**: Infrastructure can be tested before production

### Terraform Workflow
1. **Write**: Define infrastructure in .tf files
2. **Plan**: Preview changes with `terraform plan`
3. **Apply**: Create/update infrastructure with `terraform apply`
4. **Destroy**: Remove infrastructure with `terraform destroy`

## Project Structure

### Recommended Directory Layout

```
terraform/
├── modules/                    # Reusable modules
│   ├── vpc/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   ├── compute/
│   └── database/
├── environments/               # Environment-specific configs
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   ├── staging/
│   └── production/
├── global/                     # Shared resources
│   └── iam/
└── README.md
```

### File Organization

**main.tf**: Primary resource definitions
```hcl
# Main infrastructure resources
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  
  tags = {
    Name        = "${var.environment}-vpc"
    Environment = var.environment
  }
}
```

**variables.tf**: Input variable declarations
```hcl
variable "environment" {
  description = "Environment name (dev, staging, production)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}
```

**outputs.tf**: Output value definitions
```hcl
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.main.cidr_block
}
```

**terraform.tfvars**: Variable values (environment-specific)
```hcl
environment = "production"
vpc_cidr    = "10.0.0.0/16"
region      = "us-east-1"
```

**backend.tf**: Backend configuration
```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

## Module Design

### Creating Reusable Modules

#### Module Structure
```
modules/vpc/
├── main.tf           # Resource definitions
├── variables.tf      # Input variables
├── outputs.tf        # Output values
├── versions.tf       # Provider version constraints
└── README.md         # Module documentation
```

#### Module Best Practices

1. **Single Responsibility**: Each module should have one clear purpose
2. **Composable**: Modules should work together
3. **Configurable**: Use variables for flexibility
4. **Well-Documented**: Clear README with examples
5. **Versioned**: Tag module releases

#### Example Module (VPC)

**main.tf**:
```hcl
resource "aws_vpc" "this" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = var.enable_dns_hostnames
  enable_dns_support   = var.enable_dns_support

  tags = merge(
    var.tags,
    {
      Name = var.name
    }
  )
}

resource "aws_subnet" "public" {
  count             = length(var.public_subnet_cidrs)
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.public_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-public-${count.index + 1}"
      Type = "public"
    }
  )
}
```

**variables.tf**:
```hcl
variable "name" {
  description = "Name prefix for VPC resources"
  type        = string
}

variable "cidr_block" {
  description = "CIDR block for VPC"
  type        = string
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = []
}

variable "availability_zones" {
  description = "Availability zones for subnets"
  type        = list(string)
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
```

**outputs.tf**:
```hcl
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.this.id
}

output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = aws_subnet.public[*].id
}
```

#### Using Modules

```hcl
module "vpc" {
  source = "./modules/vpc"

  name                 = "production-vpc"
  cidr_block          = "10.0.0.0/16"
  public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
  availability_zones  = ["us-east-1a", "us-east-1b"]

  tags = {
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

# Use module outputs
resource "aws_instance" "app" {
  subnet_id = module.vpc.public_subnet_ids[0]
  # ...
}
```

## State Management

### Remote State Backend

#### S3 Backend with DynamoDB Locking
```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
    
    # Optional: Use workspaces
    workspace_key_prefix = "workspaces"
  }
}
```

#### Setting Up S3 Backend
```hcl
# Create S3 bucket for state
resource "aws_s3_bucket" "terraform_state" {
  bucket = "my-terraform-state"
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Create DynamoDB table for locking
resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
```

### State Best Practices

1. **Always Use Remote State**: Never use local state for teams
2. **Enable State Locking**: Prevent concurrent modifications
3. **Enable Versioning**: Keep state history for recovery
4. **Encrypt State**: State contains sensitive data
5. **Separate State Files**: Use different state per environment
6. **Backup State**: Regular backups of state files

### State Commands

```bash
# View current state
terraform state list

# Show specific resource
terraform state show aws_instance.example

# Move resource in state
terraform state mv aws_instance.old aws_instance.new

# Remove resource from state (doesn't destroy)
terraform state rm aws_instance.example

# Import existing resource
terraform import aws_instance.example i-1234567890abcdef0

# Pull remote state
terraform state pull > terraform.tfstate.backup
```

## Variable Management

### Variable Types

```hcl
# String
variable "region" {
  type    = string
  default = "us-east-1"
}

# Number
variable "instance_count" {
  type    = number
  default = 2
}

# Bool
variable "enable_monitoring" {
  type    = bool
  default = true
}

# List
variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b"]
}

# Map
variable "tags" {
  type = map(string)
  default = {
    Environment = "dev"
    ManagedBy   = "terraform"
  }
}

# Object
variable "instance_config" {
  type = object({
    instance_type = string
    ami           = string
    volume_size   = number
  })
}
```

### Variable Validation

```hcl
variable "environment" {
  type        = string
  description = "Environment name"
  
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
  
  validation {
    condition     = can(regex("^t[23]\\.", var.instance_type))
    error_message = "Instance type must be t2 or t3 family."
  }
}
```

### Sensitive Variables

```hcl
variable "database_password" {
  type        = string
  description = "Database password"
  sensitive   = true
}

# Use in resource
resource "aws_db_instance" "main" {
  password = var.database_password
  # ...
}
```

### Variable Precedence (highest to lowest)
1. Command line flags: `-var="key=value"`
2. `*.auto.tfvars` files
3. `terraform.tfvars` file
4. Environment variables: `TF_VAR_name`
5. Default values in variable declarations

## Resource Management

### Resource Naming

```hcl
# Good: Descriptive, consistent naming
resource "aws_instance" "web_server" {
  tags = {
    Name = "${var.environment}-web-server-${count.index + 1}"
  }
}

# Bad: Generic, unclear naming
resource "aws_instance" "instance1" {
  tags = {
    Name = "server"
  }
}
```

### Resource Dependencies

```hcl
# Implicit dependency (Terraform detects automatically)
resource "aws_instance" "app" {
  subnet_id = aws_subnet.public.id
}

# Explicit dependency (when needed)
resource "aws_instance" "app" {
  depends_on = [aws_iam_role_policy.app_policy]
}
```

### Count vs For_Each

**Count**: Use for identical resources
```hcl
resource "aws_instance" "web" {
  count         = 3
  instance_type = "t3.micro"
  
  tags = {
    Name = "web-${count.index + 1}"
  }
}
```

**For_Each**: Use for distinct resources
```hcl
variable "instances" {
  type = map(object({
    instance_type = string
    ami           = string
  }))
}

resource "aws_instance" "servers" {
  for_each = var.instances
  
  instance_type = each.value.instance_type
  ami           = each.value.ami
  
  tags = {
    Name = each.key
  }
}
```

### Lifecycle Rules

```hcl
resource "aws_instance" "app" {
  # ...
  
  lifecycle {
    # Create new before destroying old
    create_before_destroy = true
    
    # Prevent accidental deletion
    prevent_destroy = true
    
    # Ignore changes to specific attributes
    ignore_changes = [
      tags["LastModified"],
      user_data
    ]
  }
}
```

## Provider Configuration

### Provider Versions

```hcl
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.region
  
  default_tags {
    tags = {
      ManagedBy   = "Terraform"
      Environment = var.environment
    }
  }
}
```

### Multiple Provider Configurations

```hcl
# Default provider
provider "aws" {
  region = "us-east-1"
}

# Additional provider with alias
provider "aws" {
  alias  = "west"
  region = "us-west-2"
}

# Use specific provider
resource "aws_instance" "east" {
  provider = aws
  # ...
}

resource "aws_instance" "west" {
  provider = aws.west
  # ...
}
```

## Data Sources

### Using Data Sources

```hcl
# Get latest Amazon Linux AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Use in resource
resource "aws_instance" "app" {
  ami = data.aws_ami.amazon_linux.id
  # ...
}

# Get current AWS account
data "aws_caller_identity" "current" {}

output "account_id" {
  value = data.aws_caller_identity.current.account_id
}
```

## Testing Strategies

### Validation Testing

```bash
# Format check
terraform fmt -check -recursive

# Validate configuration
terraform validate

# Plan with detailed output
terraform plan -out=tfplan

# Show plan in JSON
terraform show -json tfplan
```

### Integration Testing

Use tools like Terratest (Go) or pytest-terraform:

```go
// Terratest example
func TestTerraformVPC(t *testing.T) {
    terraformOptions := &terraform.Options{
        TerraformDir: "../examples/vpc",
        Vars: map[string]interface{}{
            "environment": "test",
        },
    }
    
    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)
    
    vpcID := terraform.Output(t, terraformOptions, "vpc_id")
    assert.NotEmpty(t, vpcID)
}
```

### Policy Testing

Use tools like Sentinel or OPA for policy enforcement:

```hcl
# Sentinel policy example
import "tfplan/v2" as tfplan

# Ensure all instances have tags
main = rule {
  all tfplan.resource_changes as _, rc {
    rc.type is "aws_instance" implies
      rc.change.after.tags contains "Environment"
  }
}
```

## Security Best Practices

### Secrets Management

```hcl
# DON'T: Hardcode secrets
resource "aws_db_instance" "bad" {
  password = "hardcoded-password"  # BAD!
}

# DO: Use variables marked sensitive
variable "db_password" {
  type      = string
  sensitive = true
}

resource "aws_db_instance" "good" {
  password = var.db_password
}

# DO: Use AWS Secrets Manager
data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = "production/db/password"
}

resource "aws_db_instance" "better" {
  password = jsondecode(data.aws_secretsmanager_secret_version.db_password.secret_string)["password"]
}
```

### Least Privilege

```hcl
# Minimal IAM policy
resource "aws_iam_role_policy" "app" {
  role = aws_iam_role.app.id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject"
        ]
        Resource = "${aws_s3_bucket.app.arn}/*"
      }
    ]
  })
}
```

### Security Groups

```hcl
# Restrictive security group
resource "aws_security_group" "app" {
  name        = "${var.environment}-app-sg"
  description = "Security group for app servers"
  vpc_id      = aws_vpc.main.id
  
  # Ingress only from load balancer
  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.lb.id]
  }
  
  # Egress to specific destinations
  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS to internet"
  }
}
```

## Performance Optimization

### Parallelism

```bash
# Increase parallelism (default is 10)
terraform apply -parallelism=20
```

### Targeted Operations

```bash
# Apply only specific resources
terraform apply -target=aws_instance.app

# Destroy only specific resources
terraform destroy -target=aws_instance.app
```

### Refresh Optimization

```bash
# Skip refresh for faster plans
terraform plan -refresh=false

# Refresh only
terraform refresh
```

## Common Patterns

### Multi-Environment Setup

```hcl
# environments/production/main.tf
module "infrastructure" {
  source = "../../modules/infrastructure"
  
  environment         = "production"
  instance_count      = 5
  instance_type       = "t3.large"
  enable_monitoring   = true
  enable_auto_scaling = true
}

# environments/dev/main.tf
module "infrastructure" {
  source = "../../modules/infrastructure"
  
  environment         = "dev"
  instance_count      = 1
  instance_type       = "t3.micro"
  enable_monitoring   = false
  enable_auto_scaling = false
}
```

### Conditional Resources

```hcl
resource "aws_instance" "app" {
  count = var.create_instance ? 1 : 0
  # ...
}

resource "aws_cloudwatch_alarm" "cpu" {
  count = var.enable_monitoring ? var.instance_count : 0
  # ...
}
```

### Dynamic Blocks

```hcl
resource "aws_security_group" "app" {
  name = "app-sg"
  
  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      from_port   = ingress.value.from_port
      to_port     = ingress.value.to_port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }
}
```

## Troubleshooting

### Common Issues

**State Lock Errors**:
```bash
# Force unlock (use with caution)
terraform force-unlock <lock-id>
```

**Resource Already Exists**:
```bash
# Import existing resource
terraform import aws_instance.app i-1234567890abcdef0
```

**Dependency Errors**:
- Check resource references
- Use `depends_on` for implicit dependencies
- Review module outputs

**Plan Differences**:
- Check for external changes
- Review lifecycle rules
- Use `terraform refresh`

### Debug Mode

```bash
# Enable debug logging
export TF_LOG=DEBUG
export TF_LOG_PATH=terraform.log

terraform apply
```

## When to Ask for Help

- Designing module architecture
- Setting up remote state and locking
- Implementing multi-environment strategies
- Optimizing large Terraform projects
- Debugging complex dependency issues
- Migrating existing infrastructure to Terraform
- Implementing testing strategies
- Setting up CI/CD for Terraform
- Troubleshooting state issues
- Designing security policies

Remember: Good Terraform code is readable, maintainable, and follows the DRY (Don't Repeat Yourself) principle. Use modules to encapsulate complexity and promote reusability.
