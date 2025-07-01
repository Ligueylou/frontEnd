# Intégration Backend-Frontend : Gestion des Utilisateurs

## Vue d'ensemble

Cette documentation décrit l'intégration backend-frontend pour la gestion des utilisateurs dans l'interface d'administration (`/admin/users`).

## Fonctionnalités implémentées

### 1. Récupération des données réelles
- **Avant** : Utilisation de données mockées (statiques)
- **Après** : Connexion directe au backend via l'API service

### 2. Statistiques en temps réel
- Total des utilisateurs (clients + prestataires)
- Nombre de clients
- Nombre de prestataires
- Utilisateurs actifs

### 3. Actions sur les utilisateurs
- **Activation** : Réactivation des utilisateurs inactifs
- **Suppression** : Suppression définitive des utilisateurs
- **Filtrage** : Par type (Client, Prestataire, Admin) et statut (Actif/Inactif)
- **Recherche** : Par nom, email ou téléphone

## Modifications apportées

### Frontend (`frontEnd/app/admin/users/page.tsx`)

#### États ajoutés
```typescript
const [users, setUsers] = useState<Array<Client | Prestataire>>([])
const [loading, setLoading] = useState(true)
const [actionLoading, setActionLoading] = useState<number | null>(null)
const [stats, setStats] = useState<UserStats | null>(null)
```

#### Fonctions principales
- `loadUsers()` : Charge tous les utilisateurs depuis le backend
- `loadStats()` : Calcule les statistiques en temps réel
- `handleActivateUser()` : Active un utilisateur inactif
- `handleDeleteUser()` : Supprime un utilisateur

#### Interface utilisateur
- Indicateurs de chargement
- Messages de confirmation pour les actions destructives
- Notifications toast pour le feedback utilisateur
- Filtres dynamiques basés sur les données réelles

### API Service (`frontEnd/app/lib/api.ts`)

#### Nouvelles interfaces
```typescript
export interface Client {
  id: number
  nomComplet: string
  email: string
  telephone: string
  role: string
  actif: boolean
  adresse?: Adresse
}

export interface UserStats {
  totalClients: number
  totalPrestataires: number
  activeClients: number
  activePrestataires: number
  inactiveClients: number
  inactivePrestataires: number
}
```

#### Nouvelles méthodes
- `getAllClients()` : Récupère tous les clients
- `getClientById()` : Récupère un client par ID
- `deleteClient()` : Supprime un client
- `activateClient()` : Active un client
- `getUserStats()` : Calcule les statistiques globales
- `getAllUsers()` : Combine clients et prestataires

### Backend

#### ClientController (`backend/src/main/java/master/ipld/ligueylu/controller/ClientController.java`)

Nouveaux endpoints ajoutés :
- `GET /clients/activate/{id}` : Active un client
- `DELETE /clients/{id}` : Supprime un client

#### ClientService (`backend/src/main/java/master/ipld/ligueylu/service/client/ClientService.java`)

Nouvelles méthodes :
- `activateClient(Long id)` : Active un client
- `deleteClient(Long id)` : Supprime un client

## Utilisation

### Accès à la page
1. Connectez-vous en tant qu'administrateur
2. Naviguez vers `/admin/users`
3. La page se charge automatiquement avec les données du backend

### Actions disponibles
1. **Recherche** : Utilisez la barre de recherche pour filtrer par nom, email ou téléphone
2. **Filtrage** : Utilisez les filtres pour afficher par type ou statut
3. **Activation** : Cliquez sur "Activer" pour un utilisateur inactif
4. **Suppression** : Cliquez sur "Supprimer" (confirmation requise)
5. **Actualisation** : Cliquez sur "Actualiser" pour recharger les données

## Gestion des erreurs

### Frontend
- Messages d'erreur explicites via toast notifications
- États de chargement pour éviter les actions multiples
- Gestion des erreurs réseau et serveur

### Backend
- Gestion des exceptions avec messages appropriés
- Codes de statut HTTP corrects
- Validation des données d'entrée

## Sécurité

- Authentification requise pour tous les endpoints
- Autorisation basée sur les rôles (ADMIN uniquement)
- Validation des données côté serveur
- Protection contre les injections SQL (via JPA)

## Performance

- Chargement asynchrone des données
- Mise en cache des données côté client
- Requêtes optimisées côté serveur
- Pagination possible pour de grandes listes (à implémenter)

## Tests recommandés

1. **Test de chargement** : Vérifier que les données se chargent correctement
2. **Test de filtrage** : Tester tous les filtres et la recherche
3. **Test d'actions** : Tester l'activation et la suppression
4. **Test d'erreurs** : Vérifier la gestion des erreurs réseau
5. **Test de sécurité** : Vérifier l'accès sans authentification

## Améliorations futures

1. **Pagination** : Pour gérer de grandes listes d'utilisateurs
2. **Export** : Fonctionnalité d'export des données
3. **Bulk actions** : Actions en lot sur plusieurs utilisateurs
4. **Historique** : Log des actions administratives
5. **Notifications** : Notifications en temps réel des changements 