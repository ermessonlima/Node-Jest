import { User, UserInstance } from '../models/User';
import * as UserService from '../services/UserService';

describe('UserService', () => {

    let email = 'ermessonlima@hotmail.com';
    let password = '123456';

    beforeAll( async () => {
        await User.sync({ force: true });
    })

    it('should create a user', async () => {
        const user = await UserService.createUser(email, password) as UserInstance;

        expect(user).not.toBeInstanceOf(Error);
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('password');

        expect(user.email).toBe(email); 


    });

    it('should not allow to create a user with the same email', async () => {
        const user = await UserService.createUser(email, password) as UserInstance;

        expect(user).toBeInstanceOf(Error);
    });

        

    it('should find a user by email', async () => {
        const user = await UserService.findByEmail(email) as UserInstance;
        expect(user.email).toBe(email); 
    }
    );

    it('should match password', async () => {
        const user = await UserService.findByEmail(email) as UserInstance;
        const match = await UserService.matchPassword(password, user.password);
        expect(match).toBe(true); 
    });

    it('should not match password', async () => {
        const user = await UserService.findByEmail(email) as UserInstance;
        const match = await UserService.matchPassword('invalid', user.password);
        expect(match).toBe(false); 
    })

    it('should return all users', async () => {
        const users = await UserService.all();
        expect(users.length).toBeGreaterThanOrEqual(1);
        
        for(let i in users ){
            expect(users[i]).toBeInstanceOf(User);
        }
    })
          

});