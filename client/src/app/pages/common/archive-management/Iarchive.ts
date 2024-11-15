
export interface IShelf {
  Id: string
  ShelfNumber: string
  Remark: string
}

export interface IRow {
  Id: string
  ShelfId: string
  RowNumber: string
  ShelfNumber: string
  Remark: string
}

export interface IFolder {
   Id :string
   ShelfId :string
   RowId :string
   FolderName :string
   RowNumber :string
   ShelfNumber :string
   Remark :string
}