import { Todo } from '../../entity/Todo'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'

@Resolver(() => Todo)
export class TodoResolver {
  @Query(() => [Todo], { nullable: true })
  async todos (): Promise<Todo[] | null> {
    const todos = await Todo.find()

    if (!todos) return null

    return todos
  }

  @Mutation(() => Todo)
  async addTodo (
    @Arg('title') title: string,
    @Arg('description', { nullable: true }) description: string
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
