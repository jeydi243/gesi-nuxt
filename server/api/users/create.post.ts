import { UserModel, UserValidation } from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let { error } = UserValidation.validate(body);
  if (error) {
    throw createError({ message: error.message.replace(/"/g, ''), statusCode: 400, fatal: false });
  }
  try {
    await UserModel.create(body);
    return { message: "L'utilisateur a été crée" };
  } catch (error: any) {
    throw createError({ message: error?.message });
  }
});
