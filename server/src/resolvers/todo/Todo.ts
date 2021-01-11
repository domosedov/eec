import { Todo } from '../../entity/Todo'
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'

@Resolver(() => Todo)
export class TodoResolver {
  @Query(() => [Todo])
  async todos (): Promise<Todo[]> {
    const todos = await Todo.find()

    return todos
  }

  @Query(() => Todo, { nullable: true })
  async todo (@Arg('id', () => ID) id: number) {
    const todo = await Todo.findOne(id)

    if (!todo) return null

    return todo
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
