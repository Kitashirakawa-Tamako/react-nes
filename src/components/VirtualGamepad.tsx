import { useState, type ReactNode, useRef, useEffect } from 'react'
import style from './VirtualGamepad.module.scss'
import { type VirtualGamepadProps } from './interface'
import { Controller } from 'jsnes'

function VirtualGamepad (props: VirtualGamepadProps): ReactNode {
  const gamePadRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState('none')
  const [scale, setScale] = useState(1)
  const onArrowDown = (direction: string): void => {
    if (direction === 'up') {
      setRotate('rotateX(15deg)')
      onButtonDown(Controller.BUTTON_UP)
    }
    if (direction === 'down') {
      setRotate('rotateX(-15deg)')
      onButtonDown(Controller.BUTTON_DOWN)
    }
    if (direction === 'left') {
      setRotate('rotateY(-15deg)')
      onButtonDown(Controller.BUTTON_LEFT)
    }
    if (direction === 'right') {
      setRotate('rotateY(15deg)')
      onButtonDown(Controller.BUTTON_RIGHT)
    }
  }
  const onArrowUp = (direction: string): void => {
    if (direction === 'up') {
      onButtonUp(Controller.BUTTON_UP)
    }
    if (direction === 'down') {
      onButtonUp(Controller.BUTTON_DOWN)
    }
    if (direction === 'left') {
      onButtonUp(Controller.BUTTON_LEFT)
    }
    if (direction === 'right') {
      onButtonUp(Controller.BUTTON_RIGHT)
    }
    setRotate('none')
  }

  const onButtonDown = (action: any): void => {
    props.nesRef.current?.buttonDown(action as number)
  }
  const onButtonUp = (action: any): void => {
    props.nesRef.current?.buttonUp(action as number)
  }

  useEffect(() => {
    if (gamePadRef.current != null) {
      const parentWidth = (gamePadRef.current.parentNode as HTMLDivElement).offsetWidth
      const width = gamePadRef.current.offsetWidth
      setScale(parentWidth / width)
    }
  }, [])
  return (
    <div style={{ width: '100%', height: 180 * scale }}
      onTouchMove={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}>
      <div className={style.gamepad} ref={gamePadRef} style={{ transform: `scale(${scale})`, transformOrigin: '0 0' }}>
        <div className={style.main} >
          <div className={style.panel}>
            <div className={style.bg1}></div>
            <div className={style.bg2}></div>
            <div className={style.bg3}></div>
            <div className={style.bg4}></div>
            <div className={style['direction-pad']} style={{ transform: rotate }}>
              <div className={style.bg}></div>
              <div className={style['button-up']} onMouseDown={() => { onArrowDown('up') }} onMouseUp={() => { onArrowUp('up') }} onTouchStart={() => { onArrowDown('up') }} onTouchEnd={() => { onArrowUp('up') }}>
                <svg width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22.2692 6.98965C23.0395 5.65908 24.9605 5.65908 25.7309 6.98965L44.262 38.9979C45.0339 40.3313 44.0718 42 42.5311 42H5.4689C3.92823 42 2.96611 40.3313 3.73804 38.9979L22.2692 6.98965Z" fill="#333" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className={style['button-down']} onMouseDown={() => { onArrowDown('down') }} onMouseUp={() => { onArrowUp('down') }} onTouchStart={() => { onArrowDown('down') }} onTouchEnd={() => { onArrowDown('down') }}>
                <svg width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22.2692 6.98965C23.0395 5.65908 24.9605 5.65908 25.7309 6.98965L44.262 38.9979C45.0339 40.3313 44.0718 42 42.5311 42H5.4689C3.92823 42 2.96611 40.3313 3.73804 38.9979L22.2692 6.98965Z" fill="#333" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className={style['button-left']} onMouseDown={() => { onArrowDown('left') }} onMouseUp={() => { onArrowUp('left') }} onTouchStart={() => { onArrowDown('left') }} onTouchEnd={() => { onArrowUp('left') }}>
                <svg width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22.2692 6.98965C23.0395 5.65908 24.9605 5.65908 25.7309 6.98965L44.262 38.9979C45.0339 40.3313 44.0718 42 42.5311 42H5.4689C3.92823 42 2.96611 40.3313 3.73804 38.9979L22.2692 6.98965Z" fill="#333" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className={style['button-right']} onMouseDown={() => { onArrowDown('right') }} onMouseUp={() => { onArrowUp('right') }} onTouchStart={() => { onArrowDown('right') }} onTouchEnd={() => { onArrowUp('right') }}>
                <svg width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22.2692 6.98965C23.0395 5.65908 24.9605 5.65908 25.7309 6.98965L44.262 38.9979C45.0339 40.3313 44.0718 42 42.5311 42H5.4689C3.92823 42 2.96611 40.3313 3.73804 38.9979L22.2692 6.98965Z" fill="#333" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div className={style['function-pad']}>
              <div className={style['button-select']} onMouseDown={() => { onButtonDown(Controller.BUTTON_SELECT) }} onMouseUp={() => { onButtonUp(Controller.BUTTON_SELECT) }} onTouchStart={() => { onButtonDown(Controller.BUTTON_SELECT) }} onTouchEnd={() => { onButtonUp(Controller.BUTTON_SELECT) }}></div>
              <div className={style['button-start']} onMouseDown={() => { onButtonDown(Controller.BUTTON_START) }} onMouseUp={() => { onButtonUp(Controller.BUTTON_START) }} onTouchStart={() => { onButtonDown(Controller.BUTTON_START) }} onTouchEnd={() => { onButtonUp(Controller.BUTTON_START) }}></div>
            </div>
            <div className={style['action-pad']}>
              <div className={style['button-b']} onMouseDown={() => { onButtonDown(Controller.BUTTON_B) }} onMouseUp={() => { onButtonUp(Controller.BUTTON_B) }} onTouchStart={() => { onButtonDown(Controller.BUTTON_B) }} onTouchEnd={() => { onButtonUp(Controller.BUTTON_B) }}></div>
              <div className={style['button-a']} onMouseDown={() => { onButtonDown(Controller.BUTTON_A) }} onMouseUp={() => { onButtonUp(Controller.BUTTON_A) }} onTouchStart={() => { onButtonDown(Controller.BUTTON_A) }} onTouchEnd={() => { onButtonUp(Controller.BUTTON_A) }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VirtualGamepad
