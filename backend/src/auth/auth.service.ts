import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {

        const user = await this.usersService.findOneByEmail(email);
        if (user && user.password === password) {
            const { password, ...result} = user;
            return result;    //Exclude password from the returned object
        }
        throw new UnauthorizedException();
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
