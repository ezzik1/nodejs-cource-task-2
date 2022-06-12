import { argsParser } from './args/argsParser.js'
import os from 'node:os'
import { transformer } from './streams/transform.js'

const arg = argsParser(process.argv)
arg.dir = os.homedir()

console.log('You are currently in ' + arg.dir)

const transformConfig = new transformer(arg)

process.stdin.resume()
process.stdin.pipe(transformConfig).pipe(process.stdout)
