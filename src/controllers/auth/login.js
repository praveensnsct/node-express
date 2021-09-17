import bcrypt from 'bcrypt';
import crypto from 'crypto';

import User from '../../models/users';

import {
    INVALID_USER_DESCRIPTION,
    INACTIVE_USER_DESCRIPTION,
    LOGON_RANDOM_INIT,
    LOGON_RANDOM_END,
} from '../../constants/auth';

import LoginException from '../exceptionHandler/LoginException';

const isUserNamePasswordValid = (username, password) => {
  if (username && password) return true;
  return false;
};

const getUser = async (userId) => {
    const result = await User.findOne(
        { email: userId },
    ).exec();
    return result;
};

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const generateKey = (toHash) => {
  const base64Hash = crypto.createHash('sha256').update(toHash).digest('base64');
  return base64Hash;
};

const logon = async (user) => {
  if (user.status === 'I') throw new LoginException('InactiveUser', INACTIVE_USER_DESCRIPTION);
  
  const random = getRandom(LOGON_RANDOM_INIT, LOGON_RANDOM_END);
  const toHash = `${random}${user.password}${user.email}`;
  const key = generateKey(toHash);
  const hashSessionKey = generateKey(key);

  await User.findOneAndUpdate(
    { email: user.email },
    {
      hashKey: hashSessionKey
    }
  ).exec();

  return key;
};

const loginUser = async (req, res, next) => {
  const { userId, password } = req.body;

  try {
    if (isUserNamePasswordValid(userId, password)) {
      const user = await getUser(userId);
      if (user) {
        const userEncodedPassword = user.password;
        const match = await bcrypt.compare(password, userEncodedPassword);

        if (!match) throw new LoginException('InvalidUser', INVALID_USER_DESCRIPTION);        
        
        const token = await logon(user);
    
        const session = req.session;
        session.userId = user.email;
        session.token = token;
        
        res.send({
            token,
        });
      } else throw new LoginException('InvalidUser', INVALID_USER_DESCRIPTION);
    } else throw new LoginException('InvalidUser', INVALID_USER_DESCRIPTION);
  } catch (e) {
    console.error(e);
    res.status(400).json({
        message: e.message,
        name: e.name,
        displayMessage: e.displayMessage
      });
  }
};

module.exports = loginUser;
