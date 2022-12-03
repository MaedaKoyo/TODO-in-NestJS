import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { List } from 'src/@generated/prisma-nestjs-graphql/list/list.model';
import { FindFirstListArgs } from 'src/@generated/prisma-nestjs-graphql/list/find-first-list.args';
import { FindManyListArgs } from 'src/@generated/prisma-nestjs-graphql/list/find-many-list.args';
import { CreateOneListArgs } from 'src/@generated/prisma-nestjs-graphql/list/create-one-list.args';
import { UpdateOneListArgs } from 'src/@generated/prisma-nestjs-graphql/list/update-one-list.args';
import { DeleteOneListArgs } from 'src/@generated/prisma-nestjs-graphql/list/delete-one-list.args';
import { Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  //select one
  async findOne(args: FindFirstListArgs): Promise<List | null> {
    return this.prisma.list.findFirst(args);
  }

  //select some
  async findMany(args: FindManyListArgs): Promise<List[] | null> {
    return this.prisma.list.findMany(args);
  }

  //create list subscription
  @Subscription(() => List, { name: 'listAdded' })
  async listAdded() {
    return pubsub.asyncIterator('listAdded');
  }
  //create list
  async createList(args: CreateOneListArgs): Promise<List | null> {
    const newList = this.prisma.list.create(args);
    pubsub.publish('listAdded', { listAdded: newList });
    return newList;
  }

  //update list
  async updateList(args: UpdateOneListArgs): Promise<List | null> {
    return this.prisma.list.update(args);
  }

  //delete list
  async deleteList(args: DeleteOneListArgs): Promise<List | null> {
    return this.prisma.list.delete(args);
  }
}
