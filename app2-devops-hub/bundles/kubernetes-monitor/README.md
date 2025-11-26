# Kubernetes Monitor Bundle

## Overview

Transform your Kiro into a Kubernetes expert! This agent bundle provides comprehensive guidance for monitoring, troubleshooting, and managing Kubernetes clusters. Perfect for DevOps engineers and SREs managing containerized applications at scale.

## What's Included

### 📋 Steering Files
- **k8s-monitoring-patterns.md** - Comprehensive Kubernetes monitoring, troubleshooting, and management patterns

### 🪝 Hooks
- **validate-k8s-manifest** - Automatically validates Kubernetes YAML manifests when saved using `kubectl apply --dry-run`

## Use Cases

### 1. Debug Pod Issues
Troubleshoot pods that are crashing or not starting:
```
My pod is in CrashLoopBackOff state. Help me debug what's wrong and fix it
```

### 2. Set Up Monitoring
Configure comprehensive monitoring for your cluster:
```
Help me set up Prometheus and Grafana for monitoring my Kubernetes cluster with key metrics and alerts
```

### 3. Optimize Resource Usage
Analyze and optimize resource requests and limits:
```
Review my deployment manifests and suggest optimal resource requests and limits based on actual usage
```

### 4. Validate Deployment
Check deployment configuration before applying:
```
Validate this Kubernetes deployment manifest and check for common issues and best practices
```

## Installation

```bash
kiro-agent install kubernetes-monitor
```

## What You'll Get

After installation, Kiro will have expert knowledge of:

- **Pod Troubleshooting** - Debug ImagePullBackOff, CrashLoopBackOff, Pending, OOMKilled issues
- **Monitoring Setup** - Prometheus, Grafana, metrics collection, alerting
- **Resource Management** - Requests, limits, quotas, autoscaling
- **Deployment Validation** - Dry-run checks, manifest validation, best practices
- **Health Checks** - Liveness, readiness, and startup probes
- **Observability** - Logging, tracing, metrics collection
- **Security** - Pod security, network policies, secrets management
- **Performance Optimization** - HPA, VPA, cluster autoscaling
- **Incident Response** - Quick response commands, rollback procedures

## Automatic Validation

The included hook automatically validates your Kubernetes manifests when you save YAML files:

- Runs `kubectl apply --dry-run=client` on save
- Catches syntax errors before deployment
- Validates resource definitions
- Checks for common misconfigurations

## Example Workflows

### Debugging a Failing Pod

1. Share the pod status:
   ```
   My pod "api-deployment-abc123" is failing. Here's the output of kubectl describe pod
   ```

2. Kiro will guide you through:
   - Analyzing the pod events
   - Checking logs
   - Identifying the root cause
   - Providing a fix

### Setting Up Monitoring

1. Ask for monitoring setup:
   ```
   Help me set up comprehensive monitoring for my Kubernetes cluster
   ```

2. Kiro will provide:
   - Prometheus configuration
   - Grafana dashboard recommendations
   - Key metrics to monitor
   - Alert rules

### Optimizing Resources

1. Share your deployment manifest:
   ```
   Review this deployment and suggest resource optimizations: [paste manifest]
   ```

2. Kiro will analyze:
   - Current resource settings
   - Recommended requests and limits
   - Autoscaling opportunities
   - Cost optimization suggestions

## Troubleshooting Patterns Covered

### Pod Issues
- ✅ ImagePullBackOff - Image pull failures
- ✅ CrashLoopBackOff - Container crashes
- ✅ Pending - Scheduling issues
- ✅ OOMKilled - Out of memory
- ✅ Error states - Container errors

### Deployment Issues
- ✅ Rollout failures
- ✅ Configuration errors
- ✅ Resource constraints
- ✅ Health check failures

### Cluster Issues
- ✅ Node problems
- ✅ Resource exhaustion
- ✅ Network issues
- ✅ Storage problems

## Best Practices Covered

- ✅ Resource requests and limits
- ✅ Health check configuration
- ✅ Deployment strategies
- ✅ Security contexts
- ✅ Network policies
- ✅ Secrets management
- ✅ Logging and monitoring
- ✅ Autoscaling
- ✅ Cost optimization

## Requirements

- kubectl installed and configured
- Access to a Kubernetes cluster
- Basic understanding of Kubernetes concepts

## Quick Reference Commands

The steering file includes comprehensive command references for:
- Pod debugging (`kubectl logs`, `kubectl describe`, `kubectl exec`)
- Resource monitoring (`kubectl top`)
- Deployment management (`kubectl rollout`)
- Node management (`kubectl cordon`, `kubectl drain`)
- Troubleshooting workflows

## Support

For issues or questions about this bundle:
- Check the steering file for comprehensive guidance
- Ask Kiro for specific troubleshooting help
- Use the validation hook to catch issues early

## Version

1.0.0

## License

MIT

## Author

Haunted Agents Team
