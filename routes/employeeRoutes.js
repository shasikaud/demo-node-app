const express = require('express');
const router = express.Router();

const { getEmployees,
        getEmployeeById,
        createEmployee,
        deleteEmployeeById,
        updateEmployeeById
} = require('../services/employeeService');

router.get('/paginate', async function(req, res, next) {
    try {
        res.json(await getEmployees(req.query.page, req.query.limit));
    } catch (err) {
        console.error(`Error while fetching employees.`, err.message);
        next(err);
    }
});

router.get('/', async function(req, res, next) {
    try {
        res.json(await getEmployeeById(req.query.id));
    } catch (err) {
        console.error(`Error while fetching employee by id.`, err.message);
        next(err);
    }
});

router.post('/', async function(req, res, next) {
    try {
        res.json(await createEmployee(req.body));
    } catch (err) {
        console.error(`Error creating employee.`, err.message);
        next(err);
    }
});

router.delete('/', async function(req, res, next) {
    try {
        res.json(await deleteEmployeeById(req.query.id));
    } catch (err) {
        console.error(`Error deleting employee.`, err.message);
        next(err);
    }
});

router.put('/', async function(req, res, next) {
    try {
        res.json(await updateEmployeeById(req.body));
    } catch (err) {
        console.error(`Error updating employee.`, err.message);
        next(err);
    }
});

module.exports = router;