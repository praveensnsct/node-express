import express from 'express';
import getUsers from './getUsers';
import getUser from './getUser';
import postUser from './postUser';
import updateUser from './updateUser';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', postUser);
router.patch('/:userId', updateUser);

module.exports = router;
