using PM_Case_Managemnt_API.DTOS.Common;
using PM_Case_Managemnt_API.Models.PM;

namespace PM_Case_Managemnt_API.DTOS.PM
{
    public class PlanDto
    {
        public Guid? Id { get; set; }
        public Guid BudgetYearId { get; set; }
        public bool HasTask { get; set; }
        public string PlanName { get; set; }
        public float PlanWeight { get; set; }
        public float PlandBudget { get; set; }
        public Guid ProgramId { get; set; }
        public int ProjectType { get; set; }
        public string Remark { get; set; }
        public Guid StructureId { get; set; }
        public Guid ProjectManagerId { get; set; }
        public Guid? FinanceId { get; set; }
        public string? ProjectFunder { get; set; }
        public Guid? ZoneId { get; set; }
        public Guid? WoredaId { get; set; }
        public Guid? KebeleId { get; set; }
        public int? ZoneLevel { get; set; }
        public bool? isZoneManage { get; set; }
        ///
        //public Guid SubsidiaryOrganizationId { get; set; } 

        public bool ValidateHierarchy()
        {
            if (!ZoneLevel.HasValue) return true; // Handle null case

            switch ((ZoneLevel)ZoneLevel.Value)
            {
                case Models.PM.ZoneLevel.Zone:
                    return ZoneId.HasValue && !WoredaId.HasValue && !KebeleId.HasValue;
                case Models.PM.ZoneLevel.Woreda:
                    return ZoneId.HasValue && WoredaId.HasValue && !KebeleId.HasValue;
                case Models.PM.ZoneLevel.Kebele:
                    return ZoneId.HasValue && WoredaId.HasValue && KebeleId.HasValue;
                default:
                    return true; // For Other type
            }
        }
    }

    public class PlanViewDto
    {
        public Guid Id { get; set; }
        public string PlanName { get; set; }
        public float PlanWeight { get; set; }
        public float PlandBudget { get; set; }
        public float RemainingBudget { get; set; }
        public string ProjectManager { get; set; }
        public string FinanceManager { get; set; }

        public string Director { get; set; }
        public string StructureName { get; set; }
        public string ProjectType { get; set; }

        public int NumberOfTask { get; set; }
        public int NumberOfActivities { get; set; }
        public int NumberOfTaskCompleted { get; set; }

        public bool HasTask { get; set; }
        public Guid? BudgetYearId { get; set; }
        public Guid? ProgramId { get; set; }
        public string? Remark { get; set; }
        public Guid? StructureId { get; set; }
        public Guid? ProjectManagerId { get; set; }
        public Guid? FinanceId { get; set; }
        public string? ProjectFunder { get; set; }
        public Guid? BranchId { get; set; }
        public Guid? ZoneId { get; set; }  // Nullable
        public Guid? WoredaId { get; set; } // Nullable
        public Guid? KebeleId { get; set; } // Nullable
        public string ZoneName { get; set; }  // Nullable
        public string WoredaName { get; set; } // Nullable
        public string KebeleName { get; set; } // Nullable
        public int? ZoneLevel { get; set; }
        public bool? isZoneManage { get; set; }
    }

    public class PlanSingleViewDto
    {
        public Guid Id { get; set; }
        public string PlanName { get; set; }
        public float? PlanWeight { get; set; }

        public float RemainingWeight { get; set; }
        public float PlannedBudget { get; set; }
        public float RemainingBudget { get; set; }
        public string StartDate { get; set; }

        public string EndDate { get; set; }
        public Guid? StructureId { get; set; }
        public Guid? ZoneId { get; set; }  // Nullable
        public Guid? WoredaId { get; set; } // Nullable
        public Guid? KebeleId { get; set; } // Nullable
        public string ZoneName { get; set; }  // Nullable
        public string? WoredaName { get; set; } // Nullable
        public string? KebeleName { get; set; } // Nullable
        public int? ZoneLevel { get; set; }
        public bool? isZoneManage { get; set; }
        public List<TaskVIewDto> Tasks { get; set; }

    }

    public class TaskVIewDto
    {
        public Guid Id { get; set; }

        public string TaskName { get; set; }

        public float? TaskWeight { get; set; }

        public float RemianingWeight { get; set; }

        public int NumberofActivities { get; set; }

        public int NumberOfFinalized { get; set; }

        public int NumberOfTerminated { get; set; }

        public int FinishedActivitiesNo { get; set; }

        public int TerminatedActivitiesNo { get; set; }

        public int NumberOfMembers { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }



        public List<SelectListDto> TaskMembers { get; set; }
        public List<TaskMemoDto> TaskMemos { get; set; }

        public List<ActivityViewDto> ActivityViewDtos { get; set; }

        public bool HasActivity { get; set; }

        public float PlannedBudget { get; set; }
        public float RemainingBudget { get; set; }


    }

    public class TaskDto
    {

        public Guid? Id { get; set; }
        public string TaskDescription { get; set; }

        public bool HasActvity { get; set; }

        public float PlannedBudget { get; set; }

        public Guid PlanId { get; set; }

    }

    public class TaskMembersDto
    {
        public SelectListDto[] Employee { get; set; }
        public Guid TaskId { get; set; }
        public string RequestFrom { get; set; } = null!;
    }

    public class TaskMemoDto
    {
        public SelectListDto Employee { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime DateTime { get; set; }
    }
    public class TaskMemoRequestDto
    {
        public Guid EmployeeId { get; set; }
        public string Description { get; set; } = null!;
        public Guid TaskId { get; set; }
        public string RequestFrom { get; set; } = null!;
    }




}
