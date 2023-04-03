import teachersAPI from "@/api/teachers"
import { defineStore } from "pinia"

export const useTeachers = defineStore("teachers", {
  state: () => ({ teachers: [] }),
  actions: {
    async init() {
      await this.getTeachers()
    },
    async getTeachers() {
      if (this.teachers.length == 0) {
        try {
          const { data, status } = await teachersAPI.getAll()
          if (status == 200 || status == 201) {
            data.forEach((element) => {
              this.teachers.unshift(element)
            })
          }
        } catch (er) {
          console.error(er)
        }
      }
    },
    async updateTeacher({ idTeacher, update }) {
      try {
        const { data, status } = await teachersAPI.updateById(idTeacher, update)
        if (status == 200 || status == 201) {
          var foundIndex = this.teachers.findIndex((t) => t.id == idTeacher)
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
    async addTeacher(newTeacher) {
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
      function (filter) {
        if (filter) {
          return state.teachers.find((professor) => professor.name.toLowerCase().includes(filter.toLowerCase()))
        }
        return state.teachers
      },
  },
})
