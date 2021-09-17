import User from '../../../models/users';

export default async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await User.findOne(
      { _id: userId },
    ).exec();
    res.status(200).json(result);
  } catch(ex) {
    next(ex);
    return;
  }
};
