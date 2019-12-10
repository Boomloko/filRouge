const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'root', // le mot de passe
database :  'painting_db', // le nom de la base de données
});
module.exports = connection;