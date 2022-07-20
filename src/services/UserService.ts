import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const createUser = async (email: string, password:string)  => {

    let hasUser = await User.findOne({where: { email  }});
    if(!hasUser) {
        const hash = bcrypt.hashSync(password, 10);
        const user = await User.create({ email, password: hash });
        return user;
    } else {
        return new Error('E-mail já existe.');
    }
}

export const findByEmail = async (email: string) => {
    return await User.findOne({where: { email }});
}

export const matchPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compareSync(password, hash);
}

export const all = async ()  => {
    return await User.findAll();
}

