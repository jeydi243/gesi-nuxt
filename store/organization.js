import axios from "@/api/myaxios"
import { defineStore } from "pinia"
import configAPI from "@/api/config"
import orgsAPI from "@/api/orgs"
export const useOrganization = defineStore("organization", {
  state: () => ({
    count: 0,
    organizations: [],
    requestError: null,
    responseError: null,
  }),

  actions: {
    async init() {
      try {
        await this.getOrgs()
      } catch (er) {
        console.log("Error on init organizations: ", er)
      }
    },
    async setRootOrg(payload) {
      try {
        const { data, status } = configAPI.add(payload)
        console.log({ data }, { status })
        if (status == 200 || status == 201) {
          this.organizations.unshift(data)
        }
      } catch (error) {
        console.log("Can't add organization: ", error)
      }
    },
    async getOrgs() {
      try {
        const { data, status } = configAPI.getAll()
        console.log({ data }, { status })
        if (status == 200 || status == 201) {
          data.forEach((element) => {
            this.organizations.unshift(element)
          })
        }
      } catch (error) {
        console.log("Can't retrieve all organizations: ", error)
      }
    },
    async addOrg() {
      const auth = useAuth()
      try {
        const { status, data } = await orgsAPI.add({ createdBy: auth.user.id })
        console.log({ data })
        if (status == 200 || status == 201) {
          this.organizations.unshift(data)
          return true
        }
        return false
      } catch (err) {
        // console.log({ err })
        return err.data?.dto_validation_error
      }
    },
  },
  getters: {
    rootOrg: (state) => state.organizations.find((org) => org.organization_parent_id == null),
  },
})
