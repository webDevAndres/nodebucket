/*
============================================
 Title: employee.interface.ts
 Author: Andres Macias
 Date:   01/15/23
 Description: contains interface for the employees
===========================================
*/

import {Item} from './item.interface'

export interface Employee {
  empId: number,
  firstName: string;
  lastName: string;
  todo: Item[];
  done: Item[];
}
