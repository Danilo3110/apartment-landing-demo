import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/apartment.js';
import LanguageSwitch from './LanguageSwitch.jsx';
import Logo from './Logo.jsx';

const DESKTOP_MIN_WIDTH = 1100;

export default function Header() {
  const intl = useIntl();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the mobile menu is open: lock page scroll, close on Esc or when the viewport gets wide.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth >= DESKTOP_MIN_WIDTH && setMenuOpen(false);
    document.body.classList.add('no-scroll');
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const navLabel = intl.formatMessage({ id: 'nav.label' });

  return (
    <header className={`header${scrolled || menuOpen ? ' is-solid' : ''}`}>
      <div className="container header__inner">
        <Logo onClick={closeMenu} />

        <nav className="nav" aria-label={navLabel}>
          <ul className="nav__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <FormattedMessage id={item.label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <LanguageSwitch />
          <a className="btn btn--accent btn--sm header__cta" href="#inquiry">
            <FormattedMessage id="nav.cta" />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={intl.formatMessage({ id: menuOpen ? 'nav.close' : 'nav.menu' })}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-nav" hidden={!menuOpen}>
        <nav className="container" aria-label={navLabel}>
          <ul className="mobile-nav__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={closeMenu}>
                  <FormattedMessage id={item.label} />
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--accent btn--block" href="#inquiry" onClick={closeMenu}>
            <FormattedMessage id="nav.cta" />
          </a>
        </nav>
      </div>
    </header>
  );
}
