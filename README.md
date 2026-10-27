# Questionnaire ordinaire — 6e compagnie

Questionnaire anonyme sur les repas (Grenelle, Auteuil, Issy-les-Moulineaux), hébergé sur Cloudflare Workers comme la formation PMS.

## Pages
| Adresse | Pour qui | Rôle |
|---|---|---|
| `/` | Tout le monde | Le questionnaire (6 étapes, mobile) |
| `/affiche.html` | Toi | Affiche A4 avec QR code, à imprimer |
| `/stats.html` | Bureau RHL | Résultats protégés par code : comparatif par CS, graphiques, réponses libres, export CSV (Excel) |

## Mise en ligne (une seule fois, ~10 min)
1. Pousser ce dossier sur un nouveau dépôt GitHub (ex. `questionnaire-ordinaire`).
2. Dans un terminal, dans le dossier :
   ```
   npx wrangler login
   npx wrangler kv namespace create REPONSES
   ```
   Copier l'`id` affiché dans `wrangler.toml` à la place de `A_REMPLACER_PAR_L_ID_KV`.
3. Choisir le code d'accès aux résultats :
   ```
   npx wrangler secret put ADMIN_TOKEN
   ```
4. Déployer : `npx wrangler deploy` (ou relier le dépôt dans Cloudflare comme pour la formation PMS).
5. Ouvrir `/affiche.html`, imprimer, afficher dans les trois CS. Le QR code pointe automatiquement vers la bonne adresse.

## Modifier les questions
Tout est dans `public/config.js`. Ne pas changer les `id` une fois les premières réponses reçues, sinon les stats se mélangent.

## Anonymat
Aucune IP, aucun nom, aucun identifiant n'est enregistré : seulement les réponses et la date. Un téléphone qui a déjà répondu voit un message « déjà répondu » (contournable volontairement, pour les tablettes partagées).
