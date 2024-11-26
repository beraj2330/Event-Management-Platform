import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { IsEmail, IsString, MinLength } from "class-validator";
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    @IsEmail()
    email:string;

    @Column()
    @IsString()
    @MinLength(6)
    password:string;

    @BeforeInsert()
    async hashPassword() {
        if(this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}