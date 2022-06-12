import { cd, up, pathResolver } from '../nav/index.js'
import { cp, ls, add, cat, mv, rn, rm } from '../fs/index.js'
import { OS } from '../os/os.js'
import { Hash } from '../hash/hash.js'
import { compress } from '../zlib/compress.js'
import { decompress } from '../zlib/decompress.js'

export async function methodsNav(obj, user) {
    switch (obj.str[0]) {
        case '.exit':
            if (obj.str.length === 1) {
                process.stdout.write(
                    `Thank you for using File Manager, ${user.username}!\n`
                )
                return process.exit(0)
            }
            break
        case 'up':
            return up(obj.path)
        case 'cd':
            return await cd(pathResolver(obj.path, obj.str[1]))
        case 'ls':
            return await ls(obj.path)
        case 'cat':
            return await cat(pathResolver(obj.path, obj.str[1]), user.dir)
        case 'add':
            return await add(pathResolver(obj.path, obj.str[1]), user.dir)
        case 'rn':
            return await rn(
                pathResolver(obj.path, obj.str[1]),
                pathResolver(obj.path, obj.str[2]),
                user.dir
            )
        case 'cp':
            return await cp(
                pathResolver(obj.path, obj.str[1]),
                pathResolver(obj.path, obj.str[2]),
                user.dir
            )
        case 'mv':
            return await mv(
                pathResolver(obj.path, obj.str[1]),
                pathResolver(obj.path, obj.str[2]),
                user.dir
            )
        case 'rm':
            return await rm(pathResolver(obj.path, obj.str[1]), user.dir)
        case 'os':
            OS(obj.str[1])
            return obj.path
        case 'hash':
            return await Hash(pathResolver(obj.path, obj.str[1]), user.dir)
        case 'compress':
            return await compress(
                pathResolver(obj.path, obj.str[1]),
                pathResolver(obj.path, obj.str[2]),
                user.dir
            )
        case 'decompress':
            return await decompress(
                pathResolver(obj.path, obj.str[1]),
                pathResolver(obj.path, obj.str[2]),
                user.dir
            )
    }
}
