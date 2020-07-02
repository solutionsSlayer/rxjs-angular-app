import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {catchError, map, share, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {LoadingService} from '../loading/loading.service';
import {MessagesService} from '../messages/messages.service';

@Injectable({
  providedIn: 'root'
})

// This service is stateful and he can contain some methods for better consume Obs.
// ex --> filterByCategory().

export class CoursesStore {

  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable(); // This obs contain latest value of courses.

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private messagesService: MessagesService) {
      this.loadAllCourses();
  }

  private loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>('/api/courses')
      .pipe(
        map(response => response['payload']),
        catchError(err => {
          const message = 'Could not loaded courses';
          this.messagesService.showErrors(message);
          console.log(err, message);
          return throwError(err);
        }),
        tap(courses => this.subject.next(courses))
      );
    this.loadingService.showLoaderUntilCompleted(loadCourses$)
      .subscribe();
  }

  saveCourse(courseId: string, changes: Partial<Course[]>): Observable<any> {

    const courses = this.subject.getValue(); // Get last value emitted by subject.
    const index = courses.findIndex(course => course.id === courseId);
    const newCourse: Course = {
      ...courses[index],
      ...changes
    };

    const newCourses: Course[] = courses.slice(0);
    newCourses[index] = newCourse;

    this.subject.next(newCourses);

    return this.http.put(`/api/courses/${courseId}`, changes) // Http Obs
      .pipe(
        catchError(err => {
          const message = 'Something wrong with saving.';
          console.log(err, message);
          this.messagesService.showErrors(message);
          return throwError(err);
        }),
        shareReplay()
      );
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
        map(courses =>
          courses.filter(course => course.category === category)
            .sort(sortCoursesBySeqNo)
        )
      );
  }
}
