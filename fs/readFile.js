import fs, { createReadStream } from 'fs'

export async function cat(pathCat, pathStart) {
    return await new Promise((res, rej) => {
        fs.access(pathCat, (err) => {
            if (err) rej()
        })
        fs.stat(pathCat, (err, stats) => {
            if (err || !stats.isFile()) {
                rej()
            } else {
                const readStream = createReadStream(pathCat)
                readStream.on('error', () => rej())
                readStream.on('data', (data) => {
                    console.log(data.toString())
                })
                readStream.on('close', () => res(pathStart))
            }
        })
    })
}
