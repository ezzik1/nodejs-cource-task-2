import fs from 'fs'
import path from 'path'

export async function checkAccess(pathFrom, pathTo, method = 'fs') {
    return await new Promise((res, rej) => {
        if (method === 'fs') {
            if (path.parse(pathTo).ext === '') {
                pathTo = path.join(pathTo, path.parse(pathFrom).base)
            }
        } else {
            if (path.parse(pathTo).ext === '') {
                pathTo = path.join(pathTo, path.parse(pathFrom).name)
            }
        }
        fs.access(pathFrom, (err) => {
            if (err) rej()
        })
        fs.access(pathTo, (err) => {
            if (!err) rej()
        })
        fs.stat(pathFrom, (err, stats) => {
            if (err || !stats.isFile()) {
                rej()
            } else {
                res([pathFrom, pathTo])
            }
        })
    })
}
