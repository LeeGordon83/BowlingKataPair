const { expect } = require('chai')

function getScore() {
  return 0
}



describe('scorecalculator', () => {
  it('all gutter balls returns 0', async () => {
    // Arrange
      
    // Act
    const score = getScore()
    
    // Assert
    expect(score).to.eql(0)
  })
})
