import { Arg, Mutation, Resolver } from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { createWriteStream } from 'fs'
import path from 'path'
import { UPLOADS_DIR } from '../../../constants'

@Resolver()
export class UploadAvatarResolver {
    @Mutation(() => Boolean)
  async uploadFile (
        @Arg('file', () => GraphQLUpload)
          file: FileUpload): Promise<boolean> {
    const { createReadStream, filename } = await file

    console.log(createReadStream)

    // const pathName= path.join('.', 'uploads', filename);
    const pathName = path.join(UPLOADS_DIR, filename)
    console.log(pathName)

    // deleted async
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(pathName, { autoClose: true }))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    })
  }
}
