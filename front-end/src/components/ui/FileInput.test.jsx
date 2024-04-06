import {render, screen} from '@testing-library/react'
import FileInput from "./FileInput";
import { expect, describe, it} from 'vitest'

describe('Button', () => {
  it('Should render right text', () => {
    render(<FileInput>Click Me</FileInput>)
    const e = screen.getByRole('button')
    expect(e.innerHTML).toBe('Click Me')
  })
})
