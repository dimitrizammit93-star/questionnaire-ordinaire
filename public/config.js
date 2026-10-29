// Questions du questionnaire — modifiables ici sans toucher au reste.
// Types : radio (1 choix), check (plusieurs choix), text, notes (grille 1-5), scale10 (note sur 10), menu (semaine à noter)
// req: 1 = obligatoire · show: condition d'affichage · x: option exclusive (décoche les autres)
// Ne pas changer les "id" une fois les premières réponses reçues.
const prend = repas => R => (R.repas || []).includes(repas);

window.SECTIONS = [
  { titre: "👋 Vous", intro: "Anonyme. Aucun nom, aucune adresse enregistrés.", qs: [
    { id: "cs", t: "Votre centre de secours", type: "radio", req: 1, o: ["Grenelle", "Auteuil", "Issy-les-Moulineaux"] },
    { id: "cat", t: "Catégorie", type: "radio", req: 1, o: ["Militaire du rang", "Sous-officier / officier"] },
    { id: "repas", t: "Les repas que vous prenez à l'ordinaire", type: "check", req: 1, o: ["Petit-déjeuner", "Déjeuner", "Dîner"] }
  ]},
  { id: "notes", titre: "⭐ Votre note actuelle", intro: "1 = très mauvais · 5 = top", qs: [
    { id: "n_pdj", t: "🥐 Petit-déjeuner", type: "notes", show: prend("Petit-déjeuner"), c: ["Qualité", "Quantité"] },
    { id: "n_dej", t: "🍽️ Déjeuner", type: "notes", show: prend("Déjeuner"), c: ["Goût", "Quantité", "Chaud à l'arrivée"] },
    { id: "n_din", t: "🌙 Dîner", type: "notes", show: prend("Dîner"), c: ["Goût", "Quantité", "Chaud à l'arrivée"] }
  ]},
  { titre: "🍝 Quantités", qs: [
    { id: "faim", t: "Vous restez sur votre faim…", type: "radio", o: ["Jamais", "Parfois", "Souvent"] },
    { id: "manque", t: "Ce qui manque le plus dans l'assiette", type: "check", x: "Rien", o: ["🥩 Viande / poisson", "🍚 Féculents", "🥦 Légumes", "🥖 Pain", "🍰 Dessert", "Rien"] },
    { id: "reste", t: "Il en reste assez pour ceux qui rentrent d'inter ?", type: "radio", o: ["Toujours", "Souvent", "Rarement", "Jamais"] },
    { id: "complete", t: "Vous complétez votre repas avec…", type: "check", x: "🙅 Rien", o: ["🥤 La buvette", "🛵 Une commande extérieure", "🥡 Ce que j'apporte de chez moi", "🙅 Rien"] }
  ]},
  { titre: "🚐 Spécial satellites", intro: "Cette étape n'apparaît que pour Auteuil et Issy.", show: R => R.cs && R.cs !== "Grenelle", qs: [
    { id: "sat_heure", t: "Le repas arrive…", type: "radio", o: ["⏰ À l'heure", "🐢 Souvent en retard", "🏃 Trop tôt, il a le temps de refroidir"] },
    { id: "sat_etat", t: "À l'arrivée, il est souvent…", type: "check", x: "✅ Nickel", o: ["🥶 Froid ou tiède", "🏜️ Sec", "🥣 Mélangé / écrasé", "💦 Renversé / abîmé", "✅ Nickel"] },
    { id: "sat_manque", t: "Ce qui manque le plus souvent dans la livraison", type: "check", x: "Rien", o: ["🥖 Pain", "🥫 Sauce", "🥗 Entrée", "🍰 Dessert", "🍴 Couverts / contenants", "Rien"] },
    { id: "sat_qte", t: "La quantité livrée suffit pour tout l'effectif ?", type: "radio", o: ["Toujours", "Souvent", "Rarement", "Jamais"] }
  ]},
  { titre: "🔧 Vos choix", intro: "Un toucher par question, c'est vous qui décidez.", qs: [
    { id: "feculents", t: "Pâtes, riz, semoule, blé : vous en voulez…", type: "radio", o: ["Midi et soir", "Une fois par jour suffit", "Pas forcément tous les jours"] },
    { id: "midisoir", t: "Féculents le midi, légumes le soir : ça vous va ?", type: "radio", o: ["👍 Oui", "👎 Non, féculents aussi le soir", "🤝 Les deux le soir"] },
    { id: "dessert", t: "Côté dessert, vous êtes plutôt…", type: "radio", o: ["🍎 Fruits", "🍰 Pâtisserie / gâteau", "🥛 Yaourt / laitage", "🔄 Un peu de tout"] },
    { id: "entrees", t: "Les entrées, vous les mangez ?", type: "radio", o: ["Toujours", "Parfois", "Rarement"] },
    { id: "raviolis", t: "Des raviolis au menu ?", type: "radio", o: ["😍 Oui", "🤷 Pourquoi pas", "🙅 Non merci"] },
    { id: "dimanche", t: "Dimanche midi, la bavette-frites…", type: "radio", o: ["🥩 On garde !", "🔄 Une semaine sur deux", "❌ On change"] },
    { id: "dimanche_alt", t: "Vous la remplaceriez par quoi ?", type: "text", show: R => R.dimanche && R.dimanche !== "🥩 On garde !" },
    { id: "semaineab", t: "Menus fixes en semaine A / semaine B (vous savez toujours ce qui vous attend) ?", type: "radio", o: ["👍 Oui", "👎 Non, je préfère varier", "🤷 Sans avis"] }
  ]},
  { titre: "🥚 Petit-déjeuner", show: prend("Petit-déjeuner"), qs: [
    { id: "pdj_formule", t: "Une formule « sportive » vous tente ? Fromage blanc, flocons d'avoine, œufs brouillés ou omelette préparés par le garde cuisine.", type: "radio", o: ["💪 Oui, à la place du classique", "➕ Oui, en plus du classique", "🥖 Non, je garde pain-beurre-confiture"] },
    { id: "pdj_manque", t: "Ce qui manque le plus souvent", type: "check", x: "Rien", o: ["Pain / viennoiseries", "Céréales", "Œufs", "Yaourts / fromage blanc", "Fruits", "Jus", "Fromage", "Rien"] }
  ]},
  { id: "menus", titre: "🗓️ Jugez 3 vrais menus", intro: "Touchez un plat : 1 fois = 👍 j'aime · 2 fois = 👎 à retirer · 3 fois = annuler. Pas obligé de tout toucher.", qs: [
    { id: "m37", t: "Semaine du 7 septembre", type: "menu",
      midi: ["Fajitas poulet poivrons", "Escalope de poulet panée", "Salade de pâtes aux lardons", "Spaghettis carbonara", "Chicken burger", "Boulettes de veau sauce tomate", "Steak haché, pommes grenaille"],
      soir: ["Saucisse de Toulouse, lentilles", "Barbecue", "Merguez, poivrons grillés", "Kebab de dinde sauce blanche", "Rôti de porc, courgettes", "Raviolis à l'italienne", "Poisson béarnaise, riz"] },
    { id: "m42", t: "Semaine du 12 octobre", type: "menu",
      midi: ["Spaghettis bolognaise", "Salade de pommes de terre", "Rougail saucisse", "Filet de poulet, pommes rissolées", "Risotto au poulet", "Spaghettis carbonara", "Bavette d'aloyau, grenaille"],
      soir: ["Pilon de poulet, carottes Vichy", "Moussaka, riz", "Boulettes de veau, haricots verts", "Cordon bleu, pennes", "Saucisse de Toulouse, purée", "Côte de porc, haricots verts", "Nuggets, gnocchis"] },
    { id: "m43", t: "Semaine du 19 octobre", type: "menu",
      midi: ["Spaghettis carbonara", "Risotto poulet aux cèpes", "Boulettes de bœuf, riz", "Fish and chips", "Rougail saucisse", "Spaghettis bolognaise", "Filet de poulet, riz"],
      soir: ["Moussaka, riz", "Wrap au poulet", "Saucisse de Toulouse, purée", "Boulettes de veau, semoule", "Rôti de porc, gratin dauphinois", "Poisson bordelaise, sarladaises", "Cuisse de poulet, rissolées"] },
    { id: "choque", t: "Un truc qui vous choque dans ces menus ?", type: "text" }
  ]},
  { titre: "🏁 Dernière ligne droite", qs: [
    { id: "cuisines", t: "Vous voulez voir plus souvent…", type: "check", o: ["🍖 Grillades", "🐟 Poisson", "🥘 Oriental / méditerranéen", "🍜 Asiatique", "🌮 Tex-mex", "🥗 Salades composées", "💪 Plats protéinés sportifs", "🍲 Plats traditionnels"] },
    { id: "theme", t: "Un repas à thème une fois par mois ? Votez", type: "check", x: "🙅 Pas intéressé", o: ["🍔 Burger", "🥘 Couscous", "🍖 Barbecue", "🧀 Raclette", "🍜 Asiatique", "🌮 Tex-mex", "🙅 Pas intéressé"] },
    { id: "chef", t: "👨‍🍳 Chef d'un jour : composez votre menu", type: "multitext", c: ["Entrée", "Plat", "Dessert"] },
    { id: "global", t: "Note globale de l'ordinaire", type: "scale10", req: 1 },
    { id: "priorite", t: "La chose à changer en priorité", type: "text" }
  ]}
];
window.CENTRES = ["Grenelle", "Auteuil", "Issy-les-Moulineaux"];
