import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from 'src/@generated/prisma-nestjs-graphql/users/users.model';
import { CreateOneUsersArgs } from 'src/@generated/prisma-nestjs-graphql/users/create-one-users.args';
import { DeleteOneUsersArgs } from 'src/@generated/prisma-nestjs-graphql/users/delete-one-users.args';
import { UpdateOneUsersArgs } from 'src/@generated/prisma-nestjs-graphql/users/update-one-users.args';
import { FindUniqueUsersArgs } from 'src/@generated/prisma-nestjs-graphql/users/find-unique-users.args';
import { Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  //create user subscription
  @Subscription(() => Users, { name: 'userAdded' })
  async userAdded() {
    return pubsub.asyncIterator('userAdded');
  }
  //create user
  async createUser(args: CreateOneUsersArgs): Promise<Users | null> {
    const newUser = this.prisma.users.create(args);
    pubsub.publish('userAdded', { userAdded: newUser });
    return newUser;
  }

  //delete user
  async deleteUser(args: DeleteOneUsersArgs): Promise<Users | null> {
    return this.prisma.users.delete(args);
  }

  //update user
  async updateUser(args: UpdateOneUsersArgs): Promise<Users | null> {
    return this.prisma.users.update(args);
  }

  //find unique user
  async findUser(args: FindUniqueUsersArgs): Promise<Users> {
    return this.prisma.users.findUnique(args);
  }
}
