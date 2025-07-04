# Kubernetes Basics - README

This guide introduces the foundational components of Kubernetes (K8s): **Pods**, **ReplicaSets**, **Deployments**, **Services**, and **Manifest Files**.

---

## 📊 Hierarchy Overview


---

## 📦 1. Pods

- **Definition**: The smallest deployable unit in Kubernetes.
- **Contains**: One or more tightly coupled containers.
- **Lifecycle**: Managed by higher-level controllers like ReplicaSets or Deployments.

> 💡 Think of a Pod as a wrapper around your container(s).

---

## 🔁 2. ReplicaSets

- **Definition**: Ensures a specified number of identical Pods are running at all times.
- **Self-healing**: Replaces failed Pods automatically.
- **Used By**: Mostly managed through Deployments.

---

## 🚀 3. Deployments

- **Definition**: High-level controller that manages ReplicaSets and their Pods.
- **Capabilities**:
  - Rolling updates
  - Rollbacks
  - Scaling
- **Why Use**: Makes versioned application updates easy and safe.

---

## 🌐 4. Services

- **Definition**: An abstraction layer that exposes a set of Pods as a network service.
- **Types**:
  - `ClusterIP` (default, internal)
  - `NodePort` (external on each node IP)
  - `LoadBalancer` (uses cloud LB)
- **Why Needed**: Pods are ephemeral; Services ensure stable networking.

---

## 📝 5. Manifest Files

- **Definition**: YAML or JSON configuration files used to define any K8s object.
- **Common Fields**:
  - `apiVersion`
  - `kind`
  - `metadata`
  - `spec`
- **Usage**: Apply using:
  ```bash
  kubectl apply -f <filename>.yaml




kubectl apply -f deployment.yaml     # Create Deployment
kubectl apply -f service.yaml        # Create Service
kubectl get pods                     # List Pods
kubectl get deployments              # List Deployments
kubectl get services                 # List Services
kubectl delete -f deployment.yaml    # Delete Deployment
