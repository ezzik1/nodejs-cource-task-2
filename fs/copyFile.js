import fs from 'fs'
import { checkAccess } from '../services/accessResolver.js'

export async function cp(pathFrom, pathTo, pathStart) {
    return await new Promise(async (res, rej) => {
        try {
            ;[pathFrom, pathTo] = await checkAccess(pathFrom, pathTo)
            const readStream = fs.createReadStream(pathFrom)
            const writeStream = fs.createWriteStream(pathTo)

            const stream = readStream.pipe(writeStream)

            stream.on('error', () => rej())
            stream.on('finish', () => res(pathStart))
        } catch (error) {
            rej()
        }
    })
}
