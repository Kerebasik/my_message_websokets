enum PublicRoutes{
    RESET_PASSWORD='/reset-password',
    SIGNUP='/signup',
    LOGIN='/login',
    VERIFIED='/verified',
    NOT_FOUND='*'
}

enum PrivateRoutes{
    ROOT='/',
    CREATE_CHANNEL='/create-channel',
    CHAT_OUTLET=':id',
}

export {PublicRoutes, PrivateRoutes}