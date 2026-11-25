import { Trees } from 'lucide-react';

export default function Logo({ onClick }) {
  return (
    <a className="logo" href="#top" onClick={onClick}>
      <span className="logo__mark" aria-hidden="true">
        <Trees size={20} />
      </span>
      <span>Apartman Breza</span>
    </a>
  );
}
