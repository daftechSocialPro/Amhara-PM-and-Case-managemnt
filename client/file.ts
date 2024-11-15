
  @Output() result = new EventEmitter<boolean>(); 

  toast !: toastPayload;
  branchForm!:FormGroup

  constructor(private formBuilder: FormBuilder, private orgService: OrganizationService, private commonService: CommonService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.branchForm = this.formBuilder.group({
      Name: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      Remark: ['']
    });
  }

  submit() {

    if (this.branchForm.valid) {
      this.orgService.OrgBranchCreate(this.branchForm.value).subscribe({

        next: (res) => {

          this.toast = {
            message: 'Organizational Branch Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.closeModal();
          this.branchForm = this.formBuilder.group({

            Name: [''],
            PhoneNumber: [''],
            Address: [''],
            Remark: ['']
          })

          this.result.emit(true)

        }, error: (err) => {
          this.toast = {
            message: err,
            title: 'Network error.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          

        }
      }
      );
    }

  }
  closeModal() {

    this.activeModal.close()
  }
