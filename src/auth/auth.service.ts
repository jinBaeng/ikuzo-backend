import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dtos/create-user.dto';
import { UserRespository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UserRespository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserInput): Promise<any> {
    // Check if user exists
    const userExists = await this.usersRepository.existsUser(
      createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await bcrypt.hash(createUserDto.password, 10);
    console.log(hash);
    const newUser = await this.usersRepository.createUser(
      createUserDto.email,
      hash,
      createUserDto.role,
    );
    console.log(newUser);
    const tokens = await this.getTokens(newUser.id + '', newUser.email);
    console.log('kk');
    console.log(tokens);
    await this.updateRefreshToken(newUser.id + '', tokens.refreshToken);
    console.log('kk');

    return tokens;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersRepository.existsUser(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id + '', user.email);
    await this.updateRefreshToken(user.id + '', tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.usersRepository.updateRefreshToken(userId, {
      refreshToken: null,
    });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    // console.log('up');
    // const hashedRefreshToken = await this.hashData(refreshToken);
    // console.log('up');

    await this.usersRepository.updateRefreshToken(userId, {
      refreshToken,
    });
    console.log('up');
  }

  async getTokens(userId: string, username: string) {
    // console.log('gettoken');
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
