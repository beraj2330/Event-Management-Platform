// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password; // Ensure password is hashed before storing it
    return this.usersRepository.save(user);
  }

  // Find a user by their ID
  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Update a user's information
  async update(id: number, email?: string, password?: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (email) user.email = email;
    if (password) user.password = password; // Remember to hash the new password
    return this.usersRepository.save(user);
  }
}
