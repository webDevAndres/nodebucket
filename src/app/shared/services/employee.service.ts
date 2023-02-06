/*
============================================
 Title: employee.service.ts
 Author: Andres Macias
 Date:   01/15/23
 Description: contains method to find employees by id
===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Description: This is the employee service class that will be used to create the employee service.
 * http: This is the http client that will be used to make http requests.
 * methods: findEmployeeById
 * findEmployeeById: This method will be used to find an employee by id.
 * empId: This is the employee id that will be used to find the employee.
 * return: This will return the employee object.
 */
export class EmployeeService {

  constructor(private http: HttpClient) { }

  findEmployeeById(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId);
  }
}
