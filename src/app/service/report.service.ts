import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../model/report';

@Injectable({
  providedIn: 'root'
})
export class ReportserviceService {

  report: Report[] | undefined;

  constructor(private http: HttpClient) { }

  getReportsByPatientId(patient_id:number|undefined){
    return this.http.get<Report[]>("http://localhost:9090/reports/patient_id/" + patient_id);
  }

  getReportsByDoctorId(doctor_id:number|undefined){
    return this.http.get<Report[]>("http://localhost:9090/reports/doctor_id/" + doctor_id);
  }

  getReportsByAppointmentId(appointment_id:number|undefined){
    return this.http.get<Report[]>("http://localhost:9090/reports/appointment_id/" + appointment_id);
  }

  insertReport(report: Partial<Report>){
    return this.http.post("http://localhost:9090/reports/save/report", report);
  }
}
