'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('groups', function (t) {
    t.uuid('id').primary().notNull();
    t.json('type').defaultTo("Group");
    t.json('name').notNull();
  })
  .createTable('members', function (t) {
    t.uuid('member_id').notNull();
    t.uuid('group_id').notNull();
    t.text('member_type').notNull();
  })
  ;
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('groups')
  .dropTable('groups_members')
  ;
};
