export type updateProfilePayloadtype={
    name:string
    avatar:string
}
export type updateProfileResponseType={
    token: string
    tokenDeathTime: number
    updatedUser:updatedUserType
    error:string
}
export type updatedUserType={
    avatar:string
    created:string
    email:string
    isAdmin: boolean
    name:string
    publicCardPacksCount: number
    rememberMe: boolean
    token:string
    tokenDeathTime: number
    updated:string
    verified: boolean
    __v: number
    _id:string
    error?:string
}