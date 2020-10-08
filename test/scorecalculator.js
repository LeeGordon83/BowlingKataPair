const { expect } = require('chai')


function getScore(pins) {
  return pins.reduce((count, frame) => count + (frame[0] + frame[1]), 0)
}



describe('scorecalculator', () => {
  it('all gutter balls returns 1', async () => {
    // Arrange
    const pins = [
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0]
    ]

      
    // Act
    const score = getScore(pins)
    
    // Assert
    expect(score).to.eql(0)
  }),

  it('1 pin per roll should return score of 20', async () => {
    // Arrange
    const pins = [
      [1,1],
      [1,1],
      [1,1],
      [1,1],
      [1,1],
      [1,1],
      [1,1],
      [1,1],
      [1,1],
      [1,1]
    ]

      
    // Act
    const score = getScore(pins)
    
    // Assert
    expect(score).to.eql(20)
  })

})
