export interface IUserTable {
    pageNumber: number,
    pageSize: number,
    data: IٌUser[],
    totalNumberOfRecords: number,
    totalNumberOfPages: number
}

export interface IٌUser {
    id: number,
    userName: string,
    email: string,
    country: string,
    phoneNumber: string,
    imagePath: string,
    group: IٌGroup,
    creationDate:string,
    modificationDate: string
}

export interface IٌGroup {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string
}

export interface IRegister {
    userName: string,
    email: string,
    country: string,
    phoneNumber: string,
    profileImage: string,
    password: string,
    confirmPassword: string,
  }
