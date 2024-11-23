export interface IUsersTable {
    pageNumber: number,
    pageSize: number,
    data: IUsers[],
    name: string,
    totalNumberOfRecords: number,
    totalNumberOfPages: number
}
export interface IUsers {
    country: string,
    creationDate: string,
    email: string,
    group: IGroup,
    id: number,
    imagePath: string,
    modificationDate: string,
    phoneNumber: string,
    userName: string
}
export interface IGroup {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string
}
