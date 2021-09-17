import crypto from 'crypto';
import User from '../../models/users';

const URLException = [
    { method: 'POST', url: '/users'},
    { method: 'POST', url: '/auth'},
];

const matchRegEx = (urlStr, urlReg) => {
    var regex = new RegExp('^' + urlReg + '$', 'm');
    return regex.test(urlStr);
}

const getUser = async (userId) => {
    const result = await User.findOne(
        { email: userId },
    ).exec();
    return result;
};

module.exports = async (req, res, next) => {
    const authToken = req.headers['authorization'] || req.headers['Authorization'];
    const urlFinder = URLException.find((resource) => {
        return matchRegEx(req.originalUrl, resource.url) && resource.method === req.method;
    });
    
    if (urlFinder) next();
    else {
        try {
            const { userId, token } = req.session;
            let activeUser = await getUser(userId);
            const hashSessionKey = activeUser.hashKey;

            if (!activeUser || !token || !hashSessionKey) throw new Error();

            const base64Hash = crypto.createHash("sha256").update(authToken).digest("base64");
            if (base64Hash === hashSessionKey) {
                next();
            } else throw new Error();
        } catch (e) {
            res.status(401).send({
                error: 'Unauthorized',
                message: 'You are not authorized to perform this action'
            });
        }
    }
}