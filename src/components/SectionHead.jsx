import { FormattedMessage } from 'react-intl';

export default function SectionHead({ eyebrow, title, lead, titleId }) {
  return (
    <div className="section-head">
      <p className="eyebrow">
        <FormattedMessage id={eyebrow} />
      </p>
      <h2 className="section-title" id={titleId}>
        <FormattedMessage id={title} />
      </h2>
      {lead && (
        <p className="lead">
          <FormattedMessage id={lead} />
        </p>
      )}
    </div>
  );
}
