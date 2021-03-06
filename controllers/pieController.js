const router = require('express').Router();

const { PieModel } = require('../models');
const {validateSession} = require('../middleware');

// router.get('/', (req, res) => res.send('I love Pie!'));

//GET
router.get('/', async (req, res) => {
  //async functions take asynchronous code, and make it run synchronously
  try {
    const allPies = await PieModel.findAll();

    res.status(200).json(allPies);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

//Create
router.post('/', validateSession, async (req, res) => {
  const {
    nameOfPie,
    baseOfPie,
    crust,
    timeToBake,
    servings,
    rating,
  } = req.body;

  try {
    const Pie = await PieModel.create({
      nameOfPie,
      baseOfPie,
      crust,
      timeToBake,
      servings,
      rating,
    });
    res.status(200).json({
      message: 'Pie successfully created',
      Pie,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to create pie ${err}`,
    });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const locatedPie = await PieModel.findOne({
      where: {
        nameOfPie: req.params.name,
      },
    });
    res.status(200).json({
      message: 'Pies successfully retrieved',
      locatedPie,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to retrieve pies: ${err}`,
    });
  }
});

router.put('/:id', async (req, res) => {
  const {
    nameOfPie,
    baseOfPie,
    crust,
    timeToBake,
    servings,
    rating,
  } = req.body;
  try {
    const piesUpdated = PieModel.update(
      { nameOfPie, baseOfPie, crust, timeToBake, servings, rating },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      message: 'Pie successfully updated',
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update pie: ${err}`,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await PieModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: 'Pie deleted',
    });
  } catch (err) {
    res.status(500).json({
      message: `someone ate the pie ${err} `,
    });
  }
});

module.exports = router;
