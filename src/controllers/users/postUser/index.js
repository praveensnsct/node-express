import bcrypt from 'bcrypt';
import User from '../../../models/users';

export default async (req, res, next) => {
  const { email, name, password } = req.body;

  let result;
  try {
    const encodedPassword = await bcrypt.hash(password, 12);
    const body = {
      email,
      name,
      password: encodedPassword,
    };

    result = await new User(body).save();
    /* eslint-disable no-underscore-dangle */
    res.set('Location', `${req.baseUrl}/${result._id}`);
    res.status(204).send();
  } catch (ex) {
    console.error(ex);
    next(ex);
  }
};
