import path from 'path'

export function pathResolver(pathFrom, pathTo) {
    if (path.parse(pathFrom).root === path.parse(pathTo).root) {
        pathTo = path.relative(pathFrom, pathTo)
    }

    const pathNew = path.join(pathFrom, pathTo)
    return pathNew
}
