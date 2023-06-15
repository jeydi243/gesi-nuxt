const axios: any = '';

export default {
  getAll: async function () {
    return await axios.get('/contents');
  },
  add: async function (payload) {
    return await axios.post('/contents', payload);
  },
  getById: async function (contentID) {
    return await axios.get(`/contents/${contentID}`);
  },
  updateById: async function (contentID, data) {
    return await axios.put(`/contents/${contentID}`, data);
  },
  deleteById: async function (contentID) {
    return await axios.delete(`/contents/${contentID}`);
  },
};
