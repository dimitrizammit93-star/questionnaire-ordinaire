// Questions du questionnaire — modifiables ici sans toucher au reste.
// Types : radio (1 choix), check (plusieurs choix), text, notes (grille 1-5), scale10 (note sur 10)
// req: 1 = obligatoire · show: affiché seulement si ce repas est coché · x: option exclusive (décoche les autres)
window.SECTIONS = [
  { titre: "1. Vous", qs: [
    { id: "cs", t: "Votre centre de secours", type: "radio", req: 1, o: ["Grenelle", "Auteuil", "Issy-les-Moulineaux"] },
    { id: "cat", t: "Catégorie", type: "radio", req: 1, o: ["Militaire du rang", "Sous-officier / officier"] },
    { id: "freq", t: "Vous mangez à l'ordinaire…", type: "radio", req: 1, o: ["À chaque garde", "Souvent", "Rarement"] },
    { id: "repas", t: "Les repas que vous prenez", type: "check", req: 1, o: ["Petit-déjeuner", "Déjeuner", "Dîner"] }
  ]},
  { id: "notes", titre: "2. Notez les repas", intro: "1 = très mauvais · 5 = très bien", qs: [
    { id: "n_pdj", t: "Petit-déjeuner", type: "notes", show: "Petit-déjeuner", c: ["Qualité", "Quantité", "Variété"] },
    { id: "n_dej", t: "Déjeuner", type: "notes", show: "Déjeuner", c: ["Goût", "Quantité", "Température", "Variété"] },
    { id: "n_din", t: "Dîner", type: "notes", show: "Dîner", c: ["Goût", "Quantité", "Température", "Variété"] }
  ]},
  { titre: "3. Quantité et service", qs: [
    { id: "faim", t: "À quel repas restez-vous le plus souvent sur votre faim ?", type: "radio", o: ["Petit-déjeuner", "Déjeuner", "Dîner", "Aucun"] },
    { id: "manque", t: "Ce qui manque le plus souvent dans l'assiette", type: "check", x: "Rien", o: ["Viande / poisson", "Féculents", "Légumes", "Pain", "Dessert", "Sauce", "Rien"] },
    { id: "chaud", t: "Les plats chauds sont-ils encore chauds au moment de manger ?", type: "radio", o: ["Toujours", "Souvent", "Rarement", "Jamais"] },
    { id: "reste", t: "Reste-t-il assez à manger pour les derniers servis (retour d'inter, etc.) ?", type: "radio", o: ["Toujours", "Souvent", "Rarement", "Jamais"] }
  ]},
  { titre: "4. Vos envies", qs: [
    { id: "preferes", t: "Vos 3 plats préférés, à voir plus souvent", type: "text" },
    { id: "retirer", t: "Les plats à retirer des menus", type: "text" },
    { id: "cuisines", t: "Ce que vous aimeriez manger plus souvent", type: "check", o: ["Cuisine traditionnelle", "Méditerranéenne / orientale", "Asiatique", "Tex-mex", "Grillades", "Poisson", "Plats protéinés sportifs", "Salades composées"] },
    { id: "regimes", t: "Vos besoins alimentaires", type: "check", x: "Aucun", o: ["Halal", "Sans porc", "Végétarien", "Allergie / intolérance", "Aucun"] },
    { id: "sportif", t: "Une option « sportif » (plus de protéines, moins gras) vous intéresserait ?", type: "radio", o: ["Oui", "Peut-être", "Non"] }
  ]},
  { titre: "5. Petit-déjeuner", qs: [
    { id: "pdj_manque", t: "Ce qui manque le plus souvent", type: "check", x: "Rien", o: ["Pain / viennoiseries", "Céréales", "Œufs", "Yaourts / laitages", "Fruits", "Jus", "Fromage", "Beurre / confiture / pâte à tartiner", "Rien"] },
    { id: "rupture", t: "Des produits sont-ils en rupture ?", type: "radio", o: ["Jamais", "Parfois", "Souvent"] }
  ]},
  { titre: "6. En résumé", qs: [
    { id: "global", t: "Note globale de l'ordinaire (sur 10)", type: "scale10", req: 1 },
    { id: "priorite", t: "La chose à changer en priorité", type: "text" },
    { id: "commentaire", t: "Autre remarque", type: "text" }
  ]}
];
window.CENTRES = ["Grenelle", "Auteuil", "Issy-les-Moulineaux"];
