export interface IRegister {
    userName: string,
    email: string,
    country: string,
    phoneNumber: number,
    profileImage: string,
    password: string,
    confirmPassword: string
}

export interface ILogin {
    email: string,
    password: string,
    token: string
}
export interface IVerify {
    email: string,
    code: string
}
export interface IResetPassword {
    email: string,
    password: string,
    confirmPassword: string,
    seed: string
}
export interface IChangePassword {
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  }
