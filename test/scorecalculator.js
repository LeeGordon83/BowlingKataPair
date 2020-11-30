const { expect } = require('chai')

function getScore (pins) {
  return pins.reduce(getScoreReduce(), 0)
}

function getScoreReduce () {
  let previousFrame = []
  let strikeCount = 0
  return (count, frame) => {
    let frameCount = 0
    if (strikeCount > 0 && !isStrike(frame)) {
      for (let i = strikeCount; i > 0; i--) {
        const thisFrameCount = (frameTotal(frame) + (i * 10))
        frameCount += thisFrameCount >= 30 ? 30 : thisFrameCount
      }
      frameCount += frameTotal(frame)
      strikeCount = 0
    } else if (isSpare(previousFrame)) {
      frameCount = (frameTotal(frame)) + (frame[0])
      strikeCount = 0
    } else {
      if (frame[0] !== 10) {
        frameCount = (frameTotal(frame))
        strikeCount = 0
      } else {
        frameCount = 0
        strikeCount++
      }
    }
    previousFrame = frame
    return count + frameCount
  }

  function isSpare (frame) {
    return frame[0] !== 10 && frame[0] + frame[1] === 10
  }

  function isStrike (frame) {
    return frame[0] === 10
  }

  function frameTotal (frame) {
    return frame[0] + frame[1]
  }
}

describe('scorecalculator', () => {
  it('all gutter balls returns 0', async () => {
    // Arrange
    const pins = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]

    // Act
    const score = getScore(pins)

    // Assert
    expect(score).to.eql(0)
  })

  it('1 pin per roll should return score of 20', async () => {
    // Arrange
    const pins = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1]
    ]

    // Act
    const score = getScore(pins)

    // Assert
    expect(score).to.eql(20)
  })

  // If you knock down all the pins on your first ball, it is called a strike
  // The score doesn't get added on straight away because for a strike, you get the values of your next two balls as a bonus
  // For example, if you score a strike in the first frame, then an 7 and 1 in the second frame, you would score 18 (10+7+1)
  // for the first frame, and 8 for the second frame, making a total of 26 after two frames.

  it('strike scored should add on both scores in next frame to previous frame score', async () => {
    // Arrange
    const pins = [
      [10, 0], // 13
      [1, 2], // 3
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]

    // Act
    const score = getScore(pins)

    // Assert
    expect(score).to.eql(16)
  })

  it('spare scored should add on first score in next frame to previous frame score', async () => {
    // Arrange
    const pins = [
      [5, 5], // 1
      [1, 2], // 3
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]

    // Act
    const score = getScore(pins)

    // Assert
    expect(score).to.eql(14)
  })

  it('two consecutive spares scored should add on first score next frame to previous frame score both times', async () => {
    // Arrange
    const pins = [
      [5, 5], // 15
      [5, 5], // 13
      [3, 0], // 3
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]

    // Act
    const score = getScore(pins)

    // Assert
    expect(score).to.eql(31)
  })

  it('double scored ', async () => {
    // add consecutive strike counter into code
    // Arrange
    const pins = [
      [10, 0], // 25
      [10, 0], // 15
      [5, 0], // 5
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]

    // Act
    const score = getScore(pins)

    // Assert
    expect(score).to.eql(45)
  })

  it('turkey scored ', async () => {
    // add consecutive strike counter into code
    // Arrange
    const pins = [
      [10, 0], // 30
      [10, 0], // 25
      [10, 0], // 15
      [5, 0], // 5
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]

    // Act
    const score = getScore(pins)

    // Assert
    expect(score).to.eql(75)
  })

  it('four bagger scored ', async () => {
    // add consecutive strike counter into code
    // Arrange
    const pins = [
      [10, 0], // 30
      [10, 0], // 30
      [10, 0], // 25
      [10, 0], // 15
      [5, 0], // 5
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]

    // Act
    const score = getScore(pins)

    // Assert
    expect(score).to.eql(105)
  })

  it('two strikes scored followed by double gutterball', async () => {
    // add consecutive strike counter into code
    // Arrange
    const pins = [
      [10, 0], // 20
      [10, 0], // 10
      [0, 0], // 0
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]

    // Act
    const score = getScore(pins)

    // Assert
    expect(score).to.eql(30)
  })

  it.skip('two strikes scored followed by single gutterball', async () => {
    // Arrange
    const pins = [
      [10, 0], // 20
      [10, 0], // 10
      [0, 5], // 5
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]
    // Act
    const score = getScore(pins)

    // Assert
    expect(score).to.eql(40)
  })

  it.skip('two spares scored followed by gutterball', async () => {

  })

  it.skip('strike scored last', async () => {

  })

  it.skip('spare scored last', async () => {

  })
})
