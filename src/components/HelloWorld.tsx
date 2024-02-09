import { type ReactNode } from 'react'
import styles from './HelloWorld.module.scss'

interface HelloWorldProps {
  text?: string
}

export default function HelloWorld (props: HelloWorldProps): ReactNode {
  return (
    <div className={styles.hello}>Hello
      <span className={styles.world}> World!</span>
      {props.text}
    </div>
  )
}
