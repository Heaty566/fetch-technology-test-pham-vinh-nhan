import { User } from './src/users/entities';

declare global {
    declare namespace Express {
        export interface Request {
            user?: User;
        }
    }
}
