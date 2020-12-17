'use strict';

const fs = require('fs');
const express = require('express');
const Collection = require('../auth/models/data-collection.js');
const basicAuth = require('../auth/middleware/basic.js');
const bearerAuth = require('../auth/middleware/bearer.js');
const permissions = require('../auth/middleware/acl.js');
const router = express.Router();

const models = new Map();

router.param('model', (req, res, next) => {
  try {
  const modelName = req.params.model;
  if (models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    const fileName = `${__dirname}/../auth/models/${modelName}/model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    }
    else {
      next("Invalid Model");
    } 
    }
  } catch(error) {
    console.error(error) }
});

// router.get('/', (req, res) => res.send('Howdy, folks!'));
router.get('/:model', bearerAuth, handleGetAll);
router.get('/:model/:id', bearerAuth, handleGetOne);
router.post('/:model', bearerAuth, permissions('create'), handleCreate);
router.put('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
router.patch('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  try {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  } 
  catch(error) {
    console.error(error) }
}

async function handleGetOne(req, res) {
  try {
    const id = req.params.id;
    let theRecord = await req.model.get(id)
    res.status(200).json(theRecord);
  }  
  catch(error) {
    console.error(error) }
}

async function handleCreate(req, res) {
  try {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  }
  catch(error) {
    console.error(error) }
}

async function handleUpdate(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj)
    res.status(200).json(updatedRecord);
  }
  catch(error) {
    console.error(error) }
}

// async function handlePartialUpdate(req, res) {
//   const id = req.params.id;
//   const obj = req.body;
//   let updatedRecord = await req.model.update(id, obj)
//   res.status(200).json(updatedRecord);
// }

async function handleDelete(req, res) {
  try {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
  }
  catch(error) {
      console.error(error) }
}

module.exports = router;
