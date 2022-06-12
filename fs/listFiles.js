import { readdir } from 'fs'

export async function ls(pathLs) {
    return await new Promise((res, rej) => {
        readdir(pathLs, (err, files) => {
            if (err) {
                rej()
            } else {
                console.log(files)
                res(pathLs)
            }
        })
    })
}
