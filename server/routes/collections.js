const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');

// Get all active collections
router.get('/', async (req, res) => {
    try {
        const collections = await Collection.find({ isActive: true })
            .sort({ order: 1, createdAt: -1 });
        res.json(collections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single collection
router.get('/:id', async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.json(collection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new collection (Admin only)
router.post('/', async (req, res) => {
    const collection = new Collection({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        link: req.body.link,
        order: req.body.order || 0
    });

    try {
        const newCollection = await collection.save();
        res.status(201).json(newCollection);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update collection (Admin only)
router.patch('/:id', async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }

        if (req.body.title) collection.title = req.body.title;
        if (req.body.description) collection.description = req.body.description;
        if (req.body.image) collection.image = req.body.image;
        if (req.body.link) collection.link = req.body.link;
        if (req.body.order !== undefined) collection.order = req.body.order;
        if (req.body.isActive !== undefined) collection.isActive = req.body.isActive;

        const updatedCollection = await collection.save();
        res.json(updatedCollection);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete collection (Admin only)
router.delete('/:id', async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        await collection.remove();
        res.json({ message: 'Collection deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 