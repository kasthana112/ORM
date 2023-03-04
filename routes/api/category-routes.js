const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(req.body);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    res.status(200).json(req.body);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/', (req, res) => {
  // create a new category
  try {
    Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(req.body);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // be sure to include its associated Products
  try {
    Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(req.body);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(req.body);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
