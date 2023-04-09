import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Appointment } from 'src/app/model/appointment';
import { Userc } from 'src/app/model/userConstructor';
import { userDocPat } from 'src/app/model/userDocPat';
import { AppointmentsService } from 'src/app/service/appointments.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: userDocPat;
  docs: userDocPat[] = [];

  patient: string = 'ROLE_USER_PATIENT';
  doctor: string = 'ROLE_USER_DOCTOR';
  admin: string = 'ROLE_ADMIN';

  // TODO
  // to get data from the last appointment and to insert it inside the placeholders when i click book appointment
  appointments: Appointment[] | undefined;
  lastAppointmentFound: Appointment | undefined;

  constructor(private http: HttpClient, private authSrv: AuthService, private appSrv: AppointmentsService) {
  }

  ngOnInit(): void {
    let userLogged: any = localStorage.getItem('user');
    this.user = JSON.parse(userLogged);
    console.log(this.user);
    this.getListDoctors();
    if(this.user != null){
      this.getPatientObj();
      this.getAppointmentsByPatientId();
    }
  }

  getListDoctors(){
    this.authSrv.getDocs().subscribe((data) => {
      this.docs = data;
      console.log(this.docs)
    })
  }

  IdDoctorOfAppointment: number | undefined;
  doctorOfAppointment: userDocPat | undefined;
  patientOfAppointment: userDocPat | undefined;
  sex: string | undefined;

  insertFirstAppointment(form: NgForm){

    let newAppointment: Partial<Appointment> = {
      doctor: this.doctorOfAppointment,
      patient: this.patientOfAppointment,
      date: form.value.date,
      time: form.value.time,
      sex: this.sex,
      birthDate: form.value.birthDate,
      birthCity: form.value.birthCity,
      address: form.value.address,
      phoneNumber: form.value.phoneNumber,
    };

    console.log(newAppointment)

    this.appSrv.insertAppointment(newAppointment).subscribe((res: any) => {
      console.log("appointment sent")
      console.log(res);
      location.reload();
    });
  }

  insertOtherAppointment(form: NgForm){

    let newAppointment: Partial<Appointment> = {
      doctor: this.doctorOfAppointment,
      patient: this.patientOfAppointment,
      date: form.value.date,
      time: form.value.time,
      // already existing data
      sex: this.lastAppointmentFound?.sex,
      birthDate: this.lastAppointmentFound?.birthDate,
      birthCity: this.lastAppointmentFound?.birthCity,
      address: this.lastAppointmentFound?.address,
      phoneNumber: this.lastAppointmentFound?.phoneNumber,
    };

    console.log(newAppointment)

    this.appSrv.insertAppointment(newAppointment).subscribe((res: any) => {
      console.log("appointment sent")
      console.log(res);
      location.reload();
    });
  }

  getSelectedValueSex(value:any){
    // Prints selected value
    console.log(value);
    this.sex = value;
  }

  getSelectedValueDoc(value:any){
    // Prints selected value
    console.log(value);
    this.IdDoctorOfAppointment = value;
    this.authSrv.getDocById(this.IdDoctorOfAppointment!).subscribe((data) => {
      this.doctorOfAppointment = data;
      console.log(this.doctorOfAppointment)
    })
  }

  getPatientObj(){
    this.authSrv.getPatientById(this.user.id!).subscribe((data) => {
      this.patientOfAppointment = data;
      console.log(this.patientOfAppointment)
    })
  }

  getAppointmentsByPatientId() {
    this.appSrv.getAppointemntsByPatientId(this.user?.id).subscribe((data) => {
      this.appointments = data;
      this.lastAppointmentFound = this.appointments![this.appointments.length - 1];
      console.log(this.lastAppointmentFound)
    });

  }

}
