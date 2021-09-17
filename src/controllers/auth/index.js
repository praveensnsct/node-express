import express from 'express';
import Login from './login';
import Logout from './logout';

const router = express.Router();

router.post('/', Login);
router.post('/terminate', Logout);

module.exports = router;
