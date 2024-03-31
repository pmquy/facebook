import { parseQuery } from "./parseQuery";
import {test, expect} from 'vitest'


test('Test parse query 1', () => {
  expect(parseQuery({})).toBe('?')
})
test('Test parse query 2', () => {
  expect(parseQuery({name : 'quy'})).toBe('?name=quy&')
})
test('Test parse query 3', () => {
  expect(parseQuery({name : 'quy', chicken : 'dogod'})).toBe('?name=quy&chicken=dogod&')
})