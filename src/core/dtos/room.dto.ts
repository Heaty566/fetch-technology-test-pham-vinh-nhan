import * as joi from 'joi';
import { Room } from '../../rooms/entities';

export const roomValidationSchema: Record<keyof Room, joi.Schema> = {
    id: joi.string().uuid(),
    description: joi.string().min(5).max(20000).required(),
    quantity: joi.number().integer().min(0).required(),
    type: joi.string().required(),
    price: joi.number().min(0).required(),
    imageUrl: joi.string().required(),
    createdAt: joi
        .date()
        .iso()
        .options({ convert: true })
        .default('00:00:00')
        .required(),
    status: joi.string().required(),
    updatedAt: joi
        .date()
        .iso()
        .options({ convert: true })
        .default('00:00:00')
        .required(),
    bookingItems: joi.array().items(joi.object()),
};
