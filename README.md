# WebRTC DataChannel Example

## Description

Ce projet est une implémentation simple d'une application WebRTC utilisant un DataChannel. L'objectif est de permettre l'échange de messages texte en temps réel entre deux pairs via une connexion peer-to-peer.

## Fonctionnalités

- **Connexion Peer-to-Peer** : 
  Deux PeerConnections sont établis pour simuler une communication locale et distante.

- **DataChannel** : 
  Utilisation d'un DataChannel pour transmettre des messages texte.

- **Interface utilisateur minimaliste** : 
  Une zone de texte pour afficher les messages reçus, un champ d'entrée pour saisir les messages, et un bouton pour envoyer les messages.

## Structure des fichiers

- **index.html** : Contient l'interface utilisateur de base avec les zones de texte et le bouton d'envoi.
- **main.js** : Contient la logique WebRTC pour créer et gérer le DataChannel.
