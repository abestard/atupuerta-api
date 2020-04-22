import { Controller, Res, HttpStatus, Body, Query, Param, NotFoundException } from '@nestjs/common';

import { Get, Post, Put, Delete } from '@nestjs/common';

import { CreateUserDTO } from './dto/user.dto'

import { UserService } from './user.service';

import { ApiBody, ApiQuery, ApiTags, ApiParam }from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}


    // /user/create
    @Post('/create')
    @ApiBody({type: CreateUserDTO})
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {    
        try {
            const user = await this.userService.createUser(createUserDTO)

            return res.status(HttpStatus.OK).json({
                message: 'User registered',
                user: user
            })   
        }
        catch (err) {
            return res.status(HttpStatus.NOT_ACCEPTABLE).json(err)   
        }
    }

    // /user/all
    @Get('/all')
    async getUsers(@Res() res) {
        try {
            const users = await this.userService.getUsers()

            res.status(HttpStatus.OK).json({
                message: 'Users',
                users: users
            })
        }
        catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
        }
    }

    // /user?username=user
    // /user?lastName=Doe
    // /user?username=jhon&firstName=Jhon
    // etc
    // Query with password field is not accepted
    @Get('/')
    @ApiQuery({name: 'username', required: false})
    @ApiQuery({name: 'firstName', required: false})
    @ApiQuery({name: 'lastName', required: false})
    @ApiQuery({name: 'phoneNumber', required: false})
    @ApiQuery({name: 'movilNumber', required: false})
    async getUser(@Res() res, @Query() query) {
        try {
            if (query.password) return res.status(HttpStatus.FORBIDDEN).json({
                message: 'Query with password field is not accepted'
            }) 

            const users = await this.userService.getUsersByQuery(query)
            
            if (!users) throw new NotFoundException({ message: 'User not found', query })
            
            return res.status(HttpStatus.OK).json({
                message: 'Users by query',
                query: query,
                users: users
            })
        }
        catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
        }
    }

    // /user/delete/userid
    @Delete('/delete/:userId')
    @ApiParam({
        name: 'userId',
        required: true
    })
    async deleteUser(@Res() res, @Param('userId') userId) {
        try {
            const user = await this.userService.deleteUser(userId)

            if (!user) throw new NotFoundException({ message: 'User not found', userId })

            return res.status(HttpStatus.OK).json({
                message: 'User deleted',
                user
            })
        }
        catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
        }
    }

    @Put('/update/:userId')
    @ApiParam({
        name: 'userId',
        required: true
    })
    async updateUser(@Res() res, @Param('userId') userId, @Body() userData) {
        try {
            const user = await this.userService.updateUser(userId, userData)

            if (!user) throw new NotFoundException({ message: 'User not found', userId })

            return res.status(HttpStatus.OK).json({
                message: 'User updated',
                user
            })
        }
        catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
        }
    }
}
