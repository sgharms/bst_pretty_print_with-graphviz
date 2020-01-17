import { shuffledRange } from '../src/node_modules/shuffle';

const simpleRange = shuffledRange(1,3)

test('shuffledRange corrects an Array of correct length', () => {
  expect(simpleRange.length).toEqual(3)
})

test('shuffledRange is inclusive by default', () => {
  expect(simpleRange).toContain(3)
})
