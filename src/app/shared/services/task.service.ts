/*
============================================
 Title: task.service.ts
 Author: Andres Macias
 Date:   01/22/23
 Description: contains service for the task (uses the get and post http methods to retrieve and send data to database)
===========================================
*/


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})

/**
 * Description: This is the task service class that will be used to create the task service.
 * http: This is the http client that will be used to make http requests.
 * methods: findAllTasks, createTask, updateTask, deleteTask
 * findAllTasks: This method will be used to retrieve all tasks from the database.
 * createTask: This method will be used to create a new task in the database.
 * updateTask: This method will be used to update a task in the database.
 * deleteTask: This method will be used to delete a task in the database.
 */
export class TaskService {

  constructor(private http: HttpClient) { }


  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    })
  }

  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }

  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
  }
}
