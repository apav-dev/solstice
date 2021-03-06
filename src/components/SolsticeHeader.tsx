import { useContext, useEffect, useState } from 'react';
import { ResponsiveContext } from '../App';
import { ReactComponent as HamburgerMenuIcon } from '../icons/hamburger_menu.svg';
import { ReactComponent as CloseMenuIcon } from '../icons/close_menu.svg';
import { ReactComponent as SunIcon } from '../icons/sun.svg';

const cssClasses = {
  container: 'flex px-4 sm:h-24 items-center justify-between',
  topContainer: 'flex items-center',
  solsticeLabel: 'flex items-center space-x-2 font-heading text-3xl',
  headerContainer: 'flex  items-center font-heading',
  headingsContainer: 'flex space-x-16 font-heading ',
  membershipButtonsContainer: 'flex items-center space-x-4 float-right font-heading',
  dropdownModal: 'fixed sm:top-24 top-7.5 left-0 right-0 bg-black h-full w-full z-10',
};

const options = ['ABOUT US', 'OUR COMMITMENT TO CLEAN', 'BLOG', 'SIGN IN', 'SIGN UP'];

export function SolsticeHeader(): JSX.Element {
  const screenSize = useContext(ResponsiveContext);
  const [isLarge, setIsLarge] = useState(true);

  useEffect(() => {
    setIsLarge(screenSize === 'lg' || screenSize === 'xl');
  }, [screenSize]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const renderHeadings = () => (
    <div className={cssClasses.headingsContainer}>
      <div className="hover:underline">ABOUT US</div>
      <div className="hover:underline">OUR COMMITMENT TO CLEAN</div>
      <div className="hover:underline">BLOG</div>
    </div>
  );

  const renderMembershipButtons = () => (
    <div className={cssClasses.membershipButtonsContainer}>
      <div className="align-middle hover:underline">LOG IN</div>
      <div className="rounded-md border">
        <div className="py-4 px-10 hover:bg-gray-400">JOIN US</div>
      </div>
    </div>
  );

  const renderDropdownMenuIcon = () => {
    if (isDropdownOpen) {
      return <CloseMenuIcon onClick={() => setIsDropdownOpen(false)} />;
    } else {
      return <HamburgerMenuIcon onClick={() => setIsDropdownOpen(true)} />;
    }
  };

  const renderDropdownModal = () => (
    <div className={cssClasses.dropdownModal}>
      <div className="px-12 py-4">{options.map((option) => renderDropdownOption(option))}</div>
    </div>
  );

  const renderDropdownOption = (option: string) => (
    <div className="text-body border-t-2 py-8 font-heading">{option}</div>
  );

  return (
    <div>
      <div className={cssClasses.container}>
        <div className={cssClasses.topContainer}>
          <div className={cssClasses.solsticeLabel}>
            {screenSize !== 'xl' ? renderDropdownMenuIcon() : <div>Solstice</div>}
            <SunIcon width={60} height={60} />
          </div>
        </div>
        {screenSize === 'xl' && renderHeadings()}
        {screenSize === 'xl' && renderMembershipButtons()}
        {screenSize !== 'xl' && (
          // TODO: Turn into reusable component with hover effect
          <div className="flex justify-center rounded-md border-2 bg-black px-4 hover:bg-gray-400 ">
            <div className="py-3 px-12 font-heading text-base font-bold text-white sm:py-0">JOIN US</div>
          </div>
        )}
      </div>
      {isDropdownOpen && renderDropdownModal()}
    </div>
  );
}
