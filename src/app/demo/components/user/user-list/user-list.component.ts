import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/demo/api/user';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users:Array<User>;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((response: any) => {
      console.log(response);
      if (response.ReturnData)
        this.users = response.ReturnData
    })
  }
}
