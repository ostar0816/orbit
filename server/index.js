require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const initMongoose = require('./factories/mongoose');
const Debt = require('./models/debt');

const app = express();

async function runApp() {
  await initMongoose();

  app.use(cors({
    origin: process.env.FRONT_HOST,
    credentials: true,
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  /*
   * Fetches all pending debts for appropriate network
   */
  app.get('/api/loans', async (req, res) => {
    const { networkId } = req.query;

    const debts = await Debt.find({ networkId, status: 'pending' }).sort('-createdAt');

    res.json({ debts });
  });

  /*
   * Creates new Debt record in MongoDB
   */
  app.post('/api/loans', async (req, res) => {
    const { debt, networkId } = req.body;

    // Just skip duplicated debts
    if ((await Debt.count({ issuanceHash: debt.issuanceHash, networkId })) > 0) {
      return res.end();
    }

    const newDebt = new Debt({
      ...debt,
      networkId,
    });

    const savedDebt = await newDebt.save();

    res.json(savedDebt);
  });

  /**
   * Changes status of pending debt with a hash to 'filled'
   */
  app.put('/api/loans/fill', async (req, res) => {
    const { issuanceHash } = req.body;

    const debt = await Debt.findOne({ issuanceHash, status: 'pending' });

    if (debt) {
      await debt.update({ status: 'filled' });
    }

    res.end();
  })

  /**
   * Removes pending loan with hash
   */
  app.delete('/api/loans', async (req, res) => {
    const { issuanceHash } = req.body;

    const debt = await Debt.findOne({ issuanceHash, status: 'pending' });

    if (debt) {
      await debt.remove();
    }

    res.end();
  });

  app.listen(process.env.SERVER_PORT, function () {
    console.error(`Listening on port ${process.env.SERVER_PORT}`);
  });
}

runApp();
