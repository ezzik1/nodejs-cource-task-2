import crypto from 'crypto'
import fs from 'fs'

export async function Hash(pathHash, pathStart) {
    const hash = crypto.createHash('sha256')
    return new Promise((res, rej) => {
        fs.access(pathHash, (err) => {
            if (err) rej()
        })
        const readStream = fs.createReadStream(pathHash)

        readStream.on('error', () => rej())
        readStream.on('data', (data) => {
            console.log(hash.update(data.toString()).digest('hex'))
        })
        readStream.on('close', () => res(pathStart))
    })
}
