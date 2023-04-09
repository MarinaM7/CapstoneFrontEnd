import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  appointents : Appointment[] | undefined;

  constructor(private http: HttpClient) { }

  getAllAppointemnts(){
    return this.http.get<Appointment[]>("http://localhost:9090/app/appointments/all");
  }

  getAppointemntsByItsId(its_id:number|undefined){
    return this.http.get<Appointment>("http://localhost:9090/app/appointments/its_id/" + its_id);
  }

  getAppointemntsByPatientId(patient_id:number|undefined){
    return this.http.get<Appointment[]>("http://localhost:9090/app/appointments/patient_id/" + patient_id);
  }

  getAppointemntsByDoctorId(doctor_id:number|undefined){
    return this.http.get<Appointment[]>("http://localhost:9090/app/appointments/doctor_id/" + doctor_id);
  }

  updateAppointment(appointment: Partial<Appointment>, id: number): Observable<Object> {
    return this.http.put("http://localhost:9090/app/update/appointment/"+ id, appointment);
  }

  insertAppointment(appointment: Partial<Appointment>){
    return this.http.post("http://localhost:9090/app/save/appointment", appointment);
  }

  updateDetailsOnEachAppointmentByPatientId(appointment: Partial<Appointment>, patient_id:number){
    return this.http.put("http://localhost:9090/app/update/details/appointments/patient_id/"+ patient_id, appointment);
  }
}
