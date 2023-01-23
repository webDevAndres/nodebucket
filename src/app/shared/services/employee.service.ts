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
export class EmployeeService {

  constructor(private http: HttpClient) { }

  findEmployeeById(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId);
  }
}
