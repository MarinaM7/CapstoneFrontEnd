import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AreariservataComponent } from './components/areariservata/areariservata.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HomeComponent } from './components/home/home.component'
import { MedicalservicesComponent } from './components/medicalservices/medicalservices.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "services",
    component: MedicalservicesComponent
  },
  {
    path: "contacts",
    component: ContactsComponent
  },
  {
    path: "areariservata",
    component: AreariservataComponent
  },
  {
    path: "appointments",
    component: AppointmentsComponent
  },
  {
    path: "reports",
    component: ReportsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
