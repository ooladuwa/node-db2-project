exports.up = function (knex) {
  return knex.schema
    .createTable("cars", (table) => {
      table.increments();
      table.text("vin").unique().notNullable();
      table.text("make").notNullable();
      table.text("model").notNullable();
      table.integer("mileage").notNullable();
      table.text("title");
      table.text("transmission");
    })
    .createTable("sales", (table) => {
      table.increments();
      table.boolean("status").notNullable();
      table.text("sale_date");
      table.text("sold_by");
      table
        .integer("car_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cars")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars").dropTableIfExists("sales");
};
