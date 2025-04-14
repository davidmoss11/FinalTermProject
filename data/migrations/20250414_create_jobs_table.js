exports.up = function(knex) {
  return knex.schema.createTable('jobs', table => {
    table.increments('id');
    table.string('company').notNullable();
    table.string('position').notNullable();
    table.string('status').defaultTo('applied');
    table.integer('user_id')
         .unsigned()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .onUpdate('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('jobs');
};
