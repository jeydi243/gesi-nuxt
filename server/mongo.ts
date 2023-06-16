import mongoose from 'mongoose';

export default async (_nitroApp) => {
  const config = useRuntimeConfig();
  mongoose
    .connect(config.MONGO_URI_DEV)
    .then(() => console.log('Connected to database'))
    .catch((e) => console.log(e));
};
