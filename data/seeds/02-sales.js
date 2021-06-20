exports.seed = function (knex) {
  //deletes all entries
  return knex("sales")
    .truncate()
    .then(function () {
      //inserts seed entries
      return knex("sales").insert([
        {
          car_id: 1,
          status: "available",
          sale_date: "",
          sold_by: "",
        },
      ]);
    });
};
