// src/users/users.controller.ts
import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a new user
  @Post()
  async create(@Body() createUserDto: { email: string; password: string }): Promise<User> {
    return this.usersService.create(createUserDto.email, createUserDto.password);
  }

  // Get user by ID
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  // Update user by ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const { email, password } = updateUserDto;
    return this.usersService.update(id, email, password);
  }
}
