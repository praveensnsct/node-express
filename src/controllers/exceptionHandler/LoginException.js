import {
    INACTIVE_DISPLAY_MESSAGE,
    USER_INVALID,
    ACCESS_DENIED,
} from '../../constants/auth';

function ErrorHandler(type, message) {
    this.message = message;
    switch(type) {
        case 'InvalidUser':
            this.name = 'InvalidUser';
            this.displayMessage = USER_INVALID;
            break;
        case 'InactiveUser':
            this.name = 'InactiveUser';
            this.displayMessage = INACTIVE_DISPLAY_MESSAGE;
            break;
        case 'AccessDenied':
            this.name = 'AccessDenied';
            this.displayMessage = ACCESS_DENIED;
            break;
        default:
            this.name = 'LoginError';
            this.displayMessage = USER_INVALID;
    }
}

module.exports = ErrorHandler;