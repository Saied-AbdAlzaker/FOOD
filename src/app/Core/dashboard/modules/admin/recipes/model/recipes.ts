import { ICategory } from "../../categories/model/categories";

export interface IRecipes {
    creationDate: string,
    description: string,
    id: number,
    imagePath: string,
    modificationDate: string,
    name: string,
    price: number,
    tag: ITag,
    category: ICategory[],
}

export interface IRecipeTable {
    pageNumber: number,
    pageSize: number,
    data: IRecipes[],
    totalNumberOfRecords: number,
    totalNumberOfPages: number
}

export interface ITag {
    creationDate: string,
    id: number,
    modificationDate: string
    name: string
}

