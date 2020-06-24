import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course';

@Injectable({
  providedIn: 'root' // Mean just one instance of the service available to all the app.
})

export class CoursesService {

  constructor(private http: HttpClient) {

  }

  loadAllCourses(): Observable<Course[]> {
    return this.http.get('/api/courses');
  }
}
