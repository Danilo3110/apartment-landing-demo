import { FormattedMessage } from 'react-intl';
import { CONTACT, NAV_ITEMS } from '../data/apartment.js';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>
              <FormattedMessage id="footer.tagline" />
            </p>
          </div>

          <ul className="footer__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <FormattedMessage id={item.label} />
                </a>
              </li>
            ))}
          </ul>

          <address className="footer__contact">
            <FormattedMessage id="footer.address" />
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </address>
        </div>

        <div className="footer__bottom">
          <p>
            <FormattedMessage id="footer.rights" values={{ year: new Date().getFullYear() }} />
          </p>
          <p>
            <FormattedMessage id="footer.demo" />
          </p>
          <p>
            <FormattedMessage id="footer.credit" />
          </p>
        </div>
      </div>
    </footer>
  );
}
