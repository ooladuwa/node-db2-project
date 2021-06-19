const router = require("express").Router();

const Car = require("./cars-model.js");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware.js");

router.get("/", async (req, res, next) => {
  try {
    const data = await Car.getAll();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await Car.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  async (req, res, next) => {
    try {
      const updatedCar = await Car.updateById(req.params.id, req.body);
      res.status(200).json(updatedCar);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkCarId, async (req, res, next) => {
  try {
    const deletedCar = await Car.removeById(req.params.id);
    res.json(deletedCar);
    next();
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
