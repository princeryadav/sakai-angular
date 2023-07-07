import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/demo/api/user';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  user:User;
  roles: any[] = [{ id: 1, value: "Admin" }, { id: 2, value: "Normal User" }];
  modules: any[] = [{ id: 1, value: "Dashboard" }, { id: 2, value: "Signup" }, { id: 3, value: "Customer Journey" }, { id: 4, value: "Company Verification" }, { id: 5, value: "Call Center" }, { id: 6, value: "Company" }, { id: 7, value: "Vendors" }, { id: 8, value: "Claim Against" }, { id: 9, value: "Defaulter" }, { id: 10, value: "Published Conpanies" }, { id: 11, value: "Subscription Management" }, { id: 12, value: "Web Subscriber" }]

  constructor(private formBuilder: FormBuilder,private userService:UserService,private service: MessageService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['', [Validators.required]],
      modules: ['', [Validators.required]]
    });
  }
  get f() { return this.form.controls; }
  onSubmit(){
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    const role = this.form.controls["roles"].value;
    const modules = this.form.controls["modules"].value.map((m:any)=>m.id).join();
    this.user = {
      fullName:this.form.controls["fullName"].value,
      mobile:this.form.controls["mobile"].value,
      userTypId:role.id.toString(),
      moduleIds:modules,
      emailId:this.form.controls["email"].value,
      password: this.form.controls["password"].value
    }
    console.log(this.user)
    this.userService.register(this.user).subscribe((response:any)=>{
      if(!response.Haserror)
      {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
        this.form.reset();
        // this.router.routeReuseStrategy.shouldReuseRoute = function () {
        //   return false;
        // };
      }
    })
  }
}
