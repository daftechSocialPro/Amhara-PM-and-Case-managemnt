export interface OrganizationalStructure {
  Id: string;
  OrganizationBranchId: string;
  BranchName: string;
  ParentStructureId: string;
  ParentStructureName: string;
  StructureName: string;
  Order: Number;
  Weight: Number;
  IsBranch?:boolean;
  OfficeNumber?:string;
  ParentWeight?: Number;
  Remark: string;
  RowStatus: Number;
}
