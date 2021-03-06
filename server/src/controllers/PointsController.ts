import { Request, Response } from 'express';
import knex from '../database/connection';
import { tryPromise } from 'tarn/dist/utils';

class PointsController{

    async index(request: Request, response: Response){
        const { city, uf, items} = request.query;
       
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')    
        .join('point_items', 'points.id','=','point_items.point_id')
        .whereIn('point_items.items_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        return response.json(points);
    }


    async show(request: Request, response: Response){
        //https://youtu.be/XEswWb5Ail8?t=6222
        const { id } = request.params;
        console.log('o id é: ');
        console.log(id);
        const point = await knex('points').where('id',id).first();
        console.log(point);

        if(!point){
            return response.status(400).json({message:'Point not found.'});
        }

        console.log(point.id);
     
        const items = await knex('items')
            .join('point_items', 'items.id', '=','point_items.items_id')
            .where('point_items.point_id', id)
            .select('items.title');
        
        console.log(items);

        return response.json({point,items});
    }

    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const trx = await knex.transaction();
        
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        //const insertedIds = await trx('points').insert({
        const insertedIds = await trx('points').insert(point);

        console.log(insertedIds);

        const point_id = insertedIds[0];
       
        const pointItems = items.map((items_id: number) =>{
            return {
                point_id,
                items_id
            };
        });

        await trx('point_items').insert(pointItems);    
        
        await trx.commit();
        
        return response.json({
            id: point_id,
            ... point,
        });
    }

    
}

export default PointsController;