import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './styles.module.css'

function FooterInstrument() {
  const { t } = useTranslation('components')
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('en-CA', {
          timeZone: 'America/Vancouver',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className={styles.root}>
      <span className={styles.readout}>
        <span className={styles.dot} aria-hidden />
        {t('footer.instrumentStatus', { defaultValue: 'Signal open' })}
      </span>
      <span className={styles.readout}>VAN / 49.28°N 123.12°W</span>
      <span className={styles.readout} suppressHydrationWarning>
        {time} PST
      </span>
      <span className={styles.readout}>
        © {new Date().getFullYear()} Lucas Lyu
      </span>
    </div>
  )
}

export { FooterInstrument }
