import fs from 'fs'

export async function rm(pathRm, pathStart) {
    return await new Promise((res, rej) => {
        fs.unlink(pathRm, (err) => {
            if (err) rej()
            res(pathStart)
        })
    })
}
