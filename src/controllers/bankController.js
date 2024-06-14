const Bank = require('../models/bankModel');

const getBankList = async (req, res) => {
  try {
    const banks = await Bank.distinct('bank_name');
    res.status(200).json(banks);
    console.log(banks)
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const getBranchDetails = async (req, res) => {
  try {
    const branch = req.params.branch;
    const branchDetails = await Bank.findOne({ branch:branch });
    if (branchDetails) {
      res.status(200).json(branchDetails); 
      console.log(branchDetails)      
    } else {
      res.status(404).json({ error: 'Branch not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getBankList,
  getBranchDetails
};
