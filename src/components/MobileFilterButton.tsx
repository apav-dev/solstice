import { ReactComponent as FilterIcon } from '../icons/filter.svg';

//prettier-ignore
interface MobileFilterButtonProps {
  onClick: () => void
}

export const MobileFilterButton = ({ onClick }: MobileFilterButtonProps) => (
  <div
    className="fixed left-0 right-0 top-auto  bottom-20 m-0 mx-auto flex h-12 w-2/5 items-center justify-center rounded-3xl bg-gold"
    onClick={() => onClick()}>
    {/* TODO: center icon and text */}
    <div className="flex space-x-2 ">
      <div className="flex flex-col justify-center">
        <FilterIcon />
      </div>
      <div className=" text-center font-heading text-lg text-black">FILTER</div>
    </div>
  </div>
);

export default MobileFilterButton;
