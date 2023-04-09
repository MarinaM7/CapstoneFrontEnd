import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/model/report';
import { Userc } from 'src/app/model/userConstructor';
import { ReportserviceService } from 'src/app/service/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reports: Report[] | undefined;
  user: Userc | undefined;

  patient: string = 'ROLE_USER_PATIENT';
  doctor: string = 'ROLE_USER_DOCTOR';
  admin: string = 'ROLE_ADMIN';

  constructor(private reportSrv: ReportserviceService) {
    let userLogged: any = localStorage.getItem('user');
    this.user = JSON.parse(userLogged);
    console.log(this.user);
  }

  ngOnInit(): void {
    if(this.user?.roles.includes(this.patient)) this.getReportsByPatientId();

    if(this.user?.roles.includes(this.doctor)) this.getReportsByDoctorId();
  }

  getReportsByPatientId() {
    this.reportSrv.getReportsByPatientId(this.user?.id).subscribe((data) => {
      console.log(data);
      this.reports = data;
    });
  }

  getReportsByDoctorId() {
    this.reportSrv.getReportsByDoctorId(this.user?.id).subscribe((data) => {
      console.log(data);
      this.reports = data;
    });
  }


}
