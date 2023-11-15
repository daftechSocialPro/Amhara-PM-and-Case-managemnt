using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

using System.Collections.Generic;
using PM_Case_Managemnt_API.Models.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM_Case_Managemnt_API.Models.PM
{
    public class Activity : CommonModel
    {

        public Activity()
        {
            ActProgress = new HashSet<ActivityProgress>();
            AssignedEmploye = new HashSet<EmployeesAssignedForActivities>();
            ActivityTargetDivisions = new HashSet<ActivityTargetDivision>();
        }

        public string ActivityDescription { get; set; } = null!;

        public DateTime ShouldStat { get; set; }

        public DateTime ShouldEnd { get; set; }

        public float PlanedBudget { get; set; }

        public DateTime? ActualStart { get; set; }

        public DateTime? ActualEnd { get; set; }

        public float? ActualBudget { get; set; }

        public Status Status { get; set; }

        public Guid? CommiteeId { get; set; }
        public virtual Commitees Commitee { get; set; } = null!;


        public Guid UnitOfMeasurementId { get; set; }
        public virtual UnitOfMeasurment UnitOfMeasurement { get; set; } = null!;

        public float Weight { get; set; }

        public float Goal { get; set; }

        public float Begining { get; set; }
        public float ActualWorked { get; set; }
        public ActivityType ActivityType { get; set; }

        [DefaultValue(0.0)]
        public float OfficeWork { get; set; }

        [DefaultValue(0.0)]
        public float FieldWork { get; set; }
        public TargetDivision? targetDivision { get; set; }
        [DefaultValue(false)]
        public Boolean PostToCase { get; set; }
        public Guid? EmployeeId { get; set; }
        public virtual Employee Employee { get; set; } = null!; 
        public Guid? PlanId { get; set; }
        public virtual Plan Plan { get; set; } = null!;
        public Guid? TaskId { get; set; }
        public virtual Task Task { get; set; } = null!;
        public Guid? ActivityParentId { get; set; }
        public virtual ActivityParent ActivityParent { get; set; } = null!;


        public ICollection<ActivityProgress> ActProgress { get; set; }
        public ICollection<EmployeesAssignedForActivities> AssignedEmploye { get; set; }
        public ICollection<ActivityTargetDivision> ActivityTargetDivisions { get; set; }
    }

    public enum ActivityType
    {
        Both,
        Office_Work,
        Fild_Work
    }
    public enum Status
    {
        Assigned,
        Started,
        Finalized,
        OnProgress,
        Terminated
    }
}
