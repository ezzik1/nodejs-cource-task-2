import fs from 'fs'

export async function add(pathAdd, pathStart) {
    return await new Promise((res, rej) => {
        fs.access(pathAdd, (err) => {
            if (!err) rej()
        })
        const writeStream = fs.createWriteStream(pathAdd)

        writeStream.on('error', () => rej())
        writeStream.on('open', () => writeStream.end())
        writeStream.on('finish', () => res(pathStart))
    })
}
