const axios = '';

export default {
  get: async function () {
    return await axios.get('/resources');
  },
  getById: async function (id) {
    return await axios.get(`/resources/file/${id}`);
  },
  add: async function (payload) {
    return await axios.post('/resources', payload);
  },
};
