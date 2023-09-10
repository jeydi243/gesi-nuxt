const axios: any = '';

export default {
    getAll: '/students',
    add: async function (payload) {
        return await axios.post('/students', payload);
    },
    addResponsable: async function (payload) {
        return await axios.post('/students/responsables', payload);
    },
    removeResponsable: async function ({ idStudent, idResponsable }) {
        return await axios.delete('/students/responsables', { params: { idStudent, idResponsable } });
    },
    getById: async function (studentID) {
        return await axios.get(`/students/${studentID}`);
    },
    getResponsables: async function (studentID) {
        return await axios.get(`/students/orders/${studentID}`);
    },
    showByEmail: async function (studentEmail) {
        return await axios.get(`/students/${studentEmail}`);
    },
    updateById: async function (studentID, data) {
        return await axios.put(`/students/${studentID}`, data);
    },
    deleteById: async function (studentID) {
        return await axios.delete(`/students/${studentID}`);
    },
    deleteByEmail: async function (studentEmail) {
        return await axios.delete(`/students/${studentEmail}`);
    },
    addDocument: async function (studentID, document) {
        return axios.post(`/students/${studentID}/documents`, document);
    },
};
