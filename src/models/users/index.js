import { model as Model } from 'mongoose';
import schema from './schemas';

export default new Model('user', schema);
