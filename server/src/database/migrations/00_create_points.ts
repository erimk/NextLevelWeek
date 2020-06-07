import Knex from 'knex';
//tipo são maiuscula //ctrl+d no code é linha de baixo
export async function up(knex: Knex){
    //https://youtu.be/XEswWb5Ail8?t=3871
    return knex.schema.createTable('points', table =>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('image').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('points');
}