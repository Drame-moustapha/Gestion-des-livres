Ce projet est une application web reposant sur un back-end Spring Boot, un front-end React.js et une base de données PostgreSQL.
Il permet la gestion et le téléchargement de livres.
Le Stockage des livres est géré côté back-end. Pour activer cette fonctionnalité, configurez le chemin du répertoire de stockage dans :
-	application.properties
-	et dans la classe FileStorageServiceImpl.java .
  
L’application dispose de trois types d’utilisateurs :
-	Administrateur : il gère les utilisateurs (auteurs et lecteurs)
-	Auteur : il peut ajouter, modifier, ou supprimer ses propres livres
-	Lecteur : il peut consulter l’ensemble des livres et les télécharger
Chaque utilisateur doit se connecter pour accéder à ses fonctionnalités spécifiques selon son rôle.

Démonstration
Une vidéo de démonstration illustre les fonctionnalités de l’application.
