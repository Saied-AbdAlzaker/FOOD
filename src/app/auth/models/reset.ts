export interface IReset {
    email: "string",
    password: "string",
    confirmPassword: "string",
    seed: "string"
}

export interface IChange {
    oldPassword: "string",
    newPassword: "string",
    confirmNewPassword: "string"
}
