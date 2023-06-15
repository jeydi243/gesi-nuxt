import studentsAPI from '@/api/students';
import { useConfig } from '@/store/config';
import { defineStore } from 'pinia';
import { IPerson } from './management';

export interface IStudent extends IPerson {
  matricule?: string;
  adresse?: string;
  status?: string;
  email?: string;
  level?: string;
  name: string;
}
export interface StoreStudents {
  students: IStudent[];
  listDocuments: Array<string>;
}

export const useStudents = defineStore('students', {
  state: (): StoreStudents => ({ students: [], listDocuments: [] }),
  actions: {
    async init() {
      try {
        await this.getAllStudents();
      } catch (er) {
        console.log('Error on init students: ', er);
      }
    },
    async getAllStudents() {
      try {
        const { data, pending, error } = await useFetch('/teachers');
        if (!error) {
          this.students = data;
          return true;
        }
      } catch (er) {
        console.log(er);
      }
    },
    async addStudent(newStudent: IStudent) {
      try {
        const { status, data, headers } = await studentsAPI.add(newStudent);
        // console.log({ f })
        if (status == 200 || status == 201) {
          this.students.unshift({ ...data, show: false });
          return true;
        } else if (status == 304) {
          console.log('Student already exists. HEARDS=>%o', headers);
        }
        return false;
      } catch (er) {
        console.log(er);
      }
    },
  },
  getters: {
    getListDocuments: (state) => state.listDocuments,
    mystudents(state) {
      const config = useConfig();
      return state.students.filter((student) => student?.level?.toLowerCase() == config.currentLevelShort.toLowerCase());
    },
  },
});
