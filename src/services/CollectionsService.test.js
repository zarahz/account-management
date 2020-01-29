import CollectionsService from './CollectionsService.js';

test('Should return all german security questions', async () => {
  const collectionsService = new CollectionsService();
  const securityQuestions = await collectionsService.getSecurityQuestions('de');
  expect(securityQuestions).toEqual([
    'Wie war die Hausnummer und der Straßenname, in dem Sie als Kind gelebt haben?',
    'Was waren die letzten vier Ziffern der Telefonnummer Ihrer Kindheit?',
    'Welche Grundschule haben Sie besucht?',
    'In welcher Stadt war Ihr erster Vollzeitjob?',
    'In welcher Stadt haben Sie Ihren Ehepartner/Partner getroffen?',
    'Wie lautet der zweite Vorname Ihres ältesten Kindes?',
    'Was sind die letzten fünf Ziffern Ihrer Führerscheinnummer?',
    'Wie lautet der Mädchenname Ihrer Großmutter (mütterlicherseits)?',
    'Wie lautet der Mädchenname der Mutter Ihres Ehepartners oder Ihrer Partnerin?',
    'In welcher Stadt lernten sich deine Mutter und dein Vater kennen?'
  ]);
});

test('Should return all english security questions', async () => {
  const collectionsService = new CollectionsService();
  const securityQuestions = await collectionsService.getSecurityQuestions('en');
  expect(securityQuestions).toEqual([
    'What was the house number and street name you lived in as a child?',
    'What were the last four digits of your childhood telephone number?',
    'What primary school did you attend?',
    'In what town or city was your first full time job?',
    'In what town or city did you meet your spouse/partner?',
    'What is the middle name of your oldest child?',
    "What are the last five digits of your driver's licence number?",
    "What is your grandmother's (on your mother's side) maiden name?",
    "What is your spouse or partner's mother's maiden name?",
    'In what town or city did your mother and father meet?'
  ]);
});

test('Should return all research interests', async () => {
  const collectionsService = new CollectionsService();
  const researchInterests = await collectionsService.getResearchInterests();
  expect(researchInterests).toEqual([
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Vision',
    'Natural language processing',
    'Web',
    'Mobile and Multimedia Technologies',
    'Networks and Communications',
    'Hardware, Power and Energy',
    'Security and Privacy',
    'Computational Theory',
    'Algorithms and Mathematics',
    'Information Systems',
    'Search',
    'Information Retrieval',
    'Database Systems',
    'Data Mining',
    'Data Science',
    'Graphics and Computer-Aided Design',
    'Architecture',
    'Embedded Systems and Electronics',
    'Robotics',
    'Human Computer Interaction',
    'Software Engineering and Programming Languages'
  ]);
});
