import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns = ['name','category']

  //coursesService: CoursesService;

  
  constructor(private coursesService: CoursesService, public dialog: MatDialog) {
    // this.courses = []; deve ser inicializado, declarado aqui ou como esta acima, ou no ngOnInit
    //this.coursesService= new CoursesService();
    this.courses$= this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.'); 
        return of([])})
    )
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    
  }

}
