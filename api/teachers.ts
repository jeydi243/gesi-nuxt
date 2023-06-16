const axios: any = '';

export default {
  getAll: '/teachers',
  add: '/teachers',
  getById: async function (teacherID) {
    return await axios.get(`/teachers/${teacherID}`);
  },
  showByEmail: async function (teacherEmail) {
    return await axios.get(`/teachers/${teacherEmail}`);
  },
  updateById: async function (teacherID, data) {
    return await axios.put(`/teachers/${teacherID}`, data);
  },
  deleteById: async function (teacherID) {
    return await axios.delete(`/teachers/${teacherID}`);
  },
};
