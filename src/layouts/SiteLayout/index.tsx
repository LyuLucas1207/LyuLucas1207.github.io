import { Outlet, useLocation } from 'react-router-dom'

import { SmoothScroll } from '@/animations'
import { Voyager } from '@/components/Voyager'
import { Footer } from '@/layouts/Footer'
import { NavBar } from '@/layouts/NavBar'
import { ROUTES } from '@/navigations/routes'
import styles from './styles.module.css'

function SiteLayout() {
  const { pathname } = useLocation()
  const isWorld = pathname === ROUTES.WORLD

  return (
    <SmoothScroll disabled={isWorld}>
      <div className={styles.shell} data-world-page={isWorld ? 'true' : undefined}>
        <div className={styles.frame} />

        {isWorld ? null : <Voyager />}
        <NavBar />

        <main className={styles.main}>
          <Outlet />
        </main>

        {isWorld ? null : <Footer />}
      </div>
    </SmoothScroll>
  )
}

export { SiteLayout }
