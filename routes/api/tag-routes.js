const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
  router.get('/', async (req, res) => {
    try {
      const tag = await Category.findAll({
        include: {
          model: Product
        }
      });
      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve categories' });
    }
  });

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Product }],
  })
 .then((dbTagData) => res.json(dbTagData))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
});

module.exports = router;
