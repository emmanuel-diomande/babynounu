import { use } from 'passport';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { AUTH_SIGN_IN_TYPE, AUTH_SIGN_UP_TYPE } from 'src/types/authTypes';
import { Repository } from 'typeorm';
import { User } from '../user/user.model';
import { SginInAuthDto } from './dto/signIn.dto';
import { SginUpAuthDto } from './dto/signUp.dto';
import { SlugUtils } from 'src/utils/slug.utils';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../role/models/role.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Socket } from 'socket.io';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<Roles>,
    @Inject('PARAMETER_PROFILE_REPOSITORY')
    private readonly paremeterProfileRepository: Repository<Parameter>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // SIGN UP NEW USER
  async signUp({ signUpBody }: { signUpBody: SginUpAuthDto }) {
    // SET SLUG
    signUpBody.slug = await new SlugUtils().slug(
      signUpBody.email.substring(0, signUpBody.email.indexOf('@')) ,
      this.userRepository,
    );

    // CHECK IF USER ALREADY EXISTS
    const user = await this.userRepository.findOne({
      where: { email: signUpBody.email },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    // Checked if role exist
    const isRole = await this.paremeterProfileRepository.findOne({
      where: { slug: signUpBody.role },
    });
    if (!isRole) {
      throw new BadRequestException('The role enter not exists');
    }

    // Checked if type_profil exist
    const isTypeProfil = await this.paremeterProfileRepository.findOne({
      where: { slug: signUpBody.type_profil },
    });
    if (!isTypeProfil) {
      throw new BadRequestException('The type_profil enter not exists');
    }

    // PASSWORD HASH
    signUpBody.password = await bcryptjs.hash(signUpBody.password, 10);

    // CREATE NEW USER
    const newUser = this.userRepository.create({
      slug: signUpBody.slug,
      email: signUpBody.email,
      password: signUpBody.password,
      role: { id: isRole.id },
      type_profil: { id: isTypeProfil.id },
    });
    const userSave = await this.userRepository.save(newUser);
    if (!userSave) {
      throw new BadRequestException({ message: 'User not created' });
    }

    const User = await this.userRepository.findOne({
      where: { id: userSave?.id },
      relations: ['parent', 'nounu', 'type_profil', 'role'],
    });

    // RETURN DATA USER CREATE
    return {
      user: {
        ...User,
        access_token: (await this.authentificate(userSave)).access_token,
      },
    };
  }

  //   SIGN IN USER
  async signIn({ signInBody }: { signInBody: SginInAuthDto }) {
    // CHECK IF USER ALREADY EXISTS
    const user = await this.userRepository.findOne({
      where: { email: signInBody.email },
      relations: ['type_profil', 'role'],
    });
    if (!user) {
      throw new BadRequestException(
        "L'addresse email ou mot de passe est incorrect",
      );
    }

    // CHECK IF PASSWORD IS CORRECT
    const isPasswordCorrect = await bcryptjs.compare(
      signInBody.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException(
        "L'addresse email ou mot de passe est incorrect",
      );
    }

    //Verify if nounu or parent exist
    const isUserExist = await this.userRepository.findOne({
      where: { id: user?.id },
      relations: ['type_profil', 'nounu', 'parent', 'role'],
    });

    // RETURN DATA USER CREATE
    return {
      user: {
        ...user,
        access_token: (await this.authentificate(user)).access_token,
        profil:
          isUserExist.parent.length > 0
            ? isUserExist.parent
            : isUserExist.nounu,
      },
    };
  }

  // USER AUTHENTICATION
  async authentificate(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      profileType: user.type_profil.slug,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  // Verification is suser exist
  async isUserAuthentificateExist(email) {
    const isExist = await this.userRepository.findOne({ where: { email } });
    return isExist;
  }

  async getUserFromSocket(socket: Socket): Promise<any | null> {
    try {
      // Get the token from the socket handshake or query parameters
      const token = socket.handshake.auth?.token;
      if (!token) {
        return null;
      }

      // Verify and decode the token
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      // Get the user from the database
      const user = await this.userService.findOne(payload.id);

      return user || null;
    } catch (error) {
      return null;
    }
  }
}
