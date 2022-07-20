import { Request, Response } from 'express';
import  * as UserServices   from '../services/UserService';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {
    console.log('register');
    if(req.body.email && req.body.password) {
        let { email, password } = req.body;

        console.log(email, password);

    const newUser = await UserServices.createUser(email, password);

    if(newUser instanceof Error) {
        res.status(400);
       return  res.json({ error: newUser.message });
    } else {
        res.status(201);
       return res.json(newUser);
    }

}
res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;


        const user = await UserServices.findByEmail(email);

        if(user && await UserServices.matchPassword(password, user.password)) {
            res.status(200);
           return res.json(user);
        }

       
   return res.json({ status: false });
}
}

export const list = async (req: Request, res: Response) => {
    console.log('sdsd')
    let users = await UserServices.all();
    let list: string[] = [];

    for(let i in users) {
        list.push( users[i].email );
    }

    res.json({ list });
}