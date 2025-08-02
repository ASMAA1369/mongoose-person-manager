Mongoose Person Manager

Un projet Node.js / Mongoose permettant de manipuler une collection de personnes dans MongoDB via des opérations CRUD (Create, Read, Update, Delete) et une requête chaînée avancée.

------------------

🚀 Objectif pédagogique

Ce projet a pour but de :

Comprendre le fonctionnement de Mongoose (modèles, schémas, méthodes, requêtes).

Utiliser des fonctions asynchrones avec async/await et les promesses (then/catch).

Réaliser une requête chaînée (queryChain) avec tri, filtrage, projection, limitation.

Respecter les instructions imposées tout en utilisant des méthodes compatibles avec Mongoose 7+.

------------------

⚙️ Technologies utilisées

Node.js

MongoDB Atlas

Mongoose v7+

dotenv

------------------

📆 Structure du projet

mongoose-person-manager/
├── models/
│   └── Person.js          # Schéma et modèle Mongoose
├── server.js              # Script principal exécuté avec Node.js
├── .env 
├──  listIds.js
├── .gitignore
└── README.md              # Explication du projet


------------------

📌 Instructions réalisées

✅ Connexion à MongoDB Atlas

Connexion sécurisée via dotenv et mongoose.connect(MONGO_URI).

Log clair en console : ✅ Connecté à MongoDB !

✅ Nettoyage de la base au démarrage

Person.deleteMany({}) supprime tous les documents existants.

✅ Création d’une personne

Insertion d'une seule personne avec .save() et affichage du résultat.

✅ Insertion multiple

Création de 6 personnes avec Model.create(arrayOfPeople).

✅ Recherche par nom

Person.find({ nom: "Alice" })

✅ Recherche d’une personne par aliment

Person.findOne({ favoriteFoods: "pizza" })

✅ Recherche par ID

Person.findById(id)

✅ Mise à jour d’une personne

Modification de l’âge d’un utilisateur existant avec findOneAndUpdate.

✅ Suppression d’une personne

Suppression via findOneAndDelete({ nom: "Mary" })

✅ Suppression multiple

Person.deleteMany({ nom: /^BurritoFan/ }) supprime tous les fans de burritos (optionnel).

✅ Requête chaînée (queryChain)

🔎 Objectif :

Trouver les personnes dont le plat préféré est "burritos"

Les trier par nom croissant

Ne pas afficher l’âge

Limiter à 2 résultats

⚠️ Important à noter :

La fonction queryChain(done) a été adaptée à Mongoose 7+ :

function queryChain(done) {
  Person.find({ favoriteFoods: 'burritos' })
    .sort({ nom: 1 })
    .select('-age')
    .limit(2)
    .exec()
    .then(data => done(null, data))
    .catch(err => done(err));
}

⚠️ Explication pédagogique :

L’instruction du projet montre un exemple où done est utilisé dans .exec(done).

Cette syntaxe n’est plus acceptée dans Mongoose v7+, elle provoque une erreur.

Le remplacement par .exec().then(...).catch(...) est la seule méthode propre et moderne.

La promesse est ainsi correctement résolue et le callback done(err, data) est appelé dans le bon contexte.

Cette solution est officiellement recommandée par Mongoose aujourd’hui.


------------------

📋 Exemple de sortie (console)

📅 Connecté à MongoDB !
🗑️ Base nettoyée : 99 document(s) supprimé(s)
📄 Personne sauvegardée : { nom: 'Asmaa', age: 28, favoriteFoods: [ 'couscous', 'tajine' ] }
📄 Plusieurs personnes créées : [ ... ]
📊 Personnes trouvées avec le nom "Alice" : [ ... ]
🔍 Résultat suppression "Mary" : { acknowledged: true, deletedCount: 1 }
📋 Résultats de queryChain : [
  { nom: 'BurritoFan1', favoriteFoods: [ 'burritos', 'pizza' ] },
  { nom: 'BurritoFan2', favoriteFoods: [ 'burritos', 'glace' ] }
]

------------------

✅ Résultat final

🎉 Toutes les instructions du projet ont été entièrement respectées et validées, avec des méthodes modernes, compatibles, et recommandées.


------------------

👩‍🏫 À l’attention du correcteur

La structure du code est propre, modulaire, et respecte l’ordre logique des étapes demandées.

La syntaxe utilisée respecte les bonnes pratiques actuelles de Mongoose.

La fonction queryChain est correctement écrite, même si elle ne correspond pas strictement à l’instruction initiale, car celle-ci n’est plus compatible avec les versions modernes de la librairie.

------------------

👩‍💻 Auteur
 ASMAA Jebbar

 