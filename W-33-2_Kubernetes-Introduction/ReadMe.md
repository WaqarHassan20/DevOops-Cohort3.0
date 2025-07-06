# Introduction to Kubernetes

## 🌐 What is Kubernetes?

Kubernetes (also known as K8s) is an open-source container orchestration platform designed to automate the deployment, scaling, and management of containerized applications. Originally developed by Google, it is now maintained by the Cloud Native Computing Foundation (CNCF).

---

## 🧱 Why Use Kubernetes?

* **Automated Deployment & Scaling**: Automatically deploy and scale applications as needed.
* **High Availability**: Ensures your application is always running, even if some parts fail.
* **Self-healing**: Automatically restarts failed containers and replaces them if needed.
* **Load Balancing**: Distributes traffic across multiple containers to balance the load.
* **Rolling Updates**: Deploy new versions of applications with zero downtime.
* **Declarative Configuration**: Define your application setup using YAML or JSON files.

---

## 📦 Core Concepts

### 1. **Pod**

The smallest and simplest unit in Kubernetes. A pod wraps one or more containers and shares storage, network, and specifications.

### 2. **Deployment**

A controller that manages the lifecycle of Pods. It ensures the desired number of replicas are running and handles updates.

### 3. **Service**

A stable endpoint to access a group of Pods. It provides load balancing and service discovery.

#### 🔍 Types of Kubernetes Services

1. **ClusterIP (default)**

   * Exposes the service **internally** within the cluster.
   * Not accessible from outside the cluster.
   * Commonly used for internal communication between services.

2. **NodePort**

   * Exposes the service on a **static port** on each Node’s IP.
   * Accessible from outside the cluster using `<NodeIP>:<NodePort>`.
   * Useful for simple testing or development.

3. **LoadBalancer**

   * Provisions an **external load balancer** via the cloud provider.
   * Provides a single public IP to access the service.
   * Common in production environments on cloud platforms.

4. **ExternalName**

   * Maps the service to an **external DNS name**.
   * No proxying; it simply returns the external name (like `example.com`) as a CNAME record.

5. **Headless Service (ClusterIP None)**

   * No load-balancing or stable IP.
   * Used for **direct pod-to-pod communication** or **stateful sets**.
   * DNS resolves to the Pod IPs directly.

### 4. **ReplicaSet**

Ensures a specified number of pod replicas are running at any given time.

### 5. **Namespace**

Logical partitions in the cluster to divide resources between multiple users or applications.

### 6. **Ingress**

Manages external access to services, usually HTTP, and supports load balancing and path-based routing.

---

## ☁️ Kubernetes Architecture

* **Master Node**: Controls and manages the Kubernetes cluster (Scheduler, API Server, Controller Manager).
* **Worker Nodes**: Run the actual application containers inside Pods.
* **etcd**: A consistent and highly available key-value store used as Kubernetes' backing store for all cluster data.

---

## 🚀 Getting Started

To start using Kubernetes, you can:

* Install **Minikube** for local testing.
* Use **kind** (Kubernetes IN Docker) for lightweight clusters.
* Try managed Kubernetes services like **GKE**, **EKS**, or **AKS** for production.

---

## ✅ Conclusion

Kubernetes is a powerful tool for managing containerized applications at scale. With its rich ecosystem and broad community support, it's a must-know for modern DevOps and cloud-native development.

---