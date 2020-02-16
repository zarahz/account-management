import DecoderService from '../../services/DecoderService.js';

test('Should return the user', async () => {
    const decoderService = new DecoderService();
    const token = 'eyJhbGciOiJIUzI1NiJ9.IjVlNDZmOTQwNmRlYzIxNTBlYTc1NTcwMSI.8JoWul2Oi7Qx00JoXcoP4yWs4GtxollwbF8pMipj3KU';
    const user = await decoderService.decode(token);
    expect(user).toMatchObject({
        id: '5e46f9406dec2150ea755701',
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
