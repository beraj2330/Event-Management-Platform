// backend/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { bcrypt} from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userService: UserService,
    ) {}

    async login(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if(!user) {
            throw new Error('User not found');
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if(!passwordMatches) {
            throw new Error('Invalid Password');
        }

        const payload: JwtPayload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);

        return {
            token,
            user: {email: user.email, id: user.id},
        };
    }
}
