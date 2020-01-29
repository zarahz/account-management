import LoginService from './LoginService.js';

test('Should return a token', async () => {
  const loginService = new LoginService();
  const token = await loginService.login('johndoe3', 'johndoe');
  expect(token).toMatchObject({token: 'eyJhbGciOiJIUzI1NiJ9.IjVlMzE4M2RmNTMwZDZhYTVhODkyMGRlZSI.dc9DYAvJn6bd5Tom4bZIxGYWGvnKcmvtH8qwMlhFIcw'});
});
