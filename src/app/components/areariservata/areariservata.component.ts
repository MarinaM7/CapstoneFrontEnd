
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { Userc } from 'src/app/model/userConstructor';
import { userDocPat } from 'src/app/model/userDocPat';
import { AppointmentsService } from 'src/app/service/appointments.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-areariservata',
  templateUrl: './areariservata.component.html',
  styleUrls: ['./areariservata.component.scss']
})
export class AreariservataComponent implements OnInit {

  user: Userc | undefined;

  userInfo: userDocPat | undefined;
  patientOfAppointment: userDocPat | undefined;

  appointments: Appointment[] | undefined;
  lastAppointmentFound: Appointment | undefined;
  sex: any;

  constructor(private router: Router, private authSrv: AuthService, private appSrv: AppointmentsService) {
    if(localStorage.getItem("user")) {
      let userLogged: any = localStorage.getItem("user");
      this.user = JSON.parse(userLogged);
      console.log(this.user);
      this.authSrv.getUserById(this.user!.id!).subscribe((data) => {
        this.userInfo = data;
        // this userInfo = data IS UNDEFINED
        console.log(data)
      })
    }
  }

  ngOnInit(): void {
    if(!this.user){
      this.router.navigate([""])
    }
   this.getLastAppointmentByPatientId();
  }

  getLastAppointmentByPatientId() {
    this.appSrv.getAppointemntsByPatientId(this.user!.id).subscribe((data) => {
      this.appointments = data;
      this.lastAppointmentFound = this.appointments![this.appointments.length - 1];
      console.log(this.lastAppointmentFound)
    });
  }

  getSelectedValueSex(value:any){
    // Prints selected value
    console.log(value);
    this.sex = value;
  }

  updateDetailsOnUserAndOnEachAppointment(form: NgForm, id: number) {

    // ! USER DATA IS A READONLY RESOURCE, I CAN NOT EXECUTE A PUT REQ
    // update USER_PATIENT
    // let editUser: Partial<userDocPat> = {
    //   firstName: form.value.firstName,
    //   lastName: form.value.lastName,
    //   username: form.value.username,
    //   email: form.value.email
    // }

    // this.authSrv.updateUserById(id, editUser)
    //   .subscribe(
    //     (response) => console.log('Details updated for the user:' + id, response),
    //     (error) => console.error('Error:', error));

    // update User details on each Appointment
    let editAppointment: Partial<Appointment> = {
      sex: this.sex,
      birthDate: form.value.birthDate,
      birthCity: form.value.birthCity,
      address: form.value.address,
      phoneNumber: form.value.phoneNumber,
    };

    this.appSrv.updateDetailsOnEachAppointmentByPatientId(editAppointment, id)
      .subscribe(
        (response) => console.log('Details on each appointment updated for the user:' + id, response),
        (error) => console.error('Error:', error)
      );
  }

}
