apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    path: /exports
    server: 52.66.197.168
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: nfs

<!-- =========================== -->

apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    path: /exports
    server: 52.66.197.168
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: nfs

<!-- =========================== -->

This configuration sets up persistent storage for a MongoDB container in Kubernetes using an external NFS server. First, the PersistentVolume (PV) defines access to a remote 10GiB NFS share located at /exports on the DigitalOcean VM with IP 52.66.197.168. Then, the PersistentVolumeClaim (PVC) named nfs-pvc requests that same storage, matching the PV by its size, access mode (ReadWriteMany), and storage class (nfs). Finally, a Pod named mongo-pod runs a MongoDB container (mongo:4.4) and mounts the storage path /data/db inside the container by referring to the PVC through a volume named nfs-volume. This setup ensures that MongoDB stores its data directly on the external NFS storage, making the data persistent even if the pod is deleted or restarted.