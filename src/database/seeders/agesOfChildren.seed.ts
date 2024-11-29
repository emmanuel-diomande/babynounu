interface AgesOfChildren {
  name: string; // Nom du besoin spécifique
  description: string; // Description du besoin spécifique
}

const agesOfChildrenSeeders: AgesOfChildren[] = [
  {
    name: 'Nourrisson',
    description:
      'Enfants en bas âge, besoins particuliers en soins et surveillance.',
  },
  {
    name: 'Petite enfance',
    description:
      'Enfants en bas âge, développement moteur et premières interactions sociales.',
  },
  {
    name: 'Préscolaire',
    description:
      "Préparation pour l'école, forte curiosité et apprentissage social.",
  },
  {
    name: 'École primaire',
    description:
      "Apprentissage scolaire, développement d'autonomie et socialisation.",
  },
  {
    name: 'Préadolescent',
    description: "Préparation pour l'adolescence, recherche d'indépendance.",
  },
];

export default agesOfChildrenSeeders;