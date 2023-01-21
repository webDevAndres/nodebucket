/*
============================================
 Title: employee.js
 Author: Andres Macias
 Date:   01/16/23
 Description: contains api for employees
===========================================
*/

const express = require('express');
const Employee = require('../models/employee');
const config = require('../data/config.json');
const router = express.Router();



/**
* openapi: 3.0.0
* @openapi
* /api/employees/{empId}:
*    get:
*       summary: returns a employee object
*       description: API for returning a single employee object from MongoDB
*       operationId: findEmployeeById
*       parameters:
*         - name: empId
*           description: The employee requested by the user
*           in: path
*           schema:
*             type: number
*           required: true
*       responses:
*         '200':
*           description: Composer document
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/
router.get('/:empId', async (req, res) => {
  try {
    Employee.findOne({ 'empId': req.params.empId }, function (err, emp) {
      /**
       * if there is a mongodb error, handle it and return a 501 error message
       */
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': config.mongoServerError + ": " + err.message
        })
      }
      /**
       * if there i sno error, return the emp object from mongoDB
      */
      else {
        console.log(emp);
        res.json(emp); // returns the data as JSON
      }
    })
  }
  /**
   * For any potential errors
   */
  catch (e) {
    console.log(e);
    res.status(500).send({
      'err': config.serverError + ": " + err.message
    })
  }
})


/**
 * findAllTasks
 */

router.get('/:empId/tasks', async (req, res) => {
  try {
    Employee.findOne({ 'empId': req.params.empId }, 'empId todo done', function (err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': config.mongoServerError + ": " + err.message
        })
      }
      else {
        console.log(emp);
        res.json(emp); // returns the data as JSON
      }
    })
  }
  catch (e) {
    console.log(e);
    res.status(500).send({
      'err': config.serverError + ": " + err.message
    })
  }
})

/**
 * createTask
 */
router.post('/:empId/tasks', async (req, res) => {
  try {
    Employee.findOne({ 'empId': req.params.empId }, function (err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': config.mongoServerError + ": " + err.message
        })
      }
      else {
        console.log(emp);
        /**
         * if the response is not null, then add new task
         * else handle erro
         */
        if (emp) {
          const newTask = {
            text: req.body.text
          }

          emp.todo.push(newTask);

          emp.save(function (err, updatedEmp) {
            if (err) {
              console.log(err);
              res.status(501).send({
                'err': config.mongoServerError + ': ' + err.message
              })
            } else {
              console.log(updatedEmp);
              res.json(updatedEmp);
            }
          })
        }
        else {
          res.status(401).send({
            'err': 'EmployeeId: ' + req.params.empId + ' does not belong to a registered user.'
          })
        }
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'err': config.serverError + ": " + err.message
    })
  }
})


module.exports = router;
