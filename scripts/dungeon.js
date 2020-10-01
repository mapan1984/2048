import settings from './settings.js'

class Dungeon {
    constructor(width, height, gridSize, mapId) {
        this.width = width
        this.height = height
        this.gridSize = gridSize
        this.xMax = Math.floor(this.width / this.gridSize)  // cols
        this.yMax = Math.floor(this.height / this.gridSize)  // rows
        this._canvas = document.querySelector(mapId)
        this._canvas.width = width
        this._canvas.height = height

        this.context = this._canvas.getContext('2d')

        this.actions = {
            'ArrowUp': this.updateUp.bind(this),
            'ArrowRight': this.updateRight.bind(this),
            'ArrowDown': this.updateDown.bind(this),
            'ArrowLeft': this.updateLeft.bind(this),
        }

        this.init()
    }

    init() {
        this.grids = [
            // [0, 2, 4, 8],
            // [0, 16, 32, 64],
            // [0, 128, 256, 1024],
            // [0, 512, 0, 2048],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
        this.addNumber()
        this.addNumber()
    }

    clean() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    show() {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                let val = this.grids[y][x]

                let color
                let size
                if (settings[val]) {
                    color = settings[val].color
                    size = settings[val].size
                } else {
                    color = '#FFFFFF'
                    size = 45
                }

                this.context.strokeStyle = '#c5c8c6'
                this.context.lineWidth = 5
                this.context.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize)

                this.context.fillStyle = color
                this.context.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize)

                if (val !== 0) {
                    this.context.textAlign = 'center';
                    this.context.fillStyle = '#1d1f21'
                    this.context.font = `${size}px Arial`;
                    // this.context.fillText(val, x * this.gridSize + this.gridSize / 2, y * this.gridSize + ((50 - size) / 2 + size / 2))
                    this.context.fillText(val, x * this.gridSize + this.gridSize / 2, y * this.gridSize + 40)
                }
            }
        }
    }


    addNumber() {
        let emptyGrids = []
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.grids[y][x] == 0) {
                    emptyGrids.push([x, y])
                }
            }
        }
        if (emptyGrids.length > 0) {
            let [x, y] = emptyGrids[Math.floor(Math.random() * emptyGrids.length)]
            console.log(y, x)
            this.grids[y][x] = Math.random() > 0.3 ? 2 : 4
        }
    }

    update(direction) {
        this.actions[direction]()
        this.addNumber()
        this.clean()
        this.show()
    }

    updateLeft() {
        for (let y = 0; y < 4; y++) {
            for (let x = 3; x > 0; x--) {
                let current = this.grids[y][x]
                if (current == 0) {
                    continue
                }
                for (let nx = x - 1; nx >= 0; nx--) {
                    let next = this.grids[y][nx]
                    if (current == next) {
                        this.grids[y][x] = current + next
                        this.grids[y][nx] = 0
                        break
                    }
                }
            }

            let zeros = []
            let nums = []
            for (let x = 0; x < 4; x++) {
                if (this.grids[y][x] == 0) {
                    zeros.push(0)
                } else {
                    nums.push(this.grids[y][x])
                }
            }

            this.grids[y] = nums.concat(zeros)
        }
    }

    updateRight() {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 3; x++) {
                let current = this.grids[y][x]
                if (current == 0) {
                    continue
                }
                for (let nx = x + 1; nx < 4; nx++) {
                    let next = this.grids[y][nx]
                    if (current == next) {
                        this.grids[y][x] = current + next
                        this.grids[y][nx] = 0
                        break
                    }
                }
            }

            let zeros = []
            let nums = []
            for (let x = 0; x < 4; x++) {
                if (this.grids[y][x] == 0) {
                    zeros.push(0)
                } else {
                    nums.push(this.grids[y][x])
                }
            }

            this.grids[y] = zeros.concat(nums)
        }
    }

    updateUp() {
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 3; y++) {
                let current = this.grids[y][x]
                if (current == 0) {
                    continue
                }
                for (let ny = y + 1; ny < 4; ny++) {
                    let next = this.grids[ny][x]
                    if (current == next) {
                        this.grids[y][x] = current + next
                        this.grids[ny][x] = 0
                        break
                    }
                }
            }

            let zeros = []
            let nums = []
            for (let y = 0; y < 4; y++) {
                if (this.grids[y][x] == 0) {
                    zeros.push(0)
                } else {
                    nums.push(this.grids[y][x])
                }
            }
            let col = nums.concat(zeros)
            for (let y = 0; y < 4; y++) {
                this.grids[y][x] = col[y]
            }
        }
    }

    updateDown() {
        for (let x = 0; x < 4; x++) {
            for (let y = 3; y > 0; y--) {
                let current = this.grids[y][x]
                if (current == 0) {
                    continue
                }
                for (let ny = y - 1; ny >= 0; ny--) {
                    let next = this.grids[ny][x]
                    if (current == next) {
                        this.grids[y][x] = current + next
                        this.grids[ny][x] = 0
                        break
                    }
                }
            }

            let zeros = []
            let nums = []
            for (let y = 0; y < 4; y++) {
                if (this.grids[y][x] == 0) {
                    zeros.push(0)
                } else {
                    nums.push(this.grids[y][x])
                }
            }
            let col = zeros.concat(nums)
            for (let y = 0; y < 4; y++) {
                this.grids[y][x] = col[y]
            }
        }
    }
}

export default Dungeon
