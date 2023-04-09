import { userDocPat } from './userDocPat';
import { Appointment } from './appointment';

export class Report {
  constructor(
    public id: number | undefined,
    public doctor: userDocPat,
    public patient: userDocPat,
    public appointment: Appointment,

    // Details about the report
    public globuliRossi: number,

    public emoglobina: number,

    public ematocrito: number,

    public luc: number,

    public neut: number,

    public limph: number,

    public mono: number,

    public eos: number,

    public baso: number,

    public piastrine: number
  ) {}
}
