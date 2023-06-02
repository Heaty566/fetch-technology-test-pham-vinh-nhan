import { User } from '../../users/entities';
import { joiPasswordExtendCore, JoiPasswordExtend } from 'joi-password';
import * as joi from 'joi';

const joiPassword: JoiPasswordExtend = joi.extend(joiPasswordExtendCore);

export const userValidationSchema: Record<keyof User, joi.Schema> = {
    createdAt: joi
        .date()
        .iso()
        .options({ convert: true })
        .default('00:00:00')
        .required(),
    updatedAt: joi
        .date()
        .iso()
        .options({ convert: true })
        .default('00:00:00')
        .required(),
    id: joi.string().required(),
    email: joi.string().min(3).max(255).email().required(),
    password: joiPassword
        .string()
        .min(8)
        .max(32)
        .noWhiteSpaces()
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .required(),
    name: joi.string().min(3).max(255).required(),
    status: joi.string().required(),
    role: joi.string().required(),
};
