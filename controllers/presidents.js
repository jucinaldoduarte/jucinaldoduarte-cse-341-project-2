const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllPresidents = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('presidents')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};


const getSinglePresident = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a president.');
  }
  const presidentId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('presidents')
    .find({ _id: presidentId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createPresident = async (req, res) => {
  const president = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birth: req.body.birth,
    placeOfBirth: req.body.placeOfBirth,
    ordination: req.body.ordination,
    death: req.body.death,
    length: req.body.length    
  };
  const response = await mongodb.getDb().db().collection('presidents').insertOne(president);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating president profile.');
  }
};

const updatePresident = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid president id to update a president profile.');
  }
  const templeId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const president = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birth: req.body.birth,
    placeOfBirth: req.body.placeOfBirth,
    ordination: req.body.ordination,
    death: req.body.death,
    length: req.body.length  
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('presidents')
    .replaceOne({ _id: presidentId }, president);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the president profile.');
  }
};

const deletePresident = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid president id to delete a president profile.');
  }
  const presidentId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('presidents').remove({ _id: presidentId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the president profile.');
  }
};

module.exports = {
  getAllPresidents,
  getSinglePresident,
  createPresident,
  updatePresident,
  deletePresident
};
