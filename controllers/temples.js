const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllTemples = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('temples')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};


const getSingleTemple = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid temple id to find a temple.');
  }
  const templeId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('temples')
    .find({ _id: templeId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createTemple = async (req, res) => {
  const temple = {
    name: req.body.name,
    status: req.body.status,
    location: req.body.location,
    dedication: req.body.dedication
  };
  const response = await mongodb.getDb().db().collection('temples').insertOne(temple);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the temple.');
  }
};

const updateTemple = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid temple id to update a temple.');
  }
  const templeId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const temple = {
    name: req.body.name,
    status: req.body.status,
    location: req.body.location,
    dedication: req.body.dedication
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('temples')
    .replaceOne({ _id: templeId }, temple);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the temple.');
  }
};

const deleteTemple = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid temple id to delete a temple.');
  }
  const templeId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('temples').remove({ _id: templeId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the temple.');
  }
};

module.exports = {
  getAllTemples,
  getSingleTemple,
  createTemple,
  updateTemple,
  deleteTemple
};
