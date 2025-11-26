# Kubernetes Monitoring and Management Patterns

## Overview

This steering document provides comprehensive guidance for monitoring, troubleshooting, and managing Kubernetes clusters. Follow these patterns to maintain healthy, performant, and reliable containerized applications.

## Core Kubernetes Concepts

### Pod Lifecycle
- **Pending**: Pod accepted but not yet scheduled
- **Running**: Pod bound to node, containers running
- **Succeeded**: All containers terminated successfully
- **Failed**: All containers terminated, at least one failed
- **Unknown**: Pod state cannot be determined

### Common Pod Issues
- **ImagePullBackOff**: Cannot pull container image
- **CrashLoopBackOff**: Container keeps crashing
- **Pending**: Cannot be scheduled (resources, affinity)
- **OOMKilled**: Out of memory
- **Error**: Container exited with error

## Monitoring Best Practices

### Essential Metrics to Monitor

#### Cluster-Level Metrics
- **Node Health**
  - CPU usage per node
  - Memory usage per node
  - Disk usage per node
  - Network I/O per node
  - Node conditions (Ready, MemoryPressure, DiskPressure)

- **Cluster Capacity**
  - Total allocatable resources
  - Resource requests vs limits
  - Pod count vs capacity
  - Persistent volume usage

#### Application-Level Metrics
- **Pod Metrics**
  - CPU usage per pod
  - Memory usage per pod
  - Restart count
  - Pod status and phase
  - Container readiness

- **Deployment Metrics**
  - Desired vs available replicas
  - Rollout status
  - Update strategy progress
  - Deployment age

#### Service Metrics
- **Request Metrics**
  - Request rate (requests/second)
  - Error rate (errors/second)
  - Latency (p50, p95, p99)
  - Saturation (queue depth, thread pool usage)

### Monitoring Stack Setup

#### Prometheus + Grafana
```yaml
# Prometheus configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
            action: keep
            regex: true
```

#### Key Grafana Dashboards
1. **Cluster Overview**
   - Node status and resource usage
   - Pod distribution across nodes
   - Cluster-wide resource utilization

2. **Application Dashboard**
   - Request rate, error rate, latency
   - Pod health and restart counts
   - Resource usage trends

3. **Node Dashboard**
   - CPU, memory, disk, network per node
   - Pod count per node
   - Node conditions and events

## Troubleshooting Patterns

### Debugging Pod Issues

#### Step 1: Check Pod Status
```bash
kubectl get pods -n <namespace>
kubectl describe pod <pod-name> -n <namespace>
```

Look for:
- Current state and reason
- Events (especially warnings/errors)
- Container statuses
- Resource requests/limits

#### Step 2: Check Logs
```bash
# Current logs
kubectl logs <pod-name> -n <namespace>

# Previous container logs (if crashed)
kubectl logs <pod-name> -n <namespace> --previous

# Follow logs in real-time
kubectl logs -f <pod-name> -n <namespace>

# Logs from specific container in multi-container pod
kubectl logs <pod-name> -c <container-name> -n <namespace>
```

#### Step 3: Execute Commands in Pod
```bash
# Get shell access
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh

# Run specific command
kubectl exec <pod-name> -n <namespace> -- env
kubectl exec <pod-name> -n <namespace> -- ps aux
```

#### Step 4: Check Resource Usage
```bash
kubectl top pod <pod-name> -n <namespace>
kubectl top node
```

### Common Issues and Solutions

#### ImagePullBackOff
**Symptoms**: Pod stuck in ImagePullBackOff state

**Diagnosis**:
```bash
kubectl describe pod <pod-name>
# Look for "Failed to pull image" in events
```

**Common Causes**:
- Image doesn't exist or wrong tag
- Private registry authentication issues
- Network issues reaching registry
- Image name typo

**Solutions**:
- Verify image name and tag
- Check imagePullSecrets configuration
- Test registry access from node
- Check registry credentials

#### CrashLoopBackOff
**Symptoms**: Pod keeps restarting

**Diagnosis**:
```bash
kubectl logs <pod-name> --previous
kubectl describe pod <pod-name>
```

**Common Causes**:
- Application crashes on startup
- Missing environment variables
- Configuration errors
- Resource limits too low
- Liveness probe failing

**Solutions**:
- Check application logs for errors
- Verify all required env vars are set
- Review configuration files
- Increase resource limits
- Adjust probe timing

#### Pending Pods
**Symptoms**: Pod stuck in Pending state

**Diagnosis**:
```bash
kubectl describe pod <pod-name>
# Look for scheduling failures in events
```

**Common Causes**:
- Insufficient resources (CPU/memory)
- Node selector/affinity not matching
- Taints preventing scheduling
- PersistentVolume not available

**Solutions**:
- Check node resources: `kubectl top nodes`
- Review node selectors and affinity rules
- Check node taints: `kubectl describe node <node-name>`
- Verify PV/PVC status

#### OOMKilled
**Symptoms**: Container killed due to out of memory

**Diagnosis**:
```bash
kubectl describe pod <pod-name>
# Look for "OOMKilled" in container status
```

**Solutions**:
- Increase memory limits
- Investigate memory leaks in application
- Optimize application memory usage
- Add memory monitoring and alerts

## Resource Management

### Setting Resource Requests and Limits

#### Best Practices
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: resource-demo
spec:
  containers:
  - name: app
    image: myapp:1.0
    resources:
      requests:
        memory: "256Mi"
        cpu: "250m"
      limits:
        memory: "512Mi"
        cpu: "500m"
```

**Guidelines**:
- **Requests**: What the container needs (guaranteed)
- **Limits**: Maximum the container can use
- Set requests based on typical usage
- Set limits 1.5-2x requests for burstability
- Monitor actual usage to tune values

### Resource Quotas
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: namespace-quota
  namespace: production
spec:
  hard:
    requests.cpu: "10"
    requests.memory: "20Gi"
    limits.cpu: "20"
    limits.memory: "40Gi"
    pods: "50"
```

### Limit Ranges
```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: production
spec:
  limits:
  - default:
      memory: "512Mi"
      cpu: "500m"
    defaultRequest:
      memory: "256Mi"
      cpu: "250m"
    type: Container
```

## Deployment Validation

### Pre-Deployment Checks

#### Dry Run Validation
```bash
kubectl apply --dry-run=client -f deployment.yaml
kubectl apply --dry-run=server -f deployment.yaml
```

#### Manifest Validation
- Check for required fields
- Verify image tags (avoid :latest)
- Ensure resource requests/limits are set
- Validate probe configurations
- Check security contexts

### Deployment Strategies

#### Rolling Update (Default)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
```

**Best for**: Most applications, zero-downtime updates

#### Recreate
```yaml
spec:
  strategy:
    type: Recreate
```

**Best for**: Applications that can't run multiple versions simultaneously

### Health Checks

#### Liveness Probe
```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3
```

**Purpose**: Detect when container needs restart

#### Readiness Probe
```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 3
```

**Purpose**: Detect when container is ready to serve traffic

#### Startup Probe
```yaml
startupProbe:
  httpGet:
    path: /startup
    port: 8080
  initialDelaySeconds: 0
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 30
```

**Purpose**: Handle slow-starting containers

### Probe Best Practices
- Use all three probe types appropriately
- Set initialDelaySeconds based on startup time
- Keep probe endpoints lightweight
- Don't fail probes on downstream dependencies
- Use appropriate timeouts and thresholds

## Observability

### Logging Best Practices

#### Application Logging
- Log to stdout/stderr (not files)
- Use structured logging (JSON)
- Include correlation IDs
- Log at appropriate levels
- Don't log sensitive data

#### Log Aggregation
- Use centralized logging (ELK, Loki, CloudWatch)
- Add metadata (namespace, pod, container)
- Set retention policies
- Create log-based alerts

### Distributed Tracing
- Implement OpenTelemetry
- Trace requests across services
- Identify bottlenecks
- Debug complex interactions

### Metrics Collection
- Expose Prometheus metrics
- Use standard metric names
- Include relevant labels
- Monitor golden signals (latency, traffic, errors, saturation)

## Security Best Practices

### Pod Security
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    image: myapp:1.0
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
```

### Network Policies
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
```

### Secrets Management
- Use Kubernetes Secrets or external secret managers
- Never commit secrets to version control
- Rotate secrets regularly
- Use RBAC to control access
- Consider encryption at rest

## Performance Optimization

### Horizontal Pod Autoscaling
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Vertical Pod Autoscaling
- Automatically adjust resource requests/limits
- Use for workloads with variable resource needs
- Monitor recommendations before applying

### Cluster Autoscaling
- Automatically add/remove nodes
- Set appropriate min/max node counts
- Consider cost vs availability tradeoffs

## Incident Response

### Incident Checklist
1. **Identify**: What's broken? What's the impact?
2. **Contain**: Stop the bleeding (rollback, scale, etc.)
3. **Diagnose**: Find root cause
4. **Fix**: Apply permanent solution
5. **Document**: Write postmortem

### Quick Response Commands
```bash
# Rollback deployment
kubectl rollout undo deployment/<name>

# Scale deployment
kubectl scale deployment/<name> --replicas=5

# Delete problematic pod (will be recreated)
kubectl delete pod <pod-name>

# Cordon node (prevent new pods)
kubectl cordon <node-name>

# Drain node (move pods away)
kubectl drain <node-name> --ignore-daemonsets
```

## Cost Optimization

### Resource Efficiency
- Right-size resource requests/limits
- Use node affinity for workload placement
- Implement cluster autoscaling
- Use spot/preemptible instances for non-critical workloads

### Monitoring Costs
- Track resource usage per namespace
- Identify over-provisioned workloads
- Monitor unused resources
- Set up cost alerts

## When to Ask for Help

- Designing monitoring and alerting strategies
- Troubleshooting complex pod issues
- Optimizing resource allocation
- Setting up autoscaling
- Implementing security best practices
- Debugging network policies
- Designing deployment strategies
- Setting up distributed tracing
- Investigating performance issues
- Planning disaster recovery

Remember: Kubernetes is complex, but systematic troubleshooting and good observability practices make it manageable. Always start with the basics (logs, events, resource usage) before diving into complex debugging.
