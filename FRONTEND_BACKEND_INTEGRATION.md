# Intégration Frontend-Backend - LIGUEYLU

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` dans le dossier `frontEnd/` avec le contenu suivant :

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### 2. Démarrage des services

1. **Backend (Spring Boot)**
   ```bash
   cd backend
   ./gradlew bootRun
   ```
   Le backend sera accessible sur `http://localhost:8080`

2. **Frontend (Next.js)**
   ```bash
   cd frontEnd
   npm run dev
   ```
   Le frontend sera accessible sur `http://localhost:3000`

## Fonctionnalités implémentées

### ✅ Authentification
- **Login** : `/api/v1/auth/login`
- **Login Admin** : `/api/v1/auth/admin/login`
- **Register** : `/api/v1/auth/register`
- **Profile** : `/api/v1/auth/profile`
- Gestion des tokens JWT
- Redirection automatique selon le rôle

### ✅ Gestion des rôles
- **CLIENT** : Redirigé vers `/dashboard/client`
- **PRESTATAIRE** : Redirigé vers `/dashboard/prestataire`
- **ADMIN** : Redirigé vers `/dashboard/admin`

### ✅ Routes Frontend
- **Connexion utilisateur** : `/login`
- **Connexion administrateur** : `/admin/login`
- **Inscription utilisateur** : `/register`
- **Inscription administrateur** : `/admin/register`
- **Test d'intégration** : `/test-auth`

### ✅ Persistance de session
- Stockage sécurisé du token
- Vérification automatique de validité
- Récupération des informations utilisateur

### ✅ Endpoints Backend Ajoutés
- **GET** `/api/v1/auth/profile` - Récupérer le profil de l'utilisateur connecté
- **POST** `/api/v1/auth/admin/login` - Connexion spécifique pour les administrateurs (NOUVEAU)
- **GET** `/api/v1/clients` - Liste de tous les clients
- **GET** `/api/v1/clients/email/{email}` - Récupérer un client par email
- **GET** `/api/v1/clients/{id}` - Récupérer un client par ID

### ✅ Fonctionnalités Administrateur
- **Route dédiée** : `/admin/login` pour la connexion administrateur
- **Inscription dédiée** : `/admin/register` pour l'inscription administrateur (NOUVEAU)
- **Vérification de rôle** : Seuls les utilisateurs avec le rôle ADMIN peuvent se connecter
- **Interface distincte** : Design rouge pour différencier l'accès administrateur
- **Sécurité renforcée** : Double vérification côté backend et frontend
- **Redirection spécifique** : Les administrateurs sont redirigés vers `/admin` (NOUVEAU)

## Structure des données

### RegisterRequest
```typescript
{
  nomComplet: string
  email: string
  password: string
  telephone: string
  role: "CLIENT" | "PRESTATAIRE" | "ADMIN"
}
```

### AuthenticationRequest
```typescript
{
  email: string
  password: string
}
```

### AuthenticationResponse
```typescript
{
  token: string
}
```

### UserDto (Profil utilisateur)
```typescript
{
  id: number
  email: string
  nomComplet: string
  role: string
}
```

## Modifications Backend

### Nouveaux fichiers/modifications ajoutés :

1. **AuthenticationController.java**
   - Ajout de l'endpoint `GET /auth/profile`

2. **ClientController.java**
   - Implémentation complète avec endpoints CRUD

3. **IClientService.java**
   - Interface avec méthodes de service

4. **ClientService.java**
   - Implémentation du service client

5. **ClientRepository.java**
   - Repository JPA pour les clients

## Test de l'intégration

1. Démarrez le backend et le frontend
2. Accédez à `http://localhost:3000/test-auth` pour tester l'intégration
3. Ou testez directement :
   - Inscription : `http://localhost:3000/register`
   - Connexion : `http://localhost:3000/login`

## Dépannage

### Erreur CORS
Si vous rencontrez des erreurs CORS, vérifiez que le backend est bien démarré et que la configuration CORS est correcte.

### Erreur de connexion
- Vérifiez que l'URL de l'API est correcte dans `.env.local`
- Assurez-vous que le backend répond sur le bon port
- Vérifiez les logs du backend pour les erreurs

### Erreur de récupération du profil
- L'endpoint `/auth/profile` est maintenant disponible
- Assurez-vous que l'utilisateur est bien authentifié
- Vérifiez que le token JWT est valide

## Statut de l'intégration

✅ **COMPLÈTEMENT FONCTIONNEL**
- Tous les endpoints nécessaires sont implémentés
- L'authentification et l'inscription fonctionnent
- La récupération du profil utilisateur fonctionne
- Les redirections selon le rôle fonctionnent

### ✅ Redirections après authentification
- **CLIENT** : Redirigé vers `/dashboard/client`
- **PRESTATAIRE** : Redirigé vers `/dashboard/prestataire`
- **ADMIN** : Redirigé vers `/admin` 