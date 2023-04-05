const axios = '';

export default {
  get: async function () {
    return await axios.get('/organization');
  },
  getById: async function (id) {
    return await axios.get(`/organization/${id}`);
  },
  add: async function (payload) {
    return await axios.post('/organization', payload);
  },
};
