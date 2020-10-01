import Game from './game.js'
import Dungeon from './dungeon.js'


let game = new Game(24)

let dungeon = new Dungeon(200, 200, 50, '#dungeon')

dungeon.show()

game.reset = function() {
    dungeon.clean()
    dungeon.init()
    dungeon.show()
}

game.registerAction('ArrowUp', () => {
    dungeon.update('ArrowUp')
})
game.registerAction('ArrowRight', () => {
    dungeon.update('ArrowRight')
})
game.registerAction('ArrowDown', () => {
    dungeon.update('ArrowDown')
})
game.registerAction('ArrowLeft', () => {
    dungeon.update('ArrowLeft')
})

// 按 'r' 重置
game.registerAction('r', game.reset.bind(game))

game.listen()
