import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInputDTO } from './dtos/createUserInput.dto';
import { UpdateUserInputDtop } from './dtos/updateUserInput.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(id: number) {
    if (id) {
      const user = await this.prisma.user.findUnique({ where: { id } });
      return user;
    }

    return await this.prisma.user.findMany();
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user) return user;
    throw new NotFoundException();
  }

  async create(body: CreateUserInputDTO) {
    const user_with_email_exists = await this.prisma.user.findUnique({
      where: { email: body.email },
    });
    if (user_with_email_exists) {
      throw new BadRequestException('Email já cadastrado');
    }

    const newUser = await this.prisma.user.create({ data: body });
    return newUser;
  }

  async update(id: number, body: UpdateUserInputDtop) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: body,
    });
    return updatedUser;
  }

  async delete(id: number) {
    const user = this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
  }
}
