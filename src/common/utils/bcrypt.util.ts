import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptUtil {
    constructor(private configService: ConfigService) { }

    generatePassword() {
        // Generate a random password
        const password = Math.random().toString(36).slice(-8);

        // Hash the password
        const salt = this.configService.get<string>('SECRET_SALT');
        console.log(salt);
        const hashedPassword = bcrypt.hashSync(password, salt);

        return hashedPassword;
    }
}