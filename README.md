# 📦 Guide d'installation et de déploiement – Projet ToDo App (React + NestJS + MySQL + Kubernetes)

---

## 🛠️ 1. Prérequis techniques

- Node.js (v18 ou supérieur)
- Docker & Docker Hub
- Docker Compose (optionnel pour dev local)
- Kubernetes (via Docker Desktop ou Minikube)
- `kubectl` installé et connecté à ton cluster
- Un éditeur de code (ex: VS Code)

---

## 🚧 2. Structure du projet

```
project-root/
├── backend/
│   ├── todo-list-backend/         # NestJS + Prisma
│   └── Dockerfile
├── frontend/
│   ├── todo-list-frontend/        # React + Ant Design
│   └── Dockerfile
├── k8s/                           # YAML Kubernetes
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── mysql-deployment.yaml
│   ├── mysql-service.yaml
│   ├── configmap.yaml
│   ├── secrets.yaml
│   └── mysql-pvc.yaml
```

---

## 💻 3. Lancement local en mode développement

### 🔹 Backend NestJS (avec Prisma)
```bash
cd backend/todo-list-backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

### 🔹 Frontend React
```bash
cd frontend/todo-list-frontend
npm install
REACT_APP_API_URL=http://localhost:3000 npm start
```

> L’API sera disponible sur `http://localhost:3000`, le frontend sur `http://localhost:3001`.

---

## 🐳 4. Dockerisation du projet

### 📦 Backend (dans `backend/`)
```bash
docker build -t <dockerhub_user>/todo-backend:latest .
docker push <dockerhub_user>/todo-backend:latest
```

### 📦 Frontend (dans `frontend/`)
```bash
docker build -t <dockerhub_user>/todo-frontend:latest .
docker push <dockerhub_user>/todo-frontend:latest
```

> ⚠️ Change `<dockerhub_user>` par ton identifiant Docker Hub.

---

## ⚙️ 5. Déploiement avec Kubernetes

### 📁 Déployer tous les fichiers YAML dans le namespace `todo-app` :
```bash
kubectl create namespace todo-app
kubectl apply -f k8s/ -n todo-app
```

### 🌐 Accès aux services exposés
- **Frontend** : http://localhost:30080
- **Backend API** : http://localhost:30001

> Ces ports sont définis dans les `Service` de type `NodePort`.

---

## 🔄 6. Modifier le code source et redéployer

### 🧑‍💻 Étapes pour modifier le code

1. Modifie les fichiers source dans `todo-list-backend/` ou `todo-list-frontend/`
2. Rebuild l’image Docker correspondante :
   ```bash
   docker build -t <user>/todo-backend:latest .     # ou todo-frontend
   docker push <user>/todo-backend:latest
   ```
3. Redéploie avec Kubernetes :
   ```bash
   kubectl rollout restart deployment backend -n todo-app   # ou frontend
   ```

### 📦 Prisma : re-pousser le schéma si modifié
```bash
npx prisma generate
npx prisma db push
```

---

## ⚙️ 7. Paramètres de configuration importants

### 📄 Backend – `.env`
```env
DATABASE_URL="mysql://todo_user:user123@mysql:3306/tododb"
PORT=3000
```

### 📄 Frontend – `.env`
```env
REACT_APP_API_URL=http://localhost:30001
```

> En production, utilisez l'adresse du service backend exposé via `NodePort` ou `LoadBalancer`.

---

## 🔐 8. Secrets & ConfigMaps

### 🔑 Secrets (`secrets.yaml`)
Contient les mots de passe encodés en base64 :
- `MYSQL_PASSWORD`
- `DATABASE_URL` pour le backend

### ⚙️ ConfigMap (`configmap.yaml`)
Contient :
- `MYSQL_DATABASE`
- `MYSQL_USER`

---

## 📊 9. Surveillance et gestion

### Voir les pods, services, logs :
```bash
kubectl get pods -n todo-app
kubectl get svc -n todo-app
kubectl logs deploy/backend -n todo-app
kubectl logs deploy/frontend -n todo-app
```

### Redémarrer un service :
```bash
kubectl rollout restart deployment backend -n todo-app
```

### Supprimer les ressources :
```bash
kubectl delete -f k8s/ -n todo-app
```

---

## 📌 10. Notes supplémentaires

- Utilise des `NodePort` en local, mais préfère des `Ingress` ou `LoadBalancer` en cloud.
- Pour test local, tu peux aussi utiliser `docker-compose` si nécessaire.
- Garde `.env` et `.yaml` bien synchronisés entre les environnements.

---