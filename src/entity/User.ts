import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { MinLength } from "class-validator";
@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    
    firstname: string

    @Field()
    @Column()
    lastname: string

    @Column()
    @MinLength(6)
    password: string

    @Column('bool', { default: false })
    confirmed: boolean

    @Field()
    @Column("text", { unique: true })
    email: string

    @Field()
    name(@Root() parent: User):string {
        return `${parent.firstname} ${parent.lastname}`
    }
}