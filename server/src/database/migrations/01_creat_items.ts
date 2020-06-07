import Knex from 'knex';

export async function up(knex: Knex){
    //https://youtu.be/XEswWb5Ail8?t=3844
    return knex.schema.createTable('items', table =>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('items');
}