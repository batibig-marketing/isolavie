# IsolaVie — Site officiel

Site vitrine pour IsolaVie, entreprise familiale spécialisée dans l'isolation par l'extérieur et le ravalement de façade en Loire-Atlantique.

## Structure

- `index.html` — page d'accueil (entreprise, équipe, engagements, certifications, recrutement)
- `techniques.html` — techniques ITE et ravalement
- `particuliers.html` — offre particuliers
- `professionnels.html` — offre professionnels
- `contact.html` — formulaire de contact et coordonnées
- `mentions-legales.html`
- `css/styles.css` — design system
- `js/main.js` — interactions
- `public/images/` — visuels

## Développement local

Aucune build. Servez le dossier avec n'importe quel serveur statique :

```bash
python3 -m http.server 8000
```

## Déploiement

Déployé sur Vercel — chaque push sur `main` déclenche un déploiement automatique.
