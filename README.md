# Portfolio Methagold.sn

Un portfolio professionnel moderne présentant mes services et projets en tant que développeur full-stack.

## Technologies utilisées

- HTML5
- CSS3 (Animations et Flexbox/Grid)
- JavaScript
- Font Awesome pour les icônes
- Google Fonts (Poppins, Open Sans)

## Fonctionnalités

- Design responsive
- Animations fluides
- Sections pour services, projets et témoignages
- Formulaire de contact
- Mode sombre automatique
- Navigation mobile optimisée

## Structure du projet

```
methagold-portfolio/
│
├── index.html
├── about.html
├── projects.html
├── contact.html
│
└── assets/
    ├── style.css
    └── script.js
```

## Installation

1. Clonez le repository
```bash
git clone https://github.com/votre-username/methagold-portfolio.git
```

2. Ouvrez `index.html` dans votre navigateur

## Déploiement

Le site est optimisé pour être déployé sur GitHub Pages ou tout autre hébergeur statique.

## Auteur

- **Methagold** - _Développeur Full Stack_

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Configuration de l'envoi d'emails (EmailJS)

Le formulaire de contact utilise EmailJS (optionnel) pour envoyer directement des emails depuis le front-end. Si vous voulez activer l'envoi sans backend, suivez ces étapes :

1. Créez un compte sur https://www.emailjs.com/ et connectez-vous.
2. Ajoutez un service email (ex: Gmail via OAuth ou un autre fournisseur) et notez le `Service ID`.
3. Créez un template d'email et notez le `Template ID`. Assurez-vous que les champs du template correspondent aux `name` du formulaire (`name`, `email`, `message`).
4. Dans les paramètres du compte, copiez votre `User ID` (parfois appelé Public Key).
5. Ouvrez `contact.html` et remplacez les valeurs dans le formulaire :

```html
<form id="contact-form" data-service-id="VOTRE_SERVICE_ID" data-template-id="VOTRE_TEMPLATE_ID" data-user-id="VOTRE_USER_ID">
```

6. Sauvegardez, committez et poussez. L'envoi utilisera EmailJS si les IDs sont renseignés. Sinon, le formulaire ouvrira le client mail de l'utilisateur en fallback.

Si vous préférez une solution serveur (plus fiable et sans exposer d'IDs côté client), vous pouvez ajouter une fonction serverless (Netlify Functions, Vercel Serverless, ou un petit endpoint Node/PHP) et appeler ce endpoint depuis le formulaire.