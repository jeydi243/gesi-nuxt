import mgntAPI from "@/api/management"
import coursesAPI from "@/api/courses"

import { toast } from "~~/utils"
import { defineStore } from "pinia"
import { useTeachers } from "./teachers"
import { useRouter } from "vue-router"
import { useConfig } from "@/store/config"

const router = useRouter()
export const useManagement = defineStore("management", {
	state: () => ({
		courses: [],
		laptops: [],
		routeurs: [],
		listDocuments: [],
		employees: [],
		token: "null",
	}),

	actions: {
		async init() {
			try {
				const t = useTeachers()
				t.init()
				await this.getAllDocuments()
				await this.getAllEmployees()
			} catch (error) {
				console.log(error)
			}
		},

		async getAllDocuments() {
			this.listDocuments = []
			console.log("getAllDocuments")
			try {
				const { data, status } = await mgntAPI.getDocuments()
				console.log({ data }, { status })
				if (status == 200 || status == 201 || status == 304) {
					data
						.map((doc) => {
							doc["show"] = false
							return doc
						})
						.forEach((doc) => this.listDocuments.unshift(doc))
					return true
				}

				return false
			} catch (er) {
				console.log(er)
			}
		},
		async getAllEmployees() {
			this.employees = []
			try {
				const { data, status } = await mgntAPI.getEmployees()
				console.log({ status })
				if (status == 200 || status == 201 || status == 304) {
					// console.log({ employees: JSON.parse(data) })
					const datat = data /* JSON.parse(data)*/
					if (datat.length > 0) {
						// employees.forEach(this.employees.unshift)
						datat.forEach((em) => this.employees.unshift(em))
					} else {
						this.employees = data
					}
					return true
				}
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async deleteEmployee(employeeID) {
			try {
				const { status } = await mgntAPI.deleteEmployee(employeeID)
				if (status == 200 || status == 201) {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					if (index != -1) this.employees.splice(index, 1)
					else {
						console.log("Can't find this employee")
						return false
					}
					return true
				}
				return false
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async employeeBy(employeeID) {
			try {
				const { data, status } = await mgntAPI.employeeBy(employeeID)
				if (status == 200 || status == 201) {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					this.employees[index] = data[0]
					return true
				}
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async addExperience(id, experience) {
			try {
				const { data, status } = await mgntAPI.addExperience(id, experience)
				if (status == 200 || status == 201) {
					const index = this.employees.findIndex((emp) => emp._id == data.id)
					this.employees[index].experiences.unshift(data)
					return true
				}
				return false
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async addEmployee(newEmployee) {
			try {
				const { data, status, headers } = await mgntAPI.addEmployee(newEmployee)
				if (status == 200 || status == 201) {
					console.log({ data })
					this.employees.unshift({ ...data, show: false })
					return true
				} else if (status == 304) {
					console.log("Employee already exists. HEARDS=>", headers)
				}
				console.log(data)
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async addEducation(employeeID, education) {
			try {
				const { data, status } = await mgntAPI.addEducation(employeeID, education)
				if (status == 201 || status === 200) {
					let index = this.employees.findIndex((em) => em._id == employeeID)
					this.employees[index].educations.push(data)
					return true
				}
				return false
			} catch (err) {
				console.log(err)
				return false
			}
		},
		async addEmergencyContact(employeeID, contact) {
			try {
				const { data, status } = await mgntAPI.addEmergencyContact(employeeID, contact)
				if (status == 201 || status === 200) {
					let index = this.employees.findIndex((em) => em._id == employeeID)
					this.employees[index].emergencyContacts.unshift(data)
					return true
				}
				return false
			} catch (err) {
				console.log(err)
				return false
			}
		},
		async deleteEducation(employeeID, educationID) {
			try {
				const { data, status, headers } = await mgntAPI.deleteEducation(employeeID, educationID)
				console.log(status)
				if ((status == 200 || status == 201) && data != "") {
					const indexEmp = this.employees.findIndex((emp) => emp._id == employeeID)
					const indexEduc = this.employees[indexEmp].educations.findIndex((educ) => educ.id == educationID)
					if (indexEduc != -1) {
						this.employees[indexEmp].educations.splice(indexEduc, 1)
						return true
					} else {
						return false
					}
				} else if (status == 304) {
					console.log({ headers })
				}
				return false
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async deleteContact(employeeID, contactID) {
			try {
				const { data, status, headers } = await mgntAPI.deleteContact(employeeID, contactID)
				if ((status == 200 || status == 201) && data != "") {
					const indexEmp = this.employees.findIndex((emp) => emp._id == employeeID)
					const indexContact = this.employees[indexEmp].emergencyContacts.findIndex((educ) => educ.id == contactID)
					if (indexContact != -1) {
						this.employees[indexEmp].emergencyContacts.splice(indexContact, 1)
						return true
					} else {
						console.log("Ce contact n'exige déja plus")
						return false
					}
				} else if (status == 304) {
					console.log({ headers })
				}
				return false
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async deleteExperience(employeeID, experienceID) {
			try {
				const { status, headers } = await mgntAPI.deleteExperience(employeeID, experienceID)
				if (status == 200 || status == 201) {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					console.log({ index })
					const indexExp = this.employees[index].educations.findIndex((educ) => educ.id == experienceID)
					if (indexExp != -1) {
						this.employees[index].educations.splice(indexExp, 1)
						return true
					} else {
						return false
					}
				} else if (status == 304) {
					console.log({ headers })
					return false
				}
				return false
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async updateExperience(employeeID, experienceID, experience) {
			try {
				const { data, status, headers } = await mgntAPI.updateExperience(employeeID, { id: experienceID, ...experience })
				console.log({ data, status, headers })
				if ((status == 200 || status == 201) && data != "") {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					const indexExp = this.employees[index].experiences.findIndex((exp) => exp.id == experienceID)
					if (indexExp != -1) {
						this.employees[index].experiences[indexExp] = data
					} else {
						return false
					}
					return true
				} else if (status == 304) {
					console.log("Experience already exists ", headers)
					return false
				}
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async updateEducation(employeeID, educationID, education) {
			try {
				const { data, status, headers } = await mgntAPI.updateEducation(employeeID, { id: educationID, ...education })
				if ((status == 200 || status == 201) && data != "") {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					const indexExp = this.employees[index].educations.findIndex((educ) => educ.id == educationID)
					if (indexExp != -1) {
						this.employees[index].educations[indexExp] = data
					} else {
						return false
					}
					return true
				} else if (status == 304) {
					console.log("Education can't be updated ", headers)
					return false
				}
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async updateBiography(employeeID, biography) {
			try {
				const { data, status } = await mgntAPI.updateBiography(employeeID, biography)
				if ((status == 200 || status == 201) && data != "") {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					if (index != -1) {
						this.employees[index].biography = biography
					} else {
						return false
					}
					return true
				} else if (status == 304) {
					console.log("Biography can't be updated ", { headers })
					return false
				}
			} catch (er) {
				console.log(er)
			}
		},
		async changedoc(employeeID, newDoc) {
			try {
				const { data, status } = await mgntAPI.updateDocument(employeeID, newDoc)
				if ((status == 200 || status == 201) && data != "") {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					if (index != -1) {
						this.employees[index].resume_file = data //link to file on server
					} else {
						return false
					}
					return true
				} else if (status == 304) {
					console.log("Biography can't be updated ", { headers })
					return false
				}
			} catch (er) {
				console.log(er)
			}
		},
		async updateOnboarding(employeeID, onboarding) {
			try {
				const { data, status } = await mgntAPI.updateOnboarding(employeeID, onboarding)
				if ((status == 200 || status == 201) && data != "") {
					const index = this.employees.findIndex((emp) => emp._id == employeeID)
					if (index != -1) {
						this.employees[index].onboarding = onboarding
					} else {
						return false
					}
					return true
				} else if (status == 304) {
					console.log("Onboarding can't be updated ", { headers })
					return false
				}
			} catch (er) {
				console.log(er)
			}
		},
		async addDocument(newDocument) {
			try {
				const { data, status } = await mgntAPI.addDocument(newDocument)
				if (status == 200 || status == 201) {
					this.listDocuments.unshift({ ...data, show: false })
					return true
				}
				return false
			} catch (error) {
				console.log(error)
				return error["data"]["message"]
			}
		},
		async removeDocument(idDocument) {
			try {
				const { data, status } = await mgntAPI.removeDocument(idDocument)
				if (status == 200 || status == 201) {
					var index = this.listDocuments.findIndex((doc) => doc.idDocument == idDocument)
					this.listDocuments.splice(index, 1)
					console.log(data)
					return true
				}
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async deleteDocument(code) {
			try {
				const { data, status } = await mgntAPI.deleteDocument(code)
				console.log({ data }, { status })
				if (status == 200 || status == 201) {
					var index = this.listDocuments.findIndex((doc) => doc.code == code)
					if (index != -1) this.listDocuments.splice(index, 1)
					return true
				}
				return false
			} catch (er) {
				console.log(er)
				return false
			}
		},
		async updateDocument(newValues) {
			try {
				const { data, status } = await mgntAPI.updateDocument(newValues)
				console.log({ data })
				if (status < 300) {
					var index = this.listDocuments.findIndex((doc) => doc.code == data.code)
					if (index != -1) this.listDocuments[index] = { ...data, show: true }
					return true
				}
				return false
			} catch (er) {
				console.log(er)
			}
		},
		async addFiliere(newFiliere) {
			try {
				const { data, status } = await mgntAPI.addFiliere(newFiliere)
				if (status < 300) {
					this.listFilieres.unshift({ ...data, show: false })
					return true
				}
				console.log(data)
			} catch (er) {
				console.log(er)
			}
		},
		async removeFiliere(idFiliere) {
			try {
				const { data, status } = await mgntAPI.removeFiliere(idFiliere)
				if (status == 200 || status == 201) {
					var index = this.listFilieres.findIndex((filiere) => filiere.id == data.id)
					this.listFilieres.splice(index, 1)
					console.log(data)
					return true
				}
				return false
			} catch (er) {
				console.log(err)
			}
		},
		async updateFiliere(newValues) {
			try {
				const { data, status } = await mgntAPI.updateFiliere(newValues)
				if (status == 200 || status == 201) {
					const index = this.listFilieres.findIndex((filiere) => filiere.id == data.id)
					this.listFilieres[index] = data
					return true
				}
				return false
			} catch (er) {
				console.log(err)
			}
		},
		async updateEmployeeConnexion(employeeID, values) {
			try {
				const { data, status } = await mgntAPI.updateEmployeeConnexion(employeeID, values)
				if (status == 200 || status == 201) {
					return true
				}
				return false
			} catch (er) {
				console.log(er)
			}
		},
	},
	getters: {
		getCars: (state) => state.cars,
		getCourses: (state) => state.courses,
		getEmployees: (state) => state.employees,
		getLaptops: (state) => state.laptops,
		getRouteurs: (state) => state.routeurs,
		getListDocuments: (state) => state.listDocuments,
		errorCall: (state) => state.error,
	},
})
