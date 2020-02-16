import LoginService from '../../services/LoginService.js';

test('Should return a token', async () => {
    const loginService = new LoginService();
    const token = await loginService.login('johndoe3', 'johndoe');
    expect(token).toMatchObject({ token: 'eyJhbGciOiJIUzI1NiJ9.IjVlNDZmOTQwNmRlYzIxNTBlYTc1NTcwMSI.8JoWul2Oi7Qx00JoXcoP4yWs4GtxollwbF8pMipj3KU' });
});
