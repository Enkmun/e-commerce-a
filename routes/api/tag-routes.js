const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags with associated Product data
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single tag by its id with associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a tag's name by its id
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a tag by its id
router.delete('/:id', async (req, res) => {
  try {
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Tag deleted successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
