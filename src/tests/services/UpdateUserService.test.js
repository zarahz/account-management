import UpdateUserService from '../../services/UpdateUserService.js';

test('Should return a token if the user is updated correctly', async () => {
    const updateUserService = new UpdateUserService();
    const userModel = {
        id: '5e3183df530d6aa5a8920dee',
        titel: 'sir',
        firstname: 'john',
        lastname: 'doe',
        username: 'johndoe3',
        email: 'john35@doe.com',
        organisation: 'LMU',
        fieldOfActivity: 'computer science',
        researchInterest: ['AR']
    };
    const token = await updateUserService.updateUser(userModel, 'eyJhbGciOiJIUzI1NiJ9.IjVlMzE4M2RmNTMwZDZhYTVhODkyMGRlZSI.dc9DYAvJn6bd5Tom4bZIxGYWGvnKcmvtH8qwMlhFIcw');
    expect(token).toMatchObject({ token: 'eyJhbGciOiJIUzI1NiJ9.IjVlMzE4M2RmNTMwZDZhYTVhODkyMGRlZSI.dc9DYAvJn6bd5Tom4bZIxGYWGvnKcmvtH8qwMlhFIcw' });
});
