const axios = '';

export default {
  getAll: async function () {
    return await axios.get('/courses');
  },
  add: async function (payload) {
    return await axios.post('/courses', payload);
  },
  getById: async function (courseID) {
    return await axios.get(`/courses/${courseID}`);
  },
  updateById: async function (courseID, data) {
    return await axios.put(`/courses/${courseID}`, data);
  },
  deleteById: async function (courseID) {
    return await axios.delete(`/courses/${courseID}`);
  },
};
