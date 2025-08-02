// Charge les variables d'environnement depuis un fichier .env (notamment MONGO_URI)
require('dotenv').config();

// Importe Mongoose pour gérer la base de données MongoDB
const mongoose = require('mongoose');

// Importe le modèle Person défini dans models/Person.js
const Person = require('./models/Person');

// Connexion à la base MongoDB en utilisant la variable MONGO_URI du fichier .env
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connecté à MongoDB !');

    // Récupère toutes les personnes dans la collection Person
    const allPeople = await Person.find({});

    // Affiche le nom et l'ID de chaque personne trouvée
    allPeople.forEach(person => {
      console.log(`Nom: ${person.nom} - ID: ${person._id}`);
    });

    // Ferme la connexion à la base de données une fois l’opération terminée
    mongoose.connection.close();
  })
  .catch(err => {
    // Gère les erreurs de connexion
    console.error('❌ Erreur de connexion :', err);
  });
