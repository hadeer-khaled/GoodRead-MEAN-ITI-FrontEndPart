import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class HandleTokenService {

  constructor(public jwtHelper: JwtHelperService) {}

  getRoleFromToken(token: string): string {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken ? decodedToken.role || '' : '';
  }  
}
