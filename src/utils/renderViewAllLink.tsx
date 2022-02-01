import { Link } from 'react-router-dom';

//prettier-ignore
interface ViewAllLinkProps {
  verticalKey?: string,
  latestQuery?: string,
  label?: string
}

// TODO: add css as prop
export default function renderViewAllLink({ verticalKey, latestQuery, label }: ViewAllLinkProps) {
  return (
    <div className="flex justify-center py-8 font-heading text-xl text-gold ">
      <Link className="" to={`/${verticalKey}?query=${latestQuery}`}>
        {`VIEW ALL ${label}`}
      </Link>
    </div>
  );
}
