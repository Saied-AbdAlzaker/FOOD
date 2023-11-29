export interface IٌRecipes{
    id: number,
    name: string,
    imagePath: string,
    description: string,
    price: number,
    creationDate: string,
    modificationDate: string,
    category: ICategory[],
}

export interface IٌRecipesTable {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string
}

export interface ICategory {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string
}

// {
//     "pageNumber": 1,
//     "pageSize": 10,
//     "data": [
//       {
        
//         "tag": {
//           "id": 4,
//           "name": "Vegetarian",
//           "creationDate": "2023-11-21T13:24:02.590Z",
//           "modificationDate": "2023-11-21T13:24:02.590Z"
//         }
//       },
      
//     "totalNumberOfRecords": 2,
//     "totalNumberOfPages": 1
//   }