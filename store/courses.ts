import coursesAPI from '@/api/courses';
import { defineStore } from 'pinia';
import { useAuth } from './authentication';
export interface ICourse {
  authors: [];
  title: string;
  images?: string[];
  description?: string;
  id: number;
  parts?: [];
  tags?: [];
}
export interface StoreCourse {
  courses: ICourse[] | [];
  loading: boolean;
  defaultCourse: ICourse;
  error: string;
}
export const useCourses = defineStore('courses', {
  state: (): StoreCourse => ({
    courses: [],
    loading: false,
    error: '',
    defaultCourse: {
      parts: [],
      images: [],
      tags: [],
      authors: [],
      title: '',
      description: '',
      id: 0,
    },
  }),
  actions: {
    async init() {
      try {
        await this.getcourses();
      } catch (er) {
        console.log('Error initializing: ', er);
      }
    },
    async getcourses() {
      try {
        const { data, status } = await coursesAPI.getAll();
        if (status || 200 || status == 201) {
          console.log(data);
          data.forEach((element:ICourse) => {
            this.courses.unshift(element);
            setTimeout(() => {}, 1000);
          });
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
      }
    },
    async updateCourse({ idCourse, update }) {
      try {
        const { status, data } = await coursesAPI.updateById(idCourse, update);
        if (status == 200 || status == 201) {
          var foundIndex = this.courses.findIndex((t) => t.id == data.idCourse);
          if (foundIndex) {
            this.courses[foundIndex] = data;
          }
          return true;
        }
        return false;
      } catch (er) {
        console.log(er);
      }
    },
    async addCourse(course) {
      const auth = useAuth();
      // let dat
      try {
        const { status, data } = await coursesAPI.add({ ...this.defaultCourse, ...course, authors: [auth.user.id], createdBy: auth.user.id });
        console.log({ data });
        // dat = data
        if (status == 200 || status == 201) {
          this.courses.unshift(data as Icourse);
          return true;
        }
        return false;
      } catch (err:any) {
        // console.log({ err })
        return err.data.dto_validation_error;
      }
    },
  },
  getters: {
    mycourses: (state) =>
      function (filter) {
        if (filter) {
          return state.courses.find((professor) => professor.name.toLowerCase().includes(filter.toLowerCase()));
        }
        return state.courses;
      },
  },
});
