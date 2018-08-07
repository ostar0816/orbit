const mongoose = require('mongoose');

const DharmaOrderSchema = new mongoose.Schema({
  expirationTimestampInSec: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  issuanceVersion: {
    type: String,
    required: true,
  },
  kernelVersion: {
    type: String,
    required: true,
  },
  principalAmount: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  principalToken: {
    type: String,
    required: true,
  },
  salt: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  termsContract: {
    type: String,
    required: true,
  },
  termsContractParameters: {
    type: String,
    required: true,
  },
  creditor: {
    type: String,
    required: true,
  },
  creditorFee: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  debtor: {
    type: String,
    required: true,
  },
  debtorFee: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  relayer: {
    type: String,
    required: true,
  },
  relayerFee: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  underwriter: {
    type: String,
    required: true,
  },
  underwriterFee: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  underwriterRiskRating: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  creditorSignature: {
    r: String,
    s: String,
    v: Number,
  },
  debtorSignature: {
    r: String,
    s: String,
    v: Number,
  },
  underwriterSignature: {
    r: String,
    s: String,
    v: Number,
  },
});

const DebtSchema = new mongoose.Schema({
  amortizationUnit: {
    type: String,
    enum: [
      'hours',
      'days',
      'weeks',
      'months',
      'years',
    ],
    required: true,
  },
  collateralAmount: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  collateralTokenSymbol: {
    type: String,
    required: true,
  },
  debtor: {
    type: String,
    required: true,
  },
  description: String,
  fillLoanShortUrl: String,
  gracePeriodInDays: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  interestRate: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  issuanceHash: {
    type: String,
    required: true,
    unique: true,
  },
  principalAmount: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  principalTokenSymbol: {
    type: String,
    required: true,
  },
  termLength: {
    type: mongoose.Schema.Types.BigNumber,
    required: true,
  },
  networkId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [
      'pending',
      'filled',
    ],
    default: 'pending',
  },
  dharmaOrder: DharmaOrderSchema,
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  toJSON: {
    getters: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  },
});

module.exports = mongoose.model('Debt', DebtSchema);
