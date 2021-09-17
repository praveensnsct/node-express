import User from '../../../models/users';

export default async (req, res, next) => {
  let users;

  try {
    users = await User.find().select('email name status modifiedOn createdOn _id').exec();
  } catch (ex) {
    next(ex);
    return;
  }

  res.status(200).json(users);
};
