export interface ICategory {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string
}

export interface ICategoryTable {
    pageNumber: number,
    pageSize: number,
    data: ICategory[],
    totalNumberOfRecords: number,
    totalNumberOfPages: number
}
