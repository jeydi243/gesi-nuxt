// import axios from "./myaxios"

// export default {
// 	routeDocuments: "/management/documents",
// 	routeFilieres: "/management/filieres",
// 	routeEmployees: "/employees", // /employees
// 	getDocuments: async function () {
// 		return axios.get(`${this.routeDocuments}`)
// 	},
// 	addDocument: async function (data) {
// 		return axios.post(`${this.routeDocuments}`, data)
// 	},
// 	updateDocument: async function (updatedDocument) {
// 		return axios.patch(`${this.routeDocuments}/update/${updatedDocument.code}`, updatedDocument)
// 	},
// 	removeDocument: async function (code) {
// 		return axios.delete(`${this.routeDocuments}/${code}`)
// 	},
// 	deleteDocument: async function (code) {
// 		return axios.delete(`${this.routeDocuments}`, { data: { code } })
// 	},

// 	getFilieres: async function () {
// 		return axios.get(`${this.routeFilieres}`)
// 	},
// 	addFiliere: async function (data) {
// 		return axios.post(`${this.routeFilieres}`, data)
// 	},
// 	updateFiliere: async function (updatedFiliere) {
// 		return axios.patch(`${this.routeFilieres}/update/${updatedFiliere.code}`, updatedFiliere)
// 	},

// 	removeFiliere: async function (code) {
// 		return axios.delete(`${this.routeFilieres}/${code}`)
// 	},
// 	softDeleteFiliere: async function (id, data) {
// 		return axios.patch(`${this.routeFilieres}/${code}`)
// 	},

// 	// Employees routes
// 	addEmployee: async function (data) {
// 		return axios.post(`${this.routeEmployees}`, data)
// 	},
// 	getEmployees: async function () {
// 		return axios.get(`${this.routeEmployees}`)
// 	},
// 	employeeBy: async function (id) {
// 		return axios.get(`${this.routeEmployees}`, { params: { id } })
// 	},

// 	addEducation: async function (id, education) {
// 		return axios.post(`${this.routeEmployees}/${id}/add_education`, education)
// 	},
// 	addEmergencyContact: async function (id, contact) {
// 		return axios.post(`${this.routeEmployees}/${id}/add_contact`, contact)
// 	},
// 	addExperience: async function (id, experience) {
// 		return axios.post(`${this.routeEmployees}/${id}/add_experience`, experience)
// 	},
// 	deleteEducation: async function (id, educationID) {
// 		return axios.delete(`${this.routeEmployees}/${id}/delete_education`, { data: { educationID } })
// 	},
// 	deleteContact: async function (id, contactID) {
// 		return axios.delete(`${this.routeEmployees}/${id}/delete_contact`, { data: { contactID } })
// 	},
// 	deleteExperience: async function (id, experienceID) {
// 		return axios.delete(`${this.routeEmployees}/${id}/delete_experience`, { data: { experienceID } })
// 	},
// 	deleteEmployee: async function (employeeID) {
// 		return axios.delete(`${this.routeEmployees}/${employeeID}`)
// 	},
// 	updateExperience: async function (employeeID, updatedExperience) {
// 		console.log("IN API: ", { employeeID, updatedExperience })
// 		return axios.patch(`${this.routeEmployees}/${employeeID}/update_experience`, { ...updatedExperience })
// 	},
// 	updateEducation: async function (employeeID, updateEducation) {
// 		return axios.patch(`${this.routeEmployees}/${employeeID}/update_education`, { ...updateEducation })
// 	},
// 	updateBiography: async function (employeeID, updatedBiography) {
// 		return axios.patch(`${this.routeEmployees}/${employeeID}/update_biography`, { ...updatedBiography })
// 	},
// 	updateOnboarding: async function (employeeID, updatedOnboarding) {
// 		return axios.patch(`${this.routeEmployees}/${employeeID}/update_onboarding`, { ...updatedOnboarding })
// 	},
// 	updateEmployeeConnexion: async function (employeeID, passwords) {
// 		return axios.patch(`${this.routeEmployees}/${employeeID}/update_password`, { ...passwords })
// 	},
// 	updateDocumentEmployee: async function (employeeID, updateDocument) {
// 		return axios.post(`${this.routeEmployees}/${employeeID}/update_document`, updateDocument, {
// 			headers: {
// 				"Content-Type": "multipart/form-data",
// 			},
// 		})
// 	},
// }
// const documents = {}
