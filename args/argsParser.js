export function argsParser(argv) {
    const arr = argv.slice(2)
    if (arr.length === 0 || arr.length > 1) {
        process.stderr.write(
            'Error: username is a required argument. Restart the process "npm run start -- --username=your_username"\n'
        )
        process.exit(1)
    } else {
        const parseArr = arr[0].split('=')
        if ((parseArr[0] !== '--username', parseArr[1] === '')) {
            process.stderr.write(
                'Error: username is a required argument. Restart the process "npm run start -- --username=your_username"\n'
            )
            process.exit(1)
        } else {
            const ret = new Object()
            ret[parseArr[0].slice(2)] = parseArr[1]
            process.stdout.write(
                `Welcome to the File Manager, ${parseArr[1]}!\n`
            )

            process.on('SIGINT', () => {
                process.stdout.write(
                    `Thank you for using File Manager, ${parseArr[1]}!\n`
                )
                return process.exit(0)
            })

            return ret
        }
    }
}
