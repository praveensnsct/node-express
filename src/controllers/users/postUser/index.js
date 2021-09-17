import bcrypt from 'bcrypt';
import User from '../../../models/users';

export default async (req, res, next) => {
  const { email, name, password } = req.body;
  const { userId } = req.session;

  let result;
  try {
    const encodedPassword = await bcrypt.hash(password, 12);
    const body = {
      email: email,
      name: name,
      password: encodedPassword,
      createdBy: userId || 'admin',
    }

    result = await new User(body).save();
    res.set('Location', `${req.baseUrl}/${result._id}`);
    res.status(204).send();
  } catch (ex) {
    console.error(ex);
    next(ex);
  }
};
