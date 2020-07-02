

import {Request, Response} from 'express';
import {COURSES} from './db-data';



export function getAllCourses(req: Request, res: Response) {

    /*console.log('ERROR loading courses!');
    res.status(500).json({message: 'random error occurred.'});
    return;*/

    setTimeout(() => {

         res.status(200).json({payload: Object.values(COURSES)});

    }, 1500);
}


export function getCourseById(req: Request, res: Response) {

    const courseId = req.params['id'];

    const courses: any = Object.values(COURSES);

  // tslint:disable-next-line:no-shadowed-variable triple-equals
    const course = courses.find(course => course.id == courseId);

    res.status(200).json(course);
}
