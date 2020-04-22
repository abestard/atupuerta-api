import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ){}

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find()

        return users
    }

    async getUsersByQuery(query: {}): Promise<User[]> {
        const users = await this.userModel.find(query)

        return users
    }

    async createUser(newUser: CreateUserDTO): Promise<User> {
        const user = await this.userModel.create(newUser)
        
        return user
    }

    async deleteUser(userID: string): Promise<User> {
        const user = this.userModel.findByIdAndDelete(userID)

        return user
    }

    async updateUser(userID: string, newUserData: CreateUserDTO): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(userID, newUserData, { new: true })

        return user
    }
}
