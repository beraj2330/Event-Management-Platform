import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];   //Extract token from "Bearer <token>"

    if (!token) {
      return false;       //Deny access if no token is provided
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = decoded;          //Attach decoded user data to the request
      return true;
    } catch {
      return false;
    }
    
  }
}
