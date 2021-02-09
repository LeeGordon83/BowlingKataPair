
function getScoresMap () {
  function isStrike (frame) {
    return frame[0] === 10
  }
  function isSpare (frame) {
    return frame[0] + frame[1] === 10
  }
  function getNextFrame (array, index) {
    return array[index + 1]
  }
  function isLastFrame (index) {
    return index === 9
  }
  function scoreFrame (frame) {
    return frame.reduce((x, y) => x + y)
  }
  return (frame, index, array) => {
    if (isLastFrame(index)) {
      return scoreFrame(frame)
    }
    if (isStrike(frame)) {
      const nextFrame = getNextFrame(array, index)
      const nextnextFrame = getNextFrame(array, index + 1)
      if (nextFrame === undefined) {
        return undefined
      } else if (isStrike(nextFrame)) {
        if (nextnextFrame === undefined) {
          return undefined
        } else if (isStrike(nextnextFrame)) {
          return 30
        } else {
          return 10 + 10 + scoreFrame(nextnextFrame)
        }
      } else {
        return 10 + scoreFrame(nextFrame)
      }
    }
    if (isSpare(frame)) {
      const nextFrame = getNextFrame(array, index)
      if (nextFrame === undefined) {
        return undefined
      } else {
        return 10 + nextFrame[0]
      }
    }
    return scoreFrame(frame)
  }
}

function validateFrames (frames) {
  if (frames.length > 10) {
    throw Error('Frame length exceeds 10')
  }
  if (frames.length < 10) {
    if (frames.some((f) => { return f.length > 2 })) {
      throw Error('A maximum of two balls can scored for the first 9 frames')
    } else if (frames.some((f) => { return f.length < 2 })) {
      throw Error('Two balls must be thrown per frame')
    }
  } else if (frames[9][0] + frames[9][1] < 10 && frames[9].length > 2) {
    throw Error('A maximum of two balls can be scored in the final frame total is less than 10')
  }
}

function getFrameScores (frames) {
  validateFrames(frames)

  return frames.map(getScoresMap())
}

module.exports = getFrameScores
