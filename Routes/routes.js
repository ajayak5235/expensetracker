
const express = require('express');

const router = express.Router();
const controller = require('../Controllers/controller1');

router.get('/add-expense',controller.getExpense);
router.post('/add-expense',controller.AddExpense);
router.post('/delete-expense',controller.DeleteExpense);
router.put('/add-expense/:id',controller.editingExpense);

module.exports = router;