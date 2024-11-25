import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('app')
export class AppController {
    @Get('protected-route')
    @UseGuards(AuthGuard('jwt'))    //Protect this route using JWT
    getProtectedData() {
        return { message: 'This is protected data'};
    }
}
