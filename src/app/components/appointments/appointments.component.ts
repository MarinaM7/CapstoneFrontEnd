import { getLocaleTimeFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Report } from 'src/app/model/report';
import { Userc } from 'src/app/model/userConstructor';
import { AppointmentsService } from 'src/app/service/appointments.service';
import { ReportserviceService } from 'src/app/service/report.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {

  appointments: Appointment[] = [];
  reports: Report[] = [];

  user: Userc | undefined;
  patient: string = 'ROLE_USER_PATIENT';
  doctor: string = 'ROLE_USER_DOCTOR';
  admin: string = 'ROLE_ADMIN';

  IdAppointmentToUpdate: number = 0;
  lastAppointmentFound: Appointment | undefined;
  appointmentReport: Appointment | undefined;
  appointmentAlreadyHasReport : boolean | undefined;

  constructor(private router: Router, private appSrv: AppointmentsService, private reportSrv: ReportserviceService) {
    let userLogged: any = localStorage.getItem('user');
    this.user = JSON.parse(userLogged);
    console.log(this.user);
    //this.getAllAppointments();
    this.getLastAppointmentByPatientId();
  }

  ngOnInit(): void {
    if(!this.user){
      this.router.navigate([""])
    }
    if(this.user?.roles.includes(this.doctor)){
      this.getAppointmentsByDoctorId();
    };
    if(this.user?.roles.includes(this.patient)) this.getAppointmentsByPatientId();
    //this.getAllAppointments();
  }

  getAllAppointments(): Appointment[] {
    this.appSrv.getAllAppointemnts().subscribe((data) => {
      console.log(data);
      this.appointments = data;
    });
    return this.appointments;
  }

  getAppointmentsByPatientId() {
    this.appSrv.getAppointemntsByPatientId(this.user?.id).subscribe((data) => {
      console.log(data);
      this.appointments = data;
    });
    this.reportSrv.getReportsByPatientId(this.user?.id).subscribe((data) => {
      console.log(data);
      this.reports = data;
    })
  }

  getAppointmentsByDoctorId() {
    this.appSrv.getAppointemntsByDoctorId(this.user?.id).subscribe((data) => {
      console.log(data);
      this.appointments = data;
    });
    this.reportSrv.getReportsByDoctorId(this.user?.id).subscribe((data) => {
      console.log(data);
      this.reports = data;
    })
  }

  checkIfAppointmentAlreadyHasReport(app_id:number){
    let existingReport = this.reports.find((rep) => rep.appointment.id == app_id);
    if(existingReport == null) return true
    else return false;
  }

  // PUT APPOINTMENT

  getIdAppointment(id: number) {
    console.log(id);
    this.IdAppointmentToUpdate = id;
  }

  updateAppointment(form: NgForm, id: number) {
    this.getAllAppointments;

    //let AppointmentToUpdate = this.appointments.find((app) => app.id === id);

    let editAppointment: Partial<Appointment> = {
      date: form.value.date,
      time: form.value.time,
      // already existing data
      sex: this.lastAppointmentFound?.sex,
      birthDate: this.lastAppointmentFound?.birthDate,
      birthCity: this.lastAppointmentFound?.birthCity,
      address: this.lastAppointmentFound?.address,
      phoneNumber: this.lastAppointmentFound?.phoneNumber,
    };

    this.appSrv
      .updateAppointment(editAppointment, this.IdAppointmentToUpdate)
      .subscribe(
        (response) => console.log('Appointment updated:', response),
        (error) => console.error('Error:', error)
      );

    window.location.reload();
  }

  checkIfAppointmentIsPassed(id:number){
    let toCheck = this.appointments.find((s) => s.id === id);
    let dateToCheck = new Date(toCheck?.date);
    let now = new Date();
    if(dateToCheck > now){
      return true
    }else{
      return false
    }
  }

  getLastAppointmentByPatientId() {
    this.appSrv.getAppointemntsByPatientId(this.user?.id).subscribe((data) => {
      this.appointments = data;
      this.lastAppointmentFound = this.appointments![this.appointments.length - 1];
      //console.log(this.lastAppointmentFound)
    });
  }

  getAppointmentReport(appointmentId:number){
    this.appSrv.getAppointemntsByItsId(appointmentId).subscribe((data) => {
      this.appointmentReport = data;
      console.log(this.appointmentReport)
    })
  }

  insertReport(form:NgForm){
    let report: Partial<Report> = {
      appointment: this.appointmentReport,
      doctor: this.appointmentReport?.doctor,
      patient: this.appointmentReport?.patient,
      globuliRossi: form.value.globuliRossi,
      emoglobina: form.value.emoglobina,
      ematocrito: form.value.ematocrito,
      luc: form.value.luc,
      neut: form.value.neutrofili,
      limph: form.value.linfociti,
      mono: form.value.monociti,
      eos: form.value.eosinofili,
      baso: form.value.basofili,
      piastrine: form.value.piastrine
    }
    this.reportSrv.insertReport(report).subscribe(
      (response) => console.log('Report insert:', response),
      (error) => console.error('Error:', error)
    )
  }

}
