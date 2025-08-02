require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/Person');

// ✅ Fonction pour créer une personne unique
async function createPerson() {
  try {
    const personne = new Person({
      nom: 'Asmaa',
      age: 28,
      favoriteFoods: ['couscous', 'tajine']
    });
    const savedPerson = await personne.save();
    console.log('✅ Personne sauvegardée :', savedPerson);
  } catch (err) {
    console.error('❌ Erreur lors de la sauvegarde :', err);
  }
}

// ✅ Fonction pour créer plusieurs personnes à la fois
async function createManyPeople() {
  const arrayOfPeople = [
    { nom: 'Alice', age: 25, favoriteFoods: ['salade', 'pâtes'] },
    { nom: 'Bob', age: 30, favoriteFoods: ['pizza', 'glace'] },
    { nom: 'Charlie', age: 35, favoriteFoods: ['sushi', 'ramen'] },
    { nom: 'Mary', age: 27, favoriteFoods: ['pâtes', 'chocolat'] },
    { nom: 'BurritoFan1', age: 40, favoriteFoods: ['burritos', 'pizza'] },
    { nom: 'BurritoFan2', age: 22, favoriteFoods: ['burritos', 'glace'] }
  ];

  try {
    const createdPeople = await Person.create(arrayOfPeople);
    console.log('✅ Plusieurs personnes créées :', createdPeople);
  } catch (err) {
    console.error('❌ Erreur lors de la création multiple :', err);
  }
}

// ✅ Recherche des personnes par nom
async function findPeopleByName(personName) {
  try {
    const people = await Person.find({ nom: personName });
    console.log(`✅ Personnes trouvées avec le nom "${personName}" :`, people);
  } catch (err) {
    console.error('❌ Erreur lors de la recherche par nom :', err);
  }
}

// ✅ Recherche d'une personne qui aime un aliment
async function findOneByFood(food) {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log(`✅ Personne trouvée qui aime "${food}" :`, person);
  } catch (err) {
    console.error('❌ Erreur lors de la recherche par aliment :', err);
  }
}

// ✅ Trouve par ID, modifie, puis sauvegarde
async function findEditThenSave(personId) {
  try {
    const person = await Person.findById(personId);
    if (!person) return console.log('❌ Personne non trouvée pour mise à jour');

    // Optionnel : éviter doublons "hamburger"
    if (!person.favoriteFoods.includes('hamburger')) {
      person.favoriteFoods.push('hamburger');
    }

    const updated = await person.save();
    console.log('✅ Personne mise à jour :', updated);
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour :', err);
  }
}

// ✅ Met à jour l'âge avec findOneAndUpdate
async function findAndUpdate(personName) {
  try {
    const updated = await Person.findOneAndUpdate(
      { nom: personName },
      { age: 20 },
      { new: true }
    );
    if (!updated) return console.log(`❌ Aucun "${personName}" trouvé pour mise à jour`);
    console.log('✅ Personne mise à jour :', updated);
  } catch (err) {
    console.error('❌ Erreur de mise à jour :', err);
  }
}

// ✅ Supprime une personne par ID
async function removeById(personId) {
  try {
    const removed = await Person.findByIdAndDelete(personId);
    if (!removed) return console.log(`❌ Aucune personne trouvée avec l'ID : ${personId}`);
    console.log('✅ Personne supprimée :', removed);
  } catch (err) {
    console.error('❌ Erreur de suppression :', err);
  }
}

// ✅ Supprime toutes les personnes nommées "Mary"
function removeManyPeople(done) {
  Person.deleteMany({ nom: 'Mary' })
    .then(result => {
      console.log('✅ Résultat suppression "Mary" :', result);
      done(null, result);
    })
    .catch(err => done(err));
}

// ✅ Recherche en chaîne : trouve les amateurs de burritos, triés, limités, sans leur âge
function queryChain(done) {
  Person.find({ favoriteFoods: 'burritos' })   // filtre par aliment
    .sort({ nom: 1 })                         // tri par nom
    .limit(2)                                // limite à 2 résultats  
    .select('-age')                         // exclut le champ "age"
    .exec()
    .then(data => done(null, data))
    .catch(err => done(err));
}

// ✅ Fonction pour vider la base avant d’insérer les nouvelles données
async function resetDatabase() {
  try {
    const result = await Person.deleteMany({});
    console.log(`🗑️ Base nettoyée : ${result.deletedCount} document(s) supprimé(s)`);
  } catch (err) {
    console.error('❌ Erreur lors du nettoyage de la base :', err);
  }
}

// ✅ Connexion à MongoDB et exécution des opérations
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connecté à MongoDB !');

    await resetDatabase(); // 🔄 Nettoyage avant insertion

    await createPerson();
    await createManyPeople();
    await findPeopleByName('Alice');
    await findOneByFood('pizza');

    const idToEdit = '688d4bd9aa56fcf83e53d1d6';     //  ID valide
    const idToRemove = '688d4bd9aa56fcf83e53d1d7';  //  ID valide

    await findEditThenSave(idToEdit);
    await findAndUpdate('Charlie');
    await removeById(idToRemove);

    // Suppression des "Mary", puis exécution de la recherche chaînée
    removeManyPeople((err, result) => {
      if (err) return console.error('❌ Erreur suppression Mary :', err);
      console.log('✅ Suppression multiple terminée.');

      queryChain((err, data) => {
        if (err) return console.error('❌ Erreur dans queryChain :', err);
        console.log('✅ Résultats de queryChain :', data);

        // Fermeture propre de la connexion
        mongoose.connection.close();
      });
    });
  })
  .catch(err => {
    console.error('❌ Erreur de connexion MongoDB :', err);
  });
