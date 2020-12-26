import {
  Resolver,
  Mutation,
  Ctx
} from 'type-graphql'

import { AppContext } from '../../../types/AppContext'

@Resolver()
export class LogoutResolver {
    @Mutation(() => Boolean, { nullable: true })
  async logout (
        @Ctx() ctx: AppContext
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return ctx.req.session.destroy(err => {
        if (err) {
          console.log(err)
          // eslint-disable-next-line prefer-promise-reject-errors
          return reject(false)
        }

        // TODO Добавить домен и путь для удаления кук!!!
        ctx.res.clearCookie('qid')
        return resolve(true)
      })
    })
  }
}
