import zlib from 'zlib'
import fs from 'fs'
import { checkAccess } from '../services/accessResolver.js'

export async function decompress(pathFrom, pathTo, pathStart) {
    return await new Promise(async (res, rej) => {
        try {
            ;[pathFrom, pathTo] = await checkAccess(
                pathFrom,
                pathTo,
                'compress'
            )
            const readStream = fs.createReadStream(pathFrom)
            const writeStream = fs.createWriteStream(pathTo)
            const brotli = zlib.createBrotliDecompress()

            const stream = readStream.pipe(brotli).pipe(writeStream)
            stream.on('error', () => rej())
            stream.on('finish', () => res(pathStart))
        } catch (error) {
            rej()
        }
    })
}
