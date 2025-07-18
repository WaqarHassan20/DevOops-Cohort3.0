# 📦 Helm Chart - Complete Overview

Helm is a **package manager for Kubernetes** that helps you define, install, and manage complex Kubernetes applications using **charts**.

This README explains:

* What Helm is
* How a Helm chart is structured
* What each file does
* How everything works together to deploy an application

---

## 🚀 What is Helm?

Helm is to Kubernetes what `apt` or `yum` is to Linux: a **tool for installing pre-configured software packages**.
In Helm, these packages are called **charts**.

Charts contain:

* Kubernetes resource definitions (YAML templates)
* Configuration values (defaults or user-defined)
* Metadata and dependencies

---

## 📂 Helm Chart File Structure

A typical Helm chart (created with `helm create mychart`) has the following structure:

```
mychart/
├── Chart.yaml
├── values.yaml
├── charts/
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── _helpers.tpl
└── .helmignore
```

---

## 🧬 File/Folder Breakdown

### 1. `Chart.yaml`

* Contains **metadata** about the chart:

  * Name, version, appVersion, description
  * Optional: dependencies

```yaml
apiVersion: v2
name: my-postgres
description: A Helm chart for PostgreSQL
version: 1.0.0
appVersion: "15.2"
```

* 🔸 **Purpose**: Chart identity, versioning, dependency tracking
* ❌ Does NOT influence rendering or logic directly

---

### 2. `values.yaml`

* Contains **default configuration values**
* These values are injected into templates using the `{{ .Values.<key> }}` syntax
* You can override this file via CLI or custom files

Example:

```yaml
postgres:
  user: admin
  password: secret
  db: mydb
service:
  enabled: true
  port: 5432
```

* 🔸 **Purpose**: Configure the app’s settings and toggle features (e.g., enable/disable services)

---

### 3. `templates/`

* Contains **Kubernetes manifest templates**
* These files use **Go template syntax** and can contain logic
* Injects values from `values.yaml`

Example (in `deployment.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "mychart.fullname" . }}
spec:
  replicas: 1
  template:
    spec:
      containers:
      - name: postgres
        image: postgres:{{ .Values.postgres.version }}
        env:
        - name: POSTGRES_PASSWORD
          value: {{ .Values.postgres.password }}
```

* 🔸 **Purpose**: Templates for Kubernetes resources, made dynamic and reusable

---

### 4. `_helpers.tpl`

* Defines **template helper functions**
* Used to avoid repetition across templates (e.g., naming conventions)

Example:

```yaml
{{- define "mychart.fullname" -}}
{{ printf "%s-%s" .Release.Name .Chart.Name }}
{{- end }}
```

* 🔸 **Purpose**: Share logic across templates using reusable functions

---

### 5. `charts/`

* Folder for **chart dependencies** (optional)
* Can contain other Helm charts this chart depends on

---

### 6. `.helmignore`

* Works like `.gitignore`
* Lists files to **exclude from packaging** when you run `helm package`

---

## 🔄 How It All Works Together

### When you run `helm install`:

1. \*\*Helm reads \*\***`Chart.yaml`**

   * Verifies name, version, dependencies, etc.

2. \*\*Loads \*\***`values.yaml`**

   * Combines with any user-provided overrides

3. \*\*Scans \*\***`templates/`**

   * Renders *every* file in the `templates/` folder
   * Uses logic (`if`, `range`, etc.) to conditionally include/exclude resources
   * Replaces `{{ .Values.* }}` with values from `values.yaml`

4. **Creates full Kubernetes manifests**

   * Like `kubectl` YAML files, but now fully rendered

5. **Sends them to the Kubernetes API**

   * Application is deployed, updated, or rolled back

---

## 💡 Example: Conditional Logic in Templates

In `service.yaml`:

```yaml
{{- if .Values.service.enabled }}
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  ports:
    - port: {{ .Values.service.port }}
{{- end }}
```

In `values.yaml`:

```yaml
service:
  enabled: false
```

✅ Result: The service **won’t be created** because it’s disabled.

---

## 📌 Summary

| Component      | Purpose                                |
| -------------- | -------------------------------------- |
| `Chart.yaml`   | Metadata and versioning                |
| `values.yaml`  | Configuration values & feature toggles |
| `templates/`   | Dynamic K8s resource files             |
| `_helpers.tpl` | Shared template helpers                |
| `charts/`      | Dependencies                           |
| `.helmignore`  | Files to ignore during packaging       |

---

## 🛠 Commands to Remember

```bash
# Create a new chart
helm create mychart

# Install a chart
helm install myapp ./mychart

# Install with custom values
helm install myapp ./mychart -f myvalues.yaml

# Upgrade a release
helm upgrade myapp ./mychart -f myvalues.yaml

# Uninstall
helm uninstall myapp

# Template preview without installing
helm template mychart
```

---

## ✅ Use Case Example: PostgreSQL

* You want to deploy PostgreSQL with Helm.
* You download or write a chart with templates for:

  * Deployment
  * Service
  * Secret
* You edit `values.yaml` to provide:

  * Username
  * Password
  * Port
* You run `helm install postgres ./my-postgres`
* Helm fills values in templates and deploys PostgreSQL to your cluster

---

---
