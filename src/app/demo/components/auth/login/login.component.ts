import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/demo/api/user';
import { UserService } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    form: FormGroup;

    user:User;

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(private formBuilder: FormBuilder,private userService:UserService,public layoutService: LayoutService) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        if (this.form.invalid) {
          return;
        }
        console.log(this.form.value);
       this.user={
        emailId:this.form.controls["email"].value,
        password: this.form.controls["password"].value
       }
        console.log(this.user)
        this.userService.login(this.user).subscribe((response:any)=>{
          if(!response.Haserror)
          {
            const User = JSON.stringify(response.ReturnData);
            localStorage.setItem('response', User); //use different object
            // Save allEntries back to local storage
            
           localStorage.setItem("response",JSON.stringify(response.ReturnData));
            // this.router.navigate(['/layout/account']);
          }
          else
          {
            alert("Invalid credentials");
          }
        })
      }
}
