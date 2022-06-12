export function argumentResolver(str) {
    let arr = []
    let arrtemp = str.trimEnd().split('')
    let words = []

    while (arrtemp.length !== 0) {
        const el = arrtemp.shift()
        if (el === '"') {
            const len = arrtemp.length
            for (let i = 0; i < len; i++) {
                const e = arrtemp.shift()
                if (e !== '"') {
                    words.push(e)
                } else {
                    i = len
                }
            }
        } else {
            if (el === ' ') {
                arr.push(words.join(''))
                words = []
            } else {
                words.push(el)
            }
        }
        if (arrtemp.length === 0) {
            arr.push(words.join(''))
            words = []
        }
    }

    const parse = [
        'up',
        'cd',
        'ls',
        'cat',
        'add',
        'rn',
        'cp',
        'mv',
        'rm',
        'os',
        'hash',
        'compress',
        'decompress',
        '.exit',
    ]
    const os = ['--EOL', '--cpus', '--homedir', '--username', '--architecture']
    if (parse.includes(arr[0])) {
        switch (arr[0]) {
            case 'up':
            case '.exit':
            case 'ls':
                return arr.length > 1 ? 'error' : arr
            case 'cd':
            case 'cat':
            case 'add':
            case 'rm':
            case 'hash':
                return arr.length !== 2 ? 'error' : arr
            case 'os':
                return arr.length !== 2
                    ? 'error'
                    : os.includes(arr[1])
                    ? arr
                    : 'error'
            case 'rn':
            case 'cp':
            case 'mv':
            case 'compress':
            case 'decompress':
                return arr.length !== 3 ? 'error' : arr
        }
    } else {
        return 'error'
    }
}
