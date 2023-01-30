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
       * if there is no error, return the emp object from mongoDB
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
* openapi: 3.0.0
* @openapi
* /api/employees/{empId}/tasks:
*    get:
*       summary: returns a employee objects tasks
*       description: API for returning a single employees tasks from MongoDB
*       operationId: findAllTasks
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
* openapi: 3.0.0
* @openapi
* /api/employees/{empId}/tasks:
*    post:
*       summary: adds a task to an employee document
*       description: API for creating a task for an employee
*       operationId: createTask
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
         * else handle error
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
});

/**
* openapi: 3.0.0
* @openapi
* /api/employees/{empId}/tasks:
*    put:
*       summary: updates tasks to an employee document
*       description: API for updating tasks for an employee
*       operationId: updateTask
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

/**
 * updateTask
 */
router.put('/:empId/tasks', async (req, res) => {
  try {
    Employee.findOne({ 'empId': req.params.empId }, function (err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDb server error: ' + ": " + err.message
        })
      }
      else {
        console.log(emp);

        if (emp) {
          emp.set({
            todo: req.body.todo,
            done: req.body.done
          });

          emp.save(function (err, updatedEmp) {
            if (err) {
              console.log(err);
              res.status(501).send({
                'err': 'MongoDB server error: ' + err.message
              })
            } else {
              console.log(updatedEmp);
              res.json(updatedEmp);
            }
          });
        }
        else {
          console.log('no Employee matching the passed in empId: ' + req.params.empId);
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
});

/**
* openapi: 3.0.0
* @openapi
* /api/employees/{empId}/tasks/{taskId}:
*    delete:
*       summary: removes a task to an employee document
*       description: API for deleting a task for an employee
*       operationId: deleteTask
*       parameters:
*         - name: empId
*           description: The employee requested by the user
*           in: path
*           schema:
*             type: number
*           required: true
*         - name: taskId
*           description: The id of the task to be deleted
*           in: path
*           schema:
*           type: String
*       responses:
*         '200':
*           description: Composer document
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/

/**
 * deleteTask
 */

router.delete('/:empId/tasks/:taskId', async (req, res) => {
  try {
    Employee.findOne({ 'empId': req.params.empId }, function (err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDb server error: ' + ": " + err.message
        })
      }
      else {
        console.log(emp);

        if (emp) {
          const taskId = req.params.taskId;

          const todoItem = emp.todo.find(item => item._id.toString() === taskId);
          const doneItem = emp.done.find(item => item._id.toString() === taskId);

          if (todoItem) {
            emp.todo.id(todoItem._id).remove();

            emp.save(function (err, updatedTodoItemEmp) {
              if (err) {
                console.log(err);
                res.status(501).send({
                  'err': 'MongoDB server error: ' + err.message
                })
              } else {
                console.log(updatedTodoItemEmp);
                res.json(updatedTodoItemEmp);
              }
            })
          } else if (doneItem) {
              emp.done.id(doneItem._id).remove();

              emp.save(function (err, updatedDoneItemEmp) {
                if (err) {
                  console.log(err);
                  res.status(501).send({
                    'err': 'MongoDB server error: ' + err.message
                  })
                } else {
                  console.log(updatedDoneItemEmp);
                  res.json(updatedDoneItemEmp);
                }
              })

          } else {
            console.log('Invalid taskId: ' + taskId);
            res.status(401).send({
              'err': 'Invalid taskId: ' + taskId
            })
          }
        }
        else {
          console.log('no Employee matching the passed in empId: ' + req.params.empId);
          res.status(501).send({
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
});

module.exports = router;
