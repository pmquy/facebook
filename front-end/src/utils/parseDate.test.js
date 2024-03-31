import { parseDate } from "./parseDate";
import {expect, test} from 'vitest'

test('Test parse date 1', () => {
  expect(parseDate('2024-03-24T13:08:37.926+00:00')).toBe('24/03/2024, 8:08:37 pm')
})
test('Test parse date 2', () => {
  expect(parseDate('2024-03-25T13:08:37.926+00:00')).toBe('25/03/2024, 8:08:37 pm')
})
test('Test parse date 3', () => {
  expect(parseDate('2024-03-26T13:08:37.926+00:00')).toBe('26/03/2024, 8:08:37 pm')
})