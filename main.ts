let avoiding = 0
let LFSR = 0
let LFSL = 0
function hardLeft () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 40)
    basic.pause(100)
}
function FullBack () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 60)
    basic.pause(100)
}
function avoid () {
    FullBack()
    basic.pause(1000)
    if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 20) {
        fullStop()
    } else {
        avoiding = 0
    }
}
function fullStop () {
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(100)
}
function softRight () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 10)
}
function hardRight () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 40)
    basic.pause(200)
}
function softLeft () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 10)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 40)
}
function fullForwards () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 40)
    basic.pause(100)
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        avoiding = 1
        avoid()
    } else {
        avoiding = 0
        LFSR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
        LFSL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
        if (LFSL == 1 && LFSR == 1) {
            fullForwards()
        } else if (LFSL == 1) {
            softRight()
        } else if (LFSR == 1) {
            softLeft()
        } else {
            fullStop()
            basic.pause(100)
            hardLeft()
            basic.pause(100)
        }
    }
})
