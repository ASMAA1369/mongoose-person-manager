// Import de mongoose
const mongoose = require('mongoose');

// Définition du schéma pour une personne
const personSchema = new mongoose.Schema({
  nom: { type: String, required: true },      // ✅ Champ "nom" obligatoire (type string)
  age: Number,                                // ✅ Champ "age" optionnel (type number)
  favoriteFoods: [String]                     // ✅ Champ "favoriteFoods" est un tableau de strings
});

// Création du modèle basé sur le schéma
const Person = mongoose.model('Person', personSchema);  // ✅ Modèle "Person" basé sur ce schéma

// Export du modèle pour l'utiliser ailleurs
module.exports = Person;  // ✅ Export correct du modèle
