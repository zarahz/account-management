import DecoderService from '../DecoderService.js';

test('Should return the user', async () => {
  const decoderService = new DecoderService();
  const userModel = {
    titel: 'sir',
    firstname: 'john',
    lastname: 'doe',
    username: 'johndoe3',
    email: 'john35@doe.com',
    password: 'johndoe',
    fieldOfActivity: 'computer science',
    researchInterest: ['AR'],
    securityQuestion: 'In what town or city did you meet your spouse/partner?',
    securityAnswer: 'Doe town'
  };
  const token = 'eyJhbGciOiJIUzI1NiJ9.IjVlMzE4M2RmNTMwZDZhYTVhODkyMGRlZSI.dc9DYAvJn6bd5Tom4bZIxGYWGvnKcmvtH8qwMlhFIcw';
  const user = await decoderService.decode(token);
  expect(user).toMatchObject({
    id: '5e3183df530d6aa5a8920dee',
    title: 'sir',
    role: 'user',
    firstname: 'john',
    lastname: 'doe',
    username: 'johndoe3',
    email: 'john35@doe.com',
    organisation: 'LMU',
    fieldOfActivity: 'computer science',
    researchInterest: [
      'AR'
    ],
    eventbasedRole: []
  });
});
