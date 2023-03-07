const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({
      include: {
        model: Product
      }
    });
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tag' });
  }
});


router.get('/:id',async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagId = req.params.id;
  try {
    const tag = await Tag.findByPk(tagId, {
      include: {
        model: Product
      }
    });
    if (!tag) {
      return res.status(404).json({ error: 'tag not found' });
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tag' });
  }
});

router.post('/',async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body); 
    res.status(201).json(newTag);

  } catch (err) {
    console.error(err);

    res.status(500).json({ error: 'Failed to create tag' });
  }
});

router.put('/:id', async (req, res) => {
  const tagId = req.params.id;
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: { id: tagId }
      }
    );
    res.json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tag' });
  }
  });

  router.delete('/:id', async (req, res) => {
    const tagId = req.params.id;
  
    try {
      const numRowsDeleted = await Tag.destroy({
        where: { id: tagId }
      });
      if (numRowsDeleted === 0) {
        return res.status(404).json({ error: 'Tag not found' });
      }
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete tag' });
    }
  });

module.exports = router;