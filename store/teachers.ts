import teachersAPI from "@/api/teachers"
import { defineStore } from "pinia"
import { Person } from "./students"

export class Teacher implements Person {}

interface storeTeacher {
  teachers: Teacher[]
  // addTeacher(p: Teacher): true
}

export const useTeachers = defineStore("teachers", {
  state: (): storeTeacher => ({ teachers: [] }),
  actions: {
    async init() {
      await this.getTeachers()
    },
    async getTeachers() {
      if (this.teachers.length == 0) {
        try {
          const { data, status } = await teachersAPI.getAll()
          if (status == 200 || status == 201) {
            data.forEach((element: any) => {
              this.teachers.unshift(element)
            })
          }
        } catch (er) {
          console.error(er)
        }
      }
    },
    async updateTeacher({ idTeacher, update }: any) {
      try {
        const { data, status } = await teachersAPI.updateById(idTeacher, update)
        if (status == 200 || status == 201) {
          var foundIndex = this.teachers.findIndex((t) => t?.id == idTeacher)
          if (foundIndex >= 0) {
            this.teachers[foundIndex] = data
          }
          return true
        } else {
          return false
        }
      } catch (er) {
        console.log(er)
      }
    },
    async addTeacher(newTeacher: any) {
      try {
        const { data, status } = await teachersAPI.add(newTeacher)
        if (status == 200 || status == 201) {
          this.teachers.unshift(data)
          return true
        }
        return false
      } catch (er) {
        console.log(er)
      }
    },
  },
  getters: {
    myteachers: (state) =>
      function (filter: string): Array<Teacher> {
        if (filter) {
          return state.teachers.find((professor) => professor?.name.toLowerCase().includes(filter.toLowerCase()))
        }
        return state.teachers
      },
  },
})
