const db = require("../../data/db-config.js");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where("id", id).first();
};

const create = async (car) => {
  const [id] = await db("cars").insert(car);
  return getById(id);
};

const getByVin = async (vin) => {
  return db("cars").where("vin", vin).first();
};

const updateById = async (id, car) => {
  await db("cars").where("id", id).update(car);
  return getById(id);
};

const removeById = async (id) => {
  const deletedCar = await getById(id);
  await db("cars").where("id", id).delete();
  return deletedCar;
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
  updateById,
  removeById,
};
