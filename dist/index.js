export const saveSession = ({ currentUser, rememberMe, callBack }) => {
    const _user = UserProfile;
    _user.__constructor({ ...currentUser });
    window.sessionStorage.setItem(sessionKey, JSON.stringify(currentUser));
    if (rememberMe && rememberMe === true) localStorage.setItem(sessionKey, JSON.stringify(currentUser))
    global._user = currentUser;
    callBack(undefined, _user)
};

export const retrieveSession = ({ callBack }) => {
    const session = window.sessionStorage.getItem(sessionKey) || localStorage.getItem(sessionKey)
    if (session) {
        const _session = JSON.parse(session)
        const _user = UserProfile;
        _user.__constructor({ ..._session });
        global._user = _session;
        callBack(undefined, _user)
    } else callBack(true, undefined)
};

export const detroySession = async ({ callBack }) => {
    const session = window.sessionStorage.getItem(sessionKey) || localStorage.getItem(sessionKey)
    if (session) {
        window.sessionStorage.removeItem(sessionKey);
        window.localStorage.removeItem(sessionKey);
        global._user = null
        callBack(undefined, 'resolved')
    } else {
        callBack('rejected', undefined)
    }
};