
export type ResponseLoginType = {
    avatar:string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
    error?: string
}
export type RegisterErrorResponse = {
    error?: string
}
export type LogoutResponse = {
    info?: string
    error?: string
}

export type ResponseForgotPasswordType = {
    answer?: boolean
    html?: boolean
    info?: string
    success?: boolean
    error?: string
}