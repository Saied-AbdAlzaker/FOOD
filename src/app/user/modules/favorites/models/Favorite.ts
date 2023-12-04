export interface IٌFavoriteTable{
    pageNumber: number,
    pageSize: number,
    data: IٌFavorite[],
    totalNumberOfRecords: number,
    totalNumberOfPages: number
}

export interface IٌFavorite {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string,
    recipe: IRecipe[],
    category: ICategory
}

export interface ICategory{
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string
}

export interface IRecipe {
    id: number,
    name: string,
    imagePath: string,
    description: string,
    price: number,
    creationDate: string,
    modificationDate: string,
}


