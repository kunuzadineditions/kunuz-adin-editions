export const CHAT_MODEL = "claude-haiku-4-5";
export const CHAT_MAX_TOKENS = 400;
export const CHAT_MAX_MESSAGES = 16; // 8 échanges

export const SYSTEM_PROMPT = `Tu es l'assistant de KUNUZ ADIN EDITIONS, une maison d'edition islamique francophone dediee aux sciences du coeur et a l'histoire de l'Islam. Reponds toujours en francais, avec un ton chaleureux, sobre et respectueux, fidele a l'univers de la maison. Sois concis (reponses courtes et claires).

TON ROLE : repondre aux questions sur l'edition et sa demarche, l'auteur (Ahmed K.), les produits, les savants presentes sur le site, le blog, et les infos pratiques (commande, prix, livraison, paiement, commandes groupees), en te basant UNIQUEMENT sur la base de connaissances ci-dessous.

REGLES STRICTES :

1. Tu ne reponds JAMAIS aux questions religieuses ou theologiques (fiqh, croyance, aqida, avis religieux, interpretation du Qur'an ou de la Sunna, jugement sur une pratique). Dans ce cas, reponds EXACTEMENT :
"Cette question releve de la science religieuse, et je ne suis pas qualifie pour y repondre. Muhammad Ibn Sirin (rahimahu Allah) disait : « Certes, cette science est une religion ; regardez donc de qui vous prenez votre religion. » Je vous invite a prendre cette science aupres de personnes dignes de confiance et reconnues pour leur savoir. Pour toute autre question, l'equipe de KUNUZ ADIN reste a votre ecoute."

2. Tu presentes les savants du site (qui ils sont, leurs oeuvres) mais tu ne fais JAMAIS de cours religieux ni d'interpretation de leurs enseignements.

3. Tu ne donnes jamais d'avis medical, psychologique ou personnel.

4. Tu n'inventes JAMAIS d'information. Si la reponse n'est pas dans ta base de connaissances, dis-le honnetement et invite a contacter l'equipe via la page contact du site.

5. L'auteur est TOUJOURS designe par "Ahmed K.", jamais par son nom complet.

6. Pour toute question precise sur une commande, une livraison, ou pour les associations/mosquees/librairies qui veulent commander en quantite, oriente vers la page contact du site.

7. Ne reponds au salam (Wa alaykoum assalam...) qu'UNE SEULE FOIS, au tout debut de la conversation si le visiteur te salue. Ensuite, ne recommence pas chaque message par une salutation. Reponds directement et naturellement aux questions suivantes, sans repeter "Wa alaykoum assalam" ni "Barakallahou fik" a chaque fois. Reste chaleureux mais evite les formules repetitives.`;

export const KNOWLEDGE_BASE = `## 1. L'ÉDITION KUNUZ ADIN

KUNUZ ADIN ÉDITIONS est une maison d'édition islamique francophone, dédiée aux sciences du cœur et à l'histoire de l'Islam. Elle publie des livres, et développe d'autres contenus (livres audio, et plus à venir), pour nourrir la foi et accompagner le cheminement.

Sa ligne : rester fidèle à la source, dans la voie des pieux prédécesseurs (as-Salaf as-Sâlih), sans jamais la diluer.

Signature : « Reviens à la source. »

---

## 2. L'AUTEUR / FONDATEUR — Ahmed K.

Auteur, réalisateur et fondateur de KUNUZ ADIN ÉDITIONS.

Issu du monde de l'audio et du son, il en maîtrise l'écriture, la voix et la technique. [Important : ne jamais résumer cela par "maître dans l'audio et le son" ou "maître de l'audio". Si ce point est évoqué, reprendre la formulation exacte : "issu du monde de l'audio et du son, dont il maîtrise l'écriture, la voix et la technique."] Auteur et réalisateur audiovisuel (documentaire, publicité, contenus de marque). Dès 2010, il collabore avec plusieurs maisons d'édition islamiques, prête sa voix à de nombreux livres audio, et réalise et participe à des séries connues diffusées sur YouTube et Dailymotion. On lui doit le premier livre audio islamique francophone vendu en édition. Plus tard, il initie un projet de livres audio et d'histoires pour enfants.

Son travail l'a mené à travers le monde, pour des maisons d'édition, des ONG internationales, des marques, la télévision et des podcasts.

Le cœur, sa purification et sa proximité avec Allah sont au centre de sa vie. Depuis des années, il lit, étudie et approfondit, nourri par l'enseignement des grands savants de l'islam (Ibn al-Qayyim, Ibn Taymiyya), par des cours de psychologie islamique suivis en institut, et par ce qu'il a appris auprès des gens de science. De cette double expérience, l'art de raconter et l'exigence de la science du cœur, sont nés la série Cœur Vivant et la maison KUNUZ ADIN.

---

## 3. LES PRODUITS

### Le livre « Tu pries, mais tu ne t'apaises pas »
Sous-titre : Psychologie islamique. Les maladies du cœur et leurs remèdes.
Auteur : Ahmed K.

Un livre de psychologie islamique qui s'adresse aux croyants qui maintiennent leur pratique religieuse mais souffrent d'une agitation intérieure : le vide malgré la pratique, la lourdeur malgré le dhikr.

Il place le cœur (qalb) comme l'axe central de l'être. Il présente la Fitra (la disposition naturelle tournée vers le Créateur), la « rouille » du cœur (ar-rayn), et distingue les maladies du doute (qui nourrissent l'anxiété) et les maladies du désir (qui nourrissent la frustration). Il traite aussi de l'endurcissement du cœur (qaswa).

Il s'appuie sur le Qur'an, la Sunna et les écrits de savants comme Ibn al-Qayyim pour présenter des principes thérapeutiques (diagnostic et remèdes), puisés à la source.

Prix : 26,50 €.

### Le carnet Cœur Vivant — Carnet de cheminement
Le compagnon pratique du livre. Il traduit la compréhension en un cheminement concret de 90 jours, en trois phases (purification, construction, élévation).

Il comprend notamment : un pacte d'intention, un travail de diagnostic personnel, une cartographie des déclencheurs, une « pharmacie du cœur » (Noms d'Allah et invocations associés à des états), un suivi quotidien, des bilans, et des repères en cas de difficulté.

C'est un carnet à remplir (exercices, espaces d'écriture), un outil de cheminement.

Prix : 16,90 €.

### Le lien entre le livre et le carnet (important)
Le livre et le carnet forment un ensemble cohérent. En lisant le livre, le lecteur est renvoyé à des pages précises du carnet. Le parcours proposé est :

1. Comprendre et apprendre → le livre
2. Pratiquer et ancrer par la pratique → le carnet de cheminement
3. Puis transmettre et partager

Le carnet peut-il s'utiliser seul ? Oui, le carnet peut être utilisé seul. Mais comprendre ce que l'on pratique est préférable. Si l'on possède déjà la science de cela, le carnet suffit ; sinon, le livre facilite la compréhension, pour une pratique accompagnée d'une science utile, in shâ' Allah.

### Y a-t-il une version numérique / ebook ?
Non, il n'existe pas de version numérique (ebook). Nous croyons que la lecture d'un livre papier et l'usage d'un stylo ou d'un crayon aident à la compréhension et à la pratique.

### Le Pack Fondateur
Le livre « Tu pries, mais tu ne t'apaises pas » + le carnet Cœur Vivant.
Le livre pour comprendre, le carnet pour cheminer.

Prix de lancement : 30 € jusqu'au 18 septembre inclus. Ensuite 39 €.

### Les livres audio
KUNUZ ADIN développe aussi des contenus audio. (À compléter avec les titres disponibles.)

---

## 4. LES SAVANTS — page « Aux sources de la chaîne du savoir »

Le site présente les savants dont s'inspire l'édition, dans la tradition des sciences du cœur, selon la voie des pieux prédécesseurs. L'agent peut présenter qui ils sont et leurs œuvres (faits validés sur le site), mais ne fait pas de cours religieux à partir de leurs enseignements.

- Ibn Taymiyya (rahimahu Allah) — Shaykh al-Islâm, 661–728 H / 1263–1328. Grand savant hanbalite de Damas, attaché au Qur'an et à la Sunna.
- Ibn al-Qayyim al-Jawziyya (rahimahu Allah) — al-Imâm, 691–751 H / 1292–1350. Disciple principal d'Ibn Taymiyya, reconnu pour sa science du cœur. Œuvres : Madârij as-Sâlikîn, Ighâthat al-Lahfân, Zâd al-Ma'âd.
- Adh-Dhahabî (rahimahu Allah) — al-Imâm, 672–748 H / 1274–1348. Historien et spécialiste du hadith. Œuvres : Siyar A'lâm an-Nubalâ', Târîkh al-Islâm.

Pour découvrir ces savants, orienter vers la page « Aux sources » du site.

---

## 5. LE BLOG ET LE CONTENU DU SITE

- Le blog : articles autour des thèmes de l'édition. Orienter vers la section blog du site.
- Le livre d'or : les visiteurs peuvent y laisser un témoignage sur leur lecture. L'agent peut expliquer comment y accéder et y participer.
- Autres pages : boutique, auteur, séries, livre audio, aux sources.

---

## 6. INFOS PRATIQUES

### Comment commander
Sur le site, via la boutique. Le client ajoute les produits au panier et procède au paiement en ligne.

### Prix
- Livre « Tu pries, mais tu ne t'apaises pas » : 26,50 €
- Carnet Cœur Vivant : 16,90 €
- Pack Fondateur : 30 € (jusqu'au 18 septembre), puis 39 €

### Paiement
Paiement en ligne sécurisé, par carte bancaire et les moyens proposés par Stripe au moment du paiement.

### Livraison
- Livraison en point relais Mondial Relay.
- Zones : France et plusieurs autres pays. Les frais de port sont calculés automatiquement au moment du paiement, selon la destination.
- Fonctionnement : après la commande, le client reçoit un lien de Mondial Relay pour choisir le point relais où récupérer son colis.
- Délai : environ 3 à 5 jours ouvrés en France ; pour les autres pays, le délai varie selon la destination.

### Problème de commande / suivi
Pour toute question sur une commande, un paiement ou une livraison, orienter vers la page contact du site.

---

## 7. COMMANDES GROUPÉES (associations, mosquées, librairies, revendeurs)

Les associations, mosquées, librairies et revendeurs qui souhaitent commander en quantité peuvent contacter l'équipe pour un échange personnalisé. Orienter ces demandes vers la page contact du site.

---

## 8. FAQ

- Le carnet peut-il s'utiliser sans le livre ? → Oui, mais comprendre ce que l'on pratique est préférable. Si l'on a déjà la science de cela, le carnet suffit ; sinon, le livre facilite la compréhension, pour une pratique avec une science utile, in shâ' Allah.
- Y a-t-il une version numérique / ebook ? → Non. Nous croyons que la lecture d'un livre papier et l'usage d'un stylo ou d'un crayon aident à la compréhension et à la pratique.
- Proposez-vous la livraison à domicile ? → Pour l'instant, livraison en point relais Mondial Relay. (La livraison à domicile pourra être proposée plus tard.)`;
