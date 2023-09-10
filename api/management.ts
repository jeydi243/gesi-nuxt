const axios = '';

export default {
    routeDocuments: '/management/documents',
    routeFilieres: '/management/filieres',
    routeEmployees: '/employees', // /employees
    updateOnboarding: '/employees/onboarding', // /employees
    updateBiography: '/employees/biography', // /employees
    getDocuments: '/management/documents',
    addDocument: '/management/documents',
    updateElementArrayField: '/employees', // /employees
    updateDocument: async function (updatedDocument) {
        // return this.routeDocuments}/update/${updatedDocument.code}`, updatedDocument);
    },
    removeDocument: '/management/documents',
    deleteDocument: '/management/documents',
    addFiliere: '/management/filieres',
    updateFiliere: async function (updatedFiliere) {
        // return this.routeFilieres}/update/${updatedFiliere.code}`, updatedFiliere);
    },

    removeFiliere: '/management/filieres',
    softDeleteFiliere: async function (id, data) {
        // return this.routeFilieres}/${code}`);
    },

    // Employees routes
    addEmployee: '/employees',
    getEmployees: '/employees',
    addArrayField: '/employees/field',
    deleteEmployee: '/employees',
};
const documents = {};
