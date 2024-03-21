import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  registrationForm!: FormGroup;
  error:string=null
  constructor(private fb: FormBuilder ,private authService:AuthService , private router:Router) { }

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
      this.authService.signUpData(this.registrationForm.get('email').value,this.registrationForm.get('password').value).subscribe((res)=>{
        console.log(res);
       this.router.navigate(['login'])
      },errorMess=>{
        console.log(errorMess);
         this.error=errorMess
      })
    }
  }

}
