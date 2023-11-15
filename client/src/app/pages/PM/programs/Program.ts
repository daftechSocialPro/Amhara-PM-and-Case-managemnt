export interface Program {
    Id : string,

    ProgramName: string ;     
    ProgramPlannedBudget:Number;
    ProgramBudgetYear:string ;

    RemainingBudget:number

    RemainingWeight :number

    ProgramStructure :ProgramStructure[];
    NumberOfProjects: Number;
    Remark:string;
    
}

export interface ProgramStructure {

    StructureName : string ; 
    StructureHead : string ; 
}