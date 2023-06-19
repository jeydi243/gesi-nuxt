import {UserModel} from '~/server/models/User';

export default defineEventHandler(async (event) => {
  return await UserModel.find();
});
