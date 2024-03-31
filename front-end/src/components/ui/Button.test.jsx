import {fireEvent, render, screen} from '@testing-library/react'
import Button from "./Button";
import { expect, describe, vi, it} from 'vitest'

const fn = vi.fn()

describe('Button', () => {
  it('Should render right text', () => {
    render(<Button className={'black'} onClick={fn} other={'other'}>Click Me</Button>)
    const e = screen.getByRole('button')
    expect(e.innerHTML).toBe('Click Me')
  })

  it('Should handle click event', () => {
    render(<Button className={'black'} onClick={fn} other={'other'}>Click Me</Button>)
    const e = screen.getByRole('button')
    fireEvent.click(e)
    expect(fn).toBeCalledTimes(1)
  })
  
  it('Should pass right other props', () => {
    render(<Button className={'black clover'} onClick={fn} data-other={'other'}>Click Me</Button>)
    const e = screen.getByRole('button')
    expect(e.className).match(/black clover.*/)
    expect(e.getAttribute('data-other')).toBe('other')
  })
})
