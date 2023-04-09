import { Optional } from "@angular/core";
import { userDocPat } from "./userDocPat";

export class Appointment {
  constructor(
    public id: number | undefined,
    public doctor: userDocPat,
    public patient: userDocPat,
    public date: any,
    public time: any,
    // INFO about the patient
    public sex: string,
    public birthDate: any,
    public birthCity: string,
    public address: string,
    public phoneNumber: string
  ) {}
}
