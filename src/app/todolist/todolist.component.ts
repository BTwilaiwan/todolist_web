import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  public todoList: any[] = [];
  public todoForm!: FormGroup;
  public isSubmit: boolean = false;
  public inputEdit: any[] = [];
  public dataChkbox: any;
  
  constructor(
    private fb: FormBuilder,
  ) {
    const savedList = localStorage.getItem('todoList');
    const savedchk = localStorage.getItem('todoListChk');
    if (savedList) {
      this.todoList = JSON.parse(savedList);
      this.todoList.forEach((e, i) => {
        if( e.chkbox === false) this.todoList.splice(i, 1);
        if( e.new === true) e.new = false;
      })
    }
    if (savedchk) this.dataChkbox =  JSON.parse(savedchk);
   }

  ngOnInit() {
    this.todoForm = this.fb.group({
      input: new FormControl({ value: '', disabled: false }, [Validators.required]),
    })
  }

  addTodo() {
    const datainput = this.todoForm.value.input;
    this.isSubmit = true;
    if(this.todoForm.valid) {
      this.todoList.push({
        list: datainput,
        chkbox: false,
        new: true
      });
      this.todoForm.patchValue({input: ''});
      this.isSubmit = false;
    }
  }


  deleteTodo(index: number) {
    this.todoList.splice(index, 1);
    this.saveList();
  }

  onSave(index: number, todo: string) {
    this.todoList[index].isEdit = false;
    this.todoList[index].list = todo;
    this.saveList();
  }

  selectChkbox(index?: any) {
    this.todoList[index].chkbox = true;
    this.saveList();
    localStorage.setItem('todoListChk',  JSON.stringify(this.dataChkbox));
  }

  onEdit(index: any) {
    this.todoList[index].isEdit = true;
    this.inputEdit[index] = this.todoList[index].list;
  }

  private saveList() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

}
