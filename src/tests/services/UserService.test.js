import UserService from '../../services/UserService.js';

test('Should return the security questions', async () => {
  const userService = new UserService();
  const securityQuestions = await userService.getSecurityQuestion('john35@doe.com');
  expect(securityQuestions).toMatchObject({ userData: { id: '5e3183df530d6aa5a8920dee', securityQuestion: 'In what town or city did you meet your spouse/partner?' } });
});

test('Should return true if correct security answer', async () => {
  const userService = new UserService();
  const securityAnswer = await userService.checkSecurityAnswer('5e3183df530d6aa5a8920dee', 'Doe town');
  expect(securityAnswer).toBe(true);
});

test('Should return true if new password ist set', async () => {
  const userService = new UserService();
  const updatePassword = await userService.updatePassword('johndoe', '5e3183df530d6aa5a8920dee');
  expect(updatePassword).toBe(true);
});

// test('Should return true if user is deleted', async () => {
//   const userService = new UserService();
//   const deleteUser = await userService.deleteUser('johndoe3', 'johndoe');
//   expect(deleteUser).toBe(true);
// });
