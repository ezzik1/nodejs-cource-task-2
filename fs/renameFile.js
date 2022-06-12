import fs from 'fs'
import path from 'path'

export async function rn(pathRn, name, pathStart) {
    return await new Promise((res, rej) => {
        fs.stat(pathRn, (err, stats) => {
            if (err || !stats.isFile() || path.parse(name).dir) {
                rej()
            } else {
                fs.rename(pathRn, name, (err) => {
                    if (err) rej()
                    res(pathStart)
                })
            }
        })
    })
}
