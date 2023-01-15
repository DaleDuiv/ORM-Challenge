const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'products_with_this_tag' }],
    })

    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products_with_this_tag'}],
      });
  if (!tagData) {
    res.status(404).json({message: 'Tag not found'});
    return;
  } res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  } 
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
    tag_name: req.body.tag_name});
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update({
      tag_name: req.body.tag_name},
      { where: {id: req.params.id}
    });
  if (!tagData) {
    res.status(404).json({message: "No tag found"});
  return;
  } else {
    res.status(200).json(tagData);
  }
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {id: req.params.id}});
  if (!tagData) {
    res.status(404).json({message: "No tag found"});
    return;    
  } else {
    res.status(200).json(`You have successfully deleted ${req.params.id}`);
  }
  } catch (err) {
    res.status(500).json(err);
  }
  });

module.exports = router;
