import { FormattedMessage } from 'react-intl';
import { AMENITIES } from '../data/apartment.js';
import SectionHead from './SectionHead.jsx';

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__text">
          <SectionHead eyebrow="about.eyebrow" title="about.title" titleId="about-title" />
          <p className="lead">
            <FormattedMessage id="about.text1" />
          </p>
          <p>
            <FormattedMessage id="about.text2" />
          </p>
        </div>

        <ul className="amenities">
          {AMENITIES.map(({ id, icon: Icon }) => (
            <li className="amenity" key={id}>
              <Icon size={22} aria-hidden="true" />
              <FormattedMessage id={id} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
