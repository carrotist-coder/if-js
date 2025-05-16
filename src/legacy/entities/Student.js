import User from './User.js';
import { YEAR } from '../functions.js';

export class Student extends User {
  constructor({ admissionYear, courseName, firstName, lastName }) {
    super(firstName, lastName);
    this.admissionYear = admissionYear;
    this.courseName = courseName;
  }

  get course() {
    return YEAR - this.admissionYear;
  }
}

export class Students {
  constructor(students) {
    this.students = students.map((studentData) => new Student(studentData));
  }

  getInfo() {
    return this.students
      .sort((a, b) => a.course - b.course)
      .map(
        (student) =>
          `${student.fullName} - ${student.courseName}, ${student.course} курс`,
      );
  }
}
