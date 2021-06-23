function sample() {
    let binaryStr = `
        00 61 73 6d  01 00 00 00  01 0c 02 60  02 7f 7f 01
        7f 60 01 7f  01 7f 03 03  02 00 01 07  10 02 03 61
        64 64 00 00  06 73 71 75  61 72 65 00  01 0a 13 02
        08 00 20 00  20 01 6a 0f  0b 08 00 20  00 20 00 6c
        0f 0b`

    let u8Array = new Uint8Array(binaryStr.trim().split(/[\s\r\n]+/g).map(str => parseInt(str, 16)))
    WebAssembly.compile(u8Array).then(module => {
        const instance = new WebAssembly.Instance(module)
        const {
            add,
            square
        } = instance.exports

        console.log('3 + 2 =', add(3, 2))
        console.log('3^2 =', square(3))
        console.log('(2 + 6)^2 =', square(add(2 + 6)))

    })
}

var count = 0

function hanoiMove(A, B) {
    // console.log(A + ">>>" + B)
    count += 1
}

function hanoi(n, A, B, C) {
    if (n == 1) {
        hanoiMove(A, C)
    } else {
        hanoi(n - 1, A, C, B)
        hanoiMove(A, C)
        hanoi(n - 1, B, A, C)
    }
}

function hanoiFunction(n) {
    hanoi(n, 'A', 'B', 'C')
    return count
}

function forFunction(n) {
    let sum = 0
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            sum += j
        }
    }
    return sum
}