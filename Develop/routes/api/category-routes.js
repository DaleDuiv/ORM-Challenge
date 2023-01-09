const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
  const allCategories = await Category.findAll({
    include: [{model: Product}],
  });
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
 try {
  const getCategoryByID = await Category.findByPk(req.params.id, {
    include: [{model: Product}],
  });
  if (!getCategoryByID) {
    res.status(404).json({message: 'No category found with that id'})
  } else {
    res.status(200).json(getCategoryByID)
  }}
  catch (err) {
    res.status(500).json(err);
  }
  });

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(
      {category_name: req.body.category_name});
      res.status(200).json(newCategory)
    } catch (err) {
      res.status(500).json(err)
    }
  });
    

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      {category_name: req.body.category_name},
      {where: {id: req.params.id}}
  );
  
  if (!updatedCategory) {
    res.status(404).json({message: 'No category found with that id'});
    return;
  } else {
    res.status(200).json(updatedCategory);
  }
  } catch (err){
    res.status(500).json(err);
  }
  });




  
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {id: req.params.id}
    });
    if (!deletedCategory) {
      res.status(404).json('No category found with that id');
      return;
    } else {
    res.status(200).json(`You have successfully deleted ${req.params.id}`);
  }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
