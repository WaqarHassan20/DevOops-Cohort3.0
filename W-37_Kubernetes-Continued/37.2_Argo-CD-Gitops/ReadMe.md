# 🚀 GitOps Deployment using Argo CD, Docker, and GitHub Actions

This guide explains how to automatically deploy your applications using **GitOps** principles, **Argo CD**, **Docker**, **GitHub Actions**, and **Secrets**.

---

## 🧠 Flow Overview

1. **Developer pushes code** to GitHub.
2. **GitHub Actions**:
   - Builds a Docker image.
   - Pushes it to Docker Hub or GHCR.
   - Updates image tag in GitOps repo (`deployment.yaml`).
3. **Argo CD** detects change in GitOps repo and syncs it to the Kubernetes cluster.

---

## 🗂 Repos Involved

### Source Repo (app-repo)
Contains:
- App code
- Dockerfile
- GitHub Actions workflow (`.github/workflows/ci-cd.yml`)

### GitOps Repo (gitops-repo)
Contains:
- Kubernetes YAMLs (`k8s/deployment.yaml`, etc.)

---

## 🔐 GitHub Secrets Required

| Secret Name        | Purpose                            |
|--------------------|-------------------------------------|
| `DOCKER_USERNAME`  | Docker Hub username                |
| `DOCKER_PASSWORD`  | Docker Hub token or password       |
| `GITOPS_REPO`      | GitOps repo URL                    |
| `GITOPS_TOKEN`     | GitHub token to push to GitOps repo|
| `GIT_USER_NAME`    | Git commit username                |
| `GIT_USER_EMAIL`   | Git commit email                   |

---

## 📄 Sample Workflow (`.github/workflows/ci-cd.yml`)

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: ["main"]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and Push Docker Image
      run: |
        IMAGE_TAG=your-dockerhub-user/your-app:${{ github.sha }}
        docker build -t $IMAGE_TAG .
        docker push $IMAGE_TAG

    - name: Update GitOps Repo
      run: |
        git config --global user.name "${{ secrets.GIT_USER_NAME }}"
        git config --global user.email "${{ secrets.GIT_USER_EMAIL }}"
        git clone https://${{ secrets.GITOPS_TOKEN }}@github.com/your-user/gitops-repo.git
        cd gitops-repo/k8s
        sed -i "s|image: .*|image: your-dockerhub-user/your-app:${{ github.sha }}|" deployment.yaml
        git commit -am "Update image tag to ${{ github.sha }}"
        git push



        ARGO CD SETUP

        # Install Argo CD
        kubectl create namespace argocd
        kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

        # Port forward the Argo CD UI
        kubectl port-forward svc/argocd-server -n argocd 8080:443

        # ========================================================= #

        argocd app create my-app \
        --repo https://github.com/your-user/gitops-repo.git \
        --path k8s \
        --dest-server https://kubernetes.default.svc \
        --dest-namespace default \
        --sync-policy automated
