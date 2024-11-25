import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column({unique:true})
    email: String;

    @Column()
    password:String;
}