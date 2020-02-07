import RegistrationService from '../../services/RegistrationService.js';

// registration can't be tested with a new user because token can't be predicted
test('Should return an error message because the user is already registered', async () => {
    const registrationService = new RegistrationService();
    const userModel = {
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
    const user = await registrationService.register(userModel);
    expect(user).toMatchObject({ error: 'this email is already used' });
});
