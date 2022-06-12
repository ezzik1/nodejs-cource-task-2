import { Transform } from 'stream'
import { methodsNav } from '../services/methods.js'
import { argumentResolver } from '../services/argumentResolver.js'

export class transformer extends Transform {
    constructor(user = {}, opt = {}) {
        super(opt)

        this._str = user
        this.on('error', (e) => {
            console.log(e)
        })
    }

    _transform(chunk, encoding, callback) {
        const str = chunk.toString().replace(/\r\n/g, '')
        const obj = {
            str: argumentResolver(str),
            path: this._str.dir,
        }
        new Promise(async (res, rej) => {
            if (obj.str === 'error') {
                rej('Invalid input')
            } else {
                await methodsNav(obj, this._str)
                    .catch(() => {
                        rej('Operation failed')
                    })
                    .then((ret) => {
                        res(ret)
                    })
            }
        })
            .catch((err) => {
                this.push(err + '\n')
                callback()
            })
            .then((ret) => {
                if (ret) {
                    this._str.dir = ret
                    this.push('You are currently in ' + ret + '\n')
                    callback()
                }
            })
    }
}
