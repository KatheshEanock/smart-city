import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

interface  IUserData {
  email:string,
  localId:string,
  idToken:string,
  password:string,
  returnSecureToken:boolean,
  expiresIn:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http:HttpClient){}

   user=new Subject<User>()

  signUpData(email,password){
  return this.http.post<IUserData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPusAzpWlOdPq-8_dGs9XAdUdVjambGPg",{
        email:email,
        password:password,
        returnSecureToken:true
   }).pipe(catchError(this.errorHandler))
  }

  login(email,password){
    return this.http.post<IUserData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPusAzpWlOdPq-8_dGs9XAdUdVjambGPg",{
       email:email,
        password:password,
        returnSecureToken:true
     }).pipe(catchError(this.errorHandler))
  }
  private errorHandler(errRes:HttpErrorResponse){
    let errorMessage='error occurred'
    if(!errRes.error || !errRes.error.error){
      return throwError(errorMessage)
    }
    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
           errorMessage="This email exists alredy"
        break;
        case  'EMAIL_NOT_FOUND':
          errorMessage="This email does not exists"
          break;
          case 'INVALID_PASSWORD':
            errorMessage="Invalid Password"
              break;
    default:
         errorMessage= errRes.error.error.message
    }return throwError(errorMessage)
  }
}


