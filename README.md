Ce projet de gestion de livres est réalisé avec un back-end Spring Boot et un front-end React.js. Pour la gestion de la base de données, j’ai utilisé PostgreSQL. Le stockage des livres est entièrement géré côté back-end : pour l’activer, vous devez configurer le chemin du dossier contenant les fichiers dans application.properties et dans la classe FileStorageServiceImpl.java.
Le système fait intervenir trois types d’utilisateurs :
- Administrateur : gère les différents acteurs (lecteurs et auteurs).
- Auteur : ajoute, modifie ou supprime ses propres livres (la modification ne porte pas sur le fichier).
- Lecteur : peut consulter l’ensemble des livres et les télécharger.
  
Chaque utilisateur doit se connecter pour accéder à ses fonctionnalités.
La vidéo de démonstration présente l’application en action.
