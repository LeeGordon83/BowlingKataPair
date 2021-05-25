const { expect } = require('chai')
const getFrameScores = require('../index')

describe('scorecalculator', () => {
  it('all gutter balls returns 0', async () => {
    // Arrange
    const frames = [
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
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  })

  it('1 pin per roll should return score of 20', async () => {
    // Arrange
    const frames = [
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
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
  })

  // If you knock down all the pins on your first ball, it is called a strike
  // The score doesn't get added on straight away because for a strike, you get the values of your next two balls as a bonus
  // For example, if you score a strike in the first frame, then an 7 and 1 in the second frame, you would score 18 (10+7+1)
  // for the first frame, and 8 for the second frame, making a total of 26 after two frames.

  it('strike scored on the first frame results in score undefined', async () => {
    // Arrange
    const frames = [
      [10, 0]
    ]

    // Act
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([undefined])
  })

  it('strike scored on the second frame results in score undefined', async () => {
    // Arrange
    const frames = [
      [10, 0],
      [10, 0]
    ]

    // Act
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([undefined, undefined])
  })

  it('strike scored on the first frame results in score undefined', async () => {
    // Arrange
    const frames = [
      [10, 0]
    ]

    // Act
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([undefined])
  })

  it('strike scored on the frist frame followed by 5 pins second frame results in correct score', async () => {
    // Arrange
    const frames = [
      [10, 0],
      [2, 3]
    ]

    // Act
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([15, 5])
  })

  it('strike scored on the third frame results in a current score', async () => {
    // Arrange
    const frames = [
      [10, 0],
      [10, 0],
      [10, 0]
    ]

    // Act
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([30, undefined, undefined])
  })

  it('strike scored should add on both scores in next frame to previous frame score', async () => {
    // Arrange
    const frames = [
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
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([13, 3, 0, 0, 0, 0, 0, 0, 0, 0])
  })

  it('spare scored should add on first score in next frame to previous frame score', async () => {
    // Arrange
    const frames = [
      [5, 5], // 11
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
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([11, 3, 0, 0, 0, 0, 0, 0, 0, 0])
  })

  it('two consecutive spares scored should add on first score next frame to previous frame score both times', async () => {
    // Arrange
    const frames = [
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
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([15, 13, 3, 0, 0, 0, 0, 0, 0, 0])
  })

  it('double scored ', async () => {
    // Arrange
    const frames = [
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
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([25, 15, 5, 0, 0, 0, 0, 0, 0, 0])
  })

  it('turkey scored ', async () => {
    // add consecutive strike counter into code
    // Arrange
    const frames = [
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
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([30, 25, 15, 5, 0, 0, 0, 0, 0, 0])
  })

  it('four bagger scored ', async () => {
    // add consecutive strike counter into code
    // Arrange
    const frames = [
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
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([30, 30, 25, 15, 5, 0, 0, 0, 0, 0])
  })

  it('two strikes scored followed by double gutterball', async () => {
    // add consecutive strike counter into code
    // Arrange
    const frames = [
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
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([20, 10, 0, 0, 0, 0, 0, 0, 0, 0])
  })

  it('two strikes scored followed by single gutterball', async () => {
    // Arrange
    const frames = [
      [10, 0], // 20
      [10, 0], // 15
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
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([25, 15, 5, 0, 0, 0, 0, 0, 0, 0])
  })

  it('two spares scored followed by gutterball', async () => {
    // Arrange
    const frames = [
      [5, 5], // 20
      [5, 5], // 15
      [0, 0] // 5

    ]
    // Act
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([15, 10, 0])
  })

  it('strike scored last', async () => {
    // Arrange
    const frames = [
      [10, 0], // 20
      [10, 0], // 15
      [0, 5], // 5
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [10, 5, 3]
    ]
    // Act
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([25, 15, 5, 0, 0, 0, 0, 0, 0, 18])
  })

  it('spare scored last', async () => {
    // Arrange
    const frames = [
      [10, 0], // 20
      [10, 0], // 15
      [0, 5], // 5
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [5, 5, 5]
    ]
    // Act
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([25, 15, 5, 0, 0, 0, 0, 0, 0, 15])
  })

  it('three strikes in final frame are scored', async () => {
    // Arrange
    const frames = [
      [10, 0], // 20
      [10, 0], // 15
      [0, 5], // 5
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [10, 10, 10]
    ]
    // Act
    const score = getFrameScores(frames)

    // Assert
    expect(score).to.eql([25, 15, 5, 0, 0, 0, 0, 0, 0, 30])
  })
})

it('error if more than ten frames submitted', async () => {
  // Arrange
  const frames = [
    [1, 0],
    [1, 0],
    [0, 5],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [5, 1],
    [8, 0]
  ]

  // Act and Assert
  expect(() => { getFrameScores(frames) }).to.throw('Frame length exceeds 10')
})

it('an empty frame returns empty result', async () => {
  // Arrange
  const frames = [

  ]
  // Act
  const score = getFrameScores(frames)

  // Assert
  expect(score).to.eql([])
})

it('Maximum of 2 balls in first 9 frames', async () => {
  // Arrange
  const frames = [
    [1, 1, 1]
  ]
  // Act and Assert
  expect(() => { getFrameScores(frames) }).to.throw('A maximum of two balls can scored for the first 9 frames')
})

it('Maximum of 2 balls in final frame if 10 not scored', async () => {
  // Arrange
  const frames = [
    [10, 0], // 20
    [10, 0], // 15
    [0, 5], // 5
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [5, 1, 8]
  ]
  // Act and Assert
  expect(() => { getFrameScores(frames) }).to.throw('A maximum of two balls can be scored in the final frame total is less than 10')
})

it('Two balls are submitted for a frame', async () => {
  // Arrange
  const frames = [
    [1]
  ]
  // Act and Assert
  expect(() => { getFrameScores(frames) }).to.throw('Two balls must be thrown per frame')
})

// 3 balls submitted for strike or spare 9th frame
