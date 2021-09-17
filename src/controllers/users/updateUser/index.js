import bcrypt from 'bcrypt';
import User from '../../../models/users';

export default async (req, res, next) => {
  const { userId } = req.params;
  const {
    email, status, password, name,
  } = req.body || {};

  try {
    const userObj = {};

    if (password) {
      userObj.password = await bcrypt.hash(password, 12);
    }
    if (name) userObj.name = name;
    if (status) userObj.status = status;
    if (email) userObj.email = email;

    await User.findOneAndUpdate(
      { _id: userId },
      {
        ...userObj,
      },
    ).exec();
  } catch (ex) {
    next(ex);
    return;
  }

  res.status(204).send();
};
