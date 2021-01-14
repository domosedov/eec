import { Todo } from '../../entity/Todo'
import { Arg, ID, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription } from 'type-graphql'

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
    @Arg('description', { nullable: true }) description: string,
    @PubSub('NEW_TODO') pubSub: Publisher<Todo>
  ) {
    const newTodo = await Todo.create({
      title,
      description
    }).save()

    await pubSub(newTodo)

    return newTodo
  }

  @Subscription(() => Todo, {
    topics: 'NEW_TODO'
  })
  newTodo (
    @Root() newTodo: Todo
  ): Todo {
    return newTodo
  }
}
