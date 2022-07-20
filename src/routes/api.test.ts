import request from 'supertest';
import  app  from '../app';
import { User } from '../models/User';

describe('App', () => {

    let email = 'ermessonlima1@hotmail.com';
    let password = '1234561';


    beforeAll( async () => {
        jest.setTimeout(50000);
        await User.sync({ force: true });
    })



    it('should return a 200 response',   (done) => {
        request(app)
            .get('/ping')
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.pong).toBeTruthy();
                return done();
            });
    }
    );


    it('should return a 200 response',   (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}&password=${password}`)
            .then(response => {
                    expect(response.statusCode).toBe(201);
                    expect(response.body.error).toBeUndefined();
                    expect(response.body).toHaveProperty('id');
                return done();
            });
    }
    );


    it('should not allow to register with existing email',   (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}`)
            .then(response => {
                    expect(response.body.error).not.toBeUndefined();
                return done();
            });
    }
    );


    it('should not allow to register without email',   (done) => {
        request(app)
            .post('/register')
            .send(`password=${password}`)
            .then(response => {
                    expect(response.body.error).not.toBeUndefined();
                return done();
            });
          
    }
    );

    it('should not allow to register without any data',   (done) => {
        request(app)
            .post('/register')
            .send(``)
            .then(response => {
                    expect(response.body.error).not.toBeUndefined();
                return done();
            });
    }
    );


    it('should login correctly',   (done) => {
        request(app)
            .post('/login')
            .send(`email=${email}&password=${password}`)
            .then(response => {
                    expect(response.body.error).toBeUndefined();
                    expect(response.statusCode).toBe(200);
                    expect(response.body).toHaveProperty('id');
                return done();
            });
    }
    );

    it('should login incorrect data',   (done) => {
        request(app)
            .post('/login')
            .send(`email=${email}&password=invalid`)
            .then(response => {
                    expect(response.body.error).toBeUndefined(); 
                    expect(response.body.status).toBeFalsy();
                return done();
            });
    }
    );

    it('should llist users',   (done) => {
        request(app)
            .get('/list')
            .then(response => {
                    expect(response.body.error).toBeUndefined(); 
                return done();
            });
            
    }
    );
})
