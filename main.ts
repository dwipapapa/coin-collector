namespace SpriteKind {
    export const Coin = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.locationInDirection(location, CollisionDirection.Right))
    if (game.ask("Do you want to upgrade", "Coin multiplier?")) {
        if (game.ask("For", "" + conv.ConvertNumber(Coin_Multiplier * 10) + " coins?")) {
            if (Money >= Coin_Multiplier * 10) {
                Money += 0 - Coin_Multiplier * 10
                Coin_Multiplier += Math.round(Coin_Multiplier * 1.5)
            } else {
                game.splash("Not Enough...")
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.locationInDirection(location, CollisionDirection.Left))
    if (game.ask("Do you want to upgrade", "Max Coins?")) {
        if (game.ask("For", "" + conv.ConvertNumber(Max_Coins * 3) + " coins?")) {
            if (Money >= Max_Coins * 3) {
                Money += 0 - Max_Coins * 3
                Max_Coins += 5
            } else {
                game.splash("Not Enough...")
            }
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Jp > 0) {
        mySprite.vy = -225
        Jp += -1
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        Jp = 2
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
let Jp = 0
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
Max_Coins = 5
Jp = 2
Coin_Multiplier = 1
game.onUpdate(function () {
    textSprite.setText(conv.ConvertNumber(Money))
})
forever(function () {
    Make_Normal_Coin()
    pause(randint(500, 3500))
})
