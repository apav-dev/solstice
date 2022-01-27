import { ReactComponent as FilterIcon } from '../icons/filter.svg';

//prettier-ignore
interface MobileFilterButtonProps {
  onClick: () => void
}

export const MobileFilterButton = ({ onClick }: MobileFilterButtonProps) => (
  <div
    className="fixed inset-x-1/3 top-auto bottom-20 m-0 flex h-20 w-2/5 rounded-3xl bg-gold"
    onClick={() => onClick()}>
    {/* TODO: center icon and text */}
    <div className="flex space-x-4 px-20 pt-5">
      <FilterIcon />
      <div className=" text-center font-heading text-4xl text-black">Filter</div>
    </div>
  </div>
);

export default MobileFilterButton;
