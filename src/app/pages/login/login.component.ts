import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {FormGroup, FormBuilder} from '@angular/forms'
import { DataService } from 'src/app/core/services';
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.formLogin = this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }
  onSubmit() {
   this.dataService.login(this.formLogin.value).subscribe((res: any) => {
     if(res.error  == 0) {
        this.router.navigate(["/home"])
     }else {
       localStorage.removeItem('hideMenuTopLeft')
     }
   })
  }
}

