import User from '../../models/users';
  
module.exports = async (req, res, next) => {
    try {
      const userId = req.session.userId;

      await User.findOneAndUpdate(
        { email: userId },
        {
          hashKey: null,
        }
      ).exec();
  
      req.session.destroy((err) => {
        console.log('User session terminated');
        res.status(204).send();
      });
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  };
  