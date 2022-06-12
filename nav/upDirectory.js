import path from 'path'

export function up(pathUp) {
    return path.join(pathUp, '../')
}
