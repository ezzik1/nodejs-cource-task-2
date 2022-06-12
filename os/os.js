import os from 'os'

export function OS(flag) {
    switch (flag) {
        case '--EOL':
            console.log(JSON.stringify(os.EOL))
            return
        case '--cpus':
            const cpus = os.cpus().map((e) => {
                return {
                    model: e.model,
                    speed:
                        e.speed / 1000 < 0.1
                            ? (e.speed / 1000) * 100
                            : e.speed / 1000,
                }
            })
            console.log(cpus)
            return
        case '--homedir':
            console.log(os.homedir())
            return
        case '--username':
            console.log(os.userInfo().username)
            return
        case '--architecture':
            console.log(os.arch())
            return
    }
}
