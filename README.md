# 📘 Documentation : Déploiement du projet ToDo App (React + NestJS + MySQL)

## 📁 Structure du projet

```
project-root/
├── backend/
│   ├── todo-list-backend/         # Code NestJS + Prisma
│   └── Dockerfile                 # Backend image builder
├── frontend/
│   ├── todo-list-frontend/        # Code React + Ant Design
│   └── Dockerfile                 # Frontend image builder
├── k8s/                           # Fichiers de déploiement Kubernetes
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── mysql-deployment.yaml
│   ├── mysql-service.yaml
│   ├── configmap.yaml
│   ├── secrets.yaml
│   └── pvc.yaml
```

---

## 🚀 1. Docker : Builder et Pusher les images

### 🔨 Backend (NestJS)
```bash
cd backend
docker build -t jxien/todo-backend:latest .
docker push jxien/todo-backend:latest
```

### 🎨 Frontend (React)
```bash
cd frontend
docker build -t jxien/todo-frontend:latest .
docker push jxien/todo-frontend:latest
```

> ⚠️ Change `jxien` si tu utilises un autre nom Docker Hub.

---

## 🧠 2. Variables d’environnement (.env)

### 📄 Backend (`backend/todo-list-backend/.env`)
```env
DATABASE_URL="mysql://todo_user:user123@mysql:3306/tododb"
PORT=3001
FRONTEND_URL=http://localhost:3000/
```

### 📄 Frontend (`frontend/todo-list-frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:30001/
PORT=3005
```

---

## ☸️ 3. Kubernetes : Commandes utiles

### 📦 Déployer tout
```bash
kubectl apply -f k8s/ -n todo-app
```

### 💥 Supprimer tout
```bash
kubectl delete -f k8s/ -n todo-app
```

> ou supprimer le namespace complet :
```bash
kubectl delete namespace todo-app
```

### 🔍 Voir les pods
```bash
kubectl get pods -n todo-app
```

### 🔎 Voir les services et les ports exposés
```bash
kubectl get svc -n todo-app
```

### 📂 Voir les déploiements
```bash
kubectl get deployments -n todo-app
```

### 🔁 Redémarrer un déploiement
```bash
kubectl rollout restart deployment backend -n todo-app
kubectl rollout restart deployment frontend -n todo-app
```

### 📄 Logs d’un pod
```bash
kubectl logs <nom-du-pod> -n todo-app
kubectl logs -f deploy/backend -n todo-app
```

### 🛑 Supprimer un pod (il sera recréé automatiquement)
```bash
kubectl delete pod <nom> -n todo-app
```

---

## 🌐 4. Accéder à l’application

### 🖼 Frontend :
```
http://localhost:30080
```

### 🔌 Backend API :
```
http://localhost:30001
```

---

## 🧹 5. Nettoyage Docker

### Supprimer les conteneurs Docker hors Kubernetes
```bash
docker rm -f todo-backend todo-mysql todo-frontend
```

### Supprimer le volume MySQL local
```bash
docker volume rm projet-micro-services_mysql_data
```

---

## 💡 Astuces

### Voir tous les namespaces
```bash
kubectl get namespaces
```

### Voir les Secrets en clair
```bash
kubectl get secret backend-secret -n todo-app -o yaml
```

### Test direct de l'API backend
```bash
curl http://localhost:30001/tasks
```