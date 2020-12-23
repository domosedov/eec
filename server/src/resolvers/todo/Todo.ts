import { Todo } from '../../entity/Todo'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'

@Resolver(() => Todo)
export class TodoResolver {
  @Query(() => [Todo], { nullable: true })
  async allTodos (): Promise<Todo[] | null> {
    const todos = await Todo.find({
      relations: ['user']
    })

    if (!todos) return null

    return todos
  }

  @Mutation(() => Todo)
  async createTodo (
      @Arg('title') title: string,
      @Arg('description') description: string
  ) {
    return await Todo.create({
      title,
      description
    }).save()
  }

  // @FieldResolver()
  // async user(@Root() todo: Todo) {
  //   const usr = await User.findOne({where: { id: todo.id }});
  //   return usr;
  // }
}
