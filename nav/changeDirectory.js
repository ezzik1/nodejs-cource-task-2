import { lstat } from 'fs'

export async function cd(pathNew) {
    return await new Promise((res, rej) => {
        lstat(pathNew, (err, stat) => {
            err || !stat.isDirectory() ? rej() : res(pathNew)
        })
    })
}
