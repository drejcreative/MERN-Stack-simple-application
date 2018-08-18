import express from 'express';
const router = express.Router();

// Item Model
import Item from '../../models/Item.mjs';

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.status(404).json(err));
})

// @route   POST api/items
// @desc    Add new item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  })

  newItem.save()
    .then(item => res.json(item))
    .catch(err => res.status(404).json(err));
})

// @route   DELETE api/items/:id
// @desc    Delete item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(
      item => item.remove()
        .then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}))
})

export { router };