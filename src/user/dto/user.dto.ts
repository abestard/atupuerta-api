import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
    @ApiProperty({
        description: 'Login username',
        required: true
    })
    readonly username: string

    @ApiProperty({
        description: 'First name',
        required: true
    })
    readonly firstName: string

    @ApiProperty({
        description: 'Last name',
        required: true
    })
    readonly lastName: string

    @ApiProperty({
        description: 'Login password',
        required: true
    })
    readonly password: string

    @ApiProperty({
        description: 'Not movil phone number',
        required: false
    })
    readonly phoneNumber: string

    @ApiProperty({
        description: 'Movil phone number',
        required: false
    })
    readonly movilNumber: string
}