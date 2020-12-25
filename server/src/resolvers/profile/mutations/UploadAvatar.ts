import { Arg, Mutation, Resolver } from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { createWriteStream } from 'fs'
import path from 'path'
import { UPLOADS_DIR } from '../../../constants'
import sharp from 'sharp'

@Resolver()
export class UploadAvatarResolver {
    @Mutation(() => Boolean)
  async uploadFile (
        @Arg('file', () => GraphQLUpload)
          file: FileUpload): Promise<boolean> {
    const { createReadStream, filename } = await file

    const originalName = path.basename(filename, path.extname(filename))

    const pipeline = sharp()

    console.log('createReadStream', createReadStream)

    pipeline.clone().on('error', (err) => {
      console.log('ERROR3')
      console.log(err.message)
    }).jpeg().resize(1000).pipe(createWriteStream(path.join(UPLOADS_DIR, `${originalName}-1000.jpeg`), { autoClose: true }))

    pipeline.clone().on('error', (err) => {
      console.log('ERROR3')
      console.log(err.message)
    }).jpeg().resize(500).pipe(createWriteStream(path.join(UPLOADS_DIR, `${originalName}-500.jpeg`), { autoClose: true }))

    console.log('PIPELINE', pipeline)
    // deleted async
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(pipeline)
        .on('finish', () => resolve(true))
      // eslint-disable-next-line prefer-promise-reject-errors
        .on('error', () => reject(false))
    })
  }
}
