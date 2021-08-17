namespace SpriteKind {
    export const Coin = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -225
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy()
    Money += sprites.readDataNumber(otherSprite, "Cash Change") * Coin_Multiplier
})
function Make_Normal_Coin () {
    if (sprites.allOfKind(SpriteKind.Coin).length <= Max_Coins) {
        NewCoin = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Coin)
        animation.runImageAnimation(
        NewCoin,
        [img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `,img`
            . . b b b . . . 
            . b 5 5 5 b . . 
            b 5 d 3 d 5 b . 
            b 5 3 5 1 5 b . 
            c 5 3 5 1 d c . 
            c 5 d 1 d d c . 
            . f d d d f . . 
            . . f f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 d 1 5 b . 
            . b 5 3 1 5 b . 
            . c 5 3 1 d c . 
            . c 5 1 d d c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . . b 1 1 b . . 
            . . b 5 5 b . . 
            . . b d d b . . 
            . . c d d c . . 
            . . c 3 3 c . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 1 d 5 b . 
            . b 5 1 3 5 b . 
            . c d 1 3 5 c . 
            . c d d 1 5 c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `],
        100,
        true
        )
        tiles.placeOnRandomTile(NewCoin, assets.tile`transparency8`)
        sprites.setDataNumber(NewCoin, "Cash Change", 1)
    }
}
let NewCoin: Sprite = null
let Coin_Multiplier = 0
let Max_Coins = 0
let Money = 0
let mySprite: Sprite = null
tiles.setSmallTilemap(tilemap`level1`)
for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
    tiles.setWallAt(value, true)
}
mySprite = sprites.create(img`
    . 8 8 8 8 8 8 . 
    8 8 8 8 1 1 8 8 
    8 8 8 8 8 8 1 8 
    8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 
    8 8 8 8 8 8 8 8 
    . 8 8 8 8 8 8 . 
    `, SpriteKind.Player)
mySprite.ay = 500
controller.moveSprite(mySprite, 100, 0)
scene.cameraFollowSprite(mySprite)
let textSprite = textsprite.create(conv.ConvertNumber(Money), 0, 5)
textSprite.setOutline(1, 6)
textSprite.left = 2
textSprite.top = 2
textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
scene.setBackgroundColor(14)
Max_Coins = 6
Coin_Multiplier = 1
game.onUpdate(function () {
    textSprite.setText(conv.ConvertNumber(Money))
})
forever(function () {
    Make_Normal_Coin()
    pause(randint(1000, 3500))
})
