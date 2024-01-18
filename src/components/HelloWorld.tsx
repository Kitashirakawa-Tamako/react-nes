import { type ReactNode } from 'react'
import styles from './HelloWorld.module.scss'

export default function HelloWorld (): ReactNode {
  return (
    <div className={styles.hello}>Hello
      <span className={styles.world}> World!</span>
    </div>
  )
}
