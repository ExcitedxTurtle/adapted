let Avoiding = 0
let LFSR = 0
let LFSL = 0
function Full_Stop() {
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(100)
}
function Full_Forwards() {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 40)
    basic.pause(100)
}
function Soft_Left() {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 10)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 40)
}
function Distance_Stop() {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 40)
    basic.pause(200)
    while (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        Full_Stop()
    }
}
// should be 90 degrees
function Hard_Left() {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 40)
    basic.pause(100)
}
function Soft_Right() {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 10)
}
// should be 90 degrees
function Hard_Right() {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 40)
    basic.pause(200)
}
function Avoid() {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 40)
    basic.pause(200)
    Hard_Right()
    Full_Forwards()
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        Avoiding = 1
        Avoid()
        Soft_Left()
        basic.pause(200)
    } else {
        LFSR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
        LFSL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
        if (LFSL == 1 && LFSR == 1) {
            Full_Forwards()
        } else if (LFSL == 1) {
            Soft_Right()
        } else if (LFSR == 1) {
            Soft_Left()
        } else {
            Full_Stop()
            basic.pause(100)
            Hard_Left()
            basic.pause(100)
        }
    }
})