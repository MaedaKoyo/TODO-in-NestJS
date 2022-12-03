import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { List } from 'src/@generated/prisma-nestjs-graphql/list/list.model';
import { ListService } from 'src/list/list.service';
import { FindFirstListArgs } from 'src/@generated/prisma-nestjs-graphql/list/find-first-list.args';
import { FindManyListArgs } from 'src/@generated/prisma-nestjs-graphql/list/find-many-list.args';
import { CreateOneListArgs } from 'src/@generated/prisma-nestjs-graphql/list/create-one-list.args';
import { UpdateOneListArgs } from 'src/@generated/prisma-nestjs-graphql/list/update-one-list.args';
import { DeleteOneListArgs } from 'src/@generated/prisma-nestjs-graphql/list/delete-one-list.args';

@Resolver(() => List)
export class ListResolver {
  constructor(private readonly listService: ListService) {}

  //read one
  @Query(() => List)
  readOne(@Args() args: FindFirstListArgs) {
    return this.listService.findOne(args);
  }

  //read multi
  @Query(() => [List])
  readAll(@Args() args: FindManyListArgs) {
    return this.listService.findMany(args);
  }

  //create
  @Mutation(() => List)
  createList(@Args() args: CreateOneListArgs) {
    return this.listService.createList(args);
  }

  //update
  @Mutation(() => List)
  updateList(@Args() args: UpdateOneListArgs) {
    return this.listService.updateList(args);
  }

  //delete
  @Mutation(() => List)
  deleteList(@Args() args: DeleteOneListArgs) {
    return this.listService.deleteList(args);
  }
}
