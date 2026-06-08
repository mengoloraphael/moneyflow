# MoneyFlow - Gestion Financière Personnelle 💹

Application web progressive (PWA) pour gérer votre budget, vos transactions et votre portefeuille de trading en temps réel.

## Fonctionnalités

✨ **Dashboard** - Vue d'ensemble de vos finances avec statistiques en temps réel
💳 **Transactions** - Gestion complète de vos transactions manuelles et automatiques
📈 **Trading** - Suivi de votre portefeuille (Bitcoin, Ethereum, Actions)
🧠 **Budget IA** - Conseils financiers personnalisés avec Claude AI
⚙️ **Paramètres** - Configuration des synchronisations et des préférences

## Installation & Déploiement

### Prérequis
- Node.js >= 16
- npm ou yarn

### Installation locale

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Déploiement sur GitHub Pages

```bash
# Build et déployer
npm run deploy
```

L'app sera disponible sur : `https://mengoloraphael.github.io/moneyflow`

## Architecture

- **React 18** - Framework UI
- **Vite** - Build tool
- **PWA (Progressive Web App)** - Installation mobile native
- **Service Worker** - Fonctionnement hors ligne
- **Tailwind CSS** - Design system

## Structure du projet

```
moneyflow/
├── src/
│   ├── App.jsx          # Application principale
│   └── main.jsx         # Point d'entrée React
├── public/
│   ├── manifest.json    # Manifest PWA
│   └── service-worker.js # Service Worker pour offline
├── index.html           # HTML principal
├── vite.config.js       # Configuration Vite
└── package.json         # Dépendances
```

## Utilisation Mobile

### Installation sur Android
1. Ouvrez https://mengoloraphael.github.io/moneyflow sur Chrome/Firefox
2. Cliquez sur le menu (⋮) → "Installer l'application"
3. L'app s'installe comme une vraie application native

### Installation sur iOS
1. Ouvrez Safari
2. Cliquez sur Partager → "Sur l'écran d'accueil"

## Fonctionnement Hors Ligne

L'app stocke automatiquement les données en cache grâce au Service Worker. Vous pouvez :
- Consulter vos transactions
- Voir votre dashboard
- Ajouter des transactions (synchronisées au retour en ligne)

## Variables d'environnement

Pour utiliser l'API Claude (Budget IA) :

```
VITE_ANTHROPIC_API_KEY=votre_clé_api
```

## License

MIT

---

Créé avec ❤️ pour une meilleure gestion financière personnelle.
