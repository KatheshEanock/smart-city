import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  registrationForm!: FormGroup;
   error:string=null
  constructor(private fb: FormBuilder,private authService:AuthService , private router:Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
      // You can send the form data to the server or perform other actions here
      this.authService.login(this.registrationForm.get('email').value,this.registrationForm.get('password').value).subscribe((res)=>{
        console.log(res);
         this.router.navigate(['dashboard']);
      },errorMessage=>{
        console.log(errorMessage);
         this.error=errorMessage
      })
}
  }
}
