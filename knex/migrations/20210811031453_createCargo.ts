import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw(`
        CREATE TABLE "role" (
            "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            "name" varchar NOT NULL
        );
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('role')
}

