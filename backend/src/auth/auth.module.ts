// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';  // Assuming a UserModule is in place.

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-jwt-secret', // Use a proper secret or environment variable.
      signOptions: { expiresIn: '1h' },
    }),
    UserModule, // Import UserModule to access UserService
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
