import studentsAPI from "@/api/students"
import { useConfig } from "@/store/config"
import { defineStore } from "pinia"

export interface Person {
  adresse?: string
  email?: string
}
export class Student implements Person {
  adresse?: string
  email?: string
  matricule?: string
  status?: string
  name?: string
  level?: string
}
export interface StudentsSTATE {
  students: Array<Student>
  listDocuments: Array<string>
}

export const useStudents = defineStore("students", {
  state: (): StudentsSTATE => ({ students: [], listDocuments: [] }),
  actions: {
    async init() {
      try {
        await this.getAllStudents()
      } catch (er) {
        console.log("Error on init students: ", er)
      }
    },
    async getAllStudents() {
      try {
        const { data, pending } = await useFetch("/teachers")
        if (status == 200 || status == 201) {
          this.students = data
          return true
        }
      } catch (er) {
        console.log(er)
      }
    },
    async addStudent(newStudent: Student) {
      try {
        const { status, data, headers } = await studentsAPI.add(newStudent)
        // console.log({ f })
        if (status == 200 || status == 201) {
          this.students.unshift({ ...data, show: false })
          return true
        } else if (status == 304) {
          console.log("Student already exists. HEARDS=>%o", headers)
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
  },
  getters: {
    getListDocuments: (state) => state.listDocuments,
    mystudents(state) {
      const config = useConfig()
      return state.students.filter((student) => student?.level?.toLowerCase() == config.currentLevelShort.toLowerCase())
    },
  },
})
