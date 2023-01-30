/**
============================================
 Title: home.component.html
 Author: Andres Macias
 Date:   01/22/23
 Description: contains code for home component. Allows for adding tasks
===========================================
 */
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../shared/models/dialog-data.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  //properties
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;
  dialogData: DialogData;

  taskForm: FormGroup = this.fb.group({
    task: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])]
  })

  constructor(private taskService: TaskService, private cookieService: CookieService, private fb: FormBuilder, private dialog: MatDialog) {
    this.employee = {} as Employee;
    this.dialogData = {} as DialogData;

    this.todo = [];
    this.done = [];


    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    this.taskService.findAllTasks(this.empId).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);
      },
      error: (e) => {
        console.log(e.message);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;

        console.log(this.todo);
        console.log(this.done);
      }
    })
  }

  ngOnInit(): void {
  }

  createTask() {
    const newTask = this.taskForm.controls['task'].value;

    this.taskService.createTask(this.empId, newTask).subscribe({
      next: (res) => {
        this.employee = res;

        console.log(this.employee);
        console.log(res);
      },
      error: (e) => {
        console.log(e.message);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;

        this.taskForm.controls['task'].setErrors({ 'incorrect': false });
      }
    })
  }

  deleteTask(taskId: string) {
    this.dialogData.header = 'Delete Record Dialog';
    this.dialogData.content = 'Are you sure you want to delete this task?';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.dialogData,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log(result)

        if (result === 'confirm') {
          this.taskService.deleteTask(this.empId, taskId).subscribe({
            next: (res) => {
              this.employee = res;
            },
            error: (e) => {
              console.log(e)
            },
            complete: () => {
              this.todo = this.employee.todo;
              this.done = this.employee.done;
            }
          })
        }
      }
    })
  }


  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      // console.log
      console.log('Item reordered in the same column');

      this.updateTaskList(this.empId, this.todo, this.done);

    } else {
      console.log('Item moved to the other column')

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  updateTaskList(empId: number, todo: Item[], done: Item[]) {
    this.taskService.updateTask(empId, todo, done).subscribe({
      next: (res) => {
        this.employee = res;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done
      }
    })
}
}
