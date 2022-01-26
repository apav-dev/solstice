import { useContext, useState } from 'react';
import { ResponsiveContext } from '../App';
import { ReactComponent as HamburgerMenuIcon } from '../icons/hamburger_menu.svg';
import { ReactComponent as CloseMenuIcon } from '../icons/close_menu.svg';
import { ReactComponent as SunIcon } from '../icons/sun.svg';

const cssClasses = {
  container: 'flex px-4 sm:h-24 h-7.5 items-center justify-between',
  topContainer: 'flex items-center',
  solsticeLabel: 'sm:flex sm:space-x-2 font-heading text-3xl',
  headerContainer: 'flex  items-center font-heading',
  headingsContainer: 'flex space-x-16 font-heading',
  membershipButtonsContainer: 'flex items-center space-x-4 float-right font-heading',
  dropdownModal: 'fixed sm:top-24 top-7.5 left-0 right-0 bg-black h-full w-full z-10',
};

const options = ['ABOUT US', 'OUR COMMITMENT TO CLEAN', 'BLOG', 'SIGN IN', 'SIGN UP'];

export function SolsticeHeader(): JSX.Element {
  const isMobile = useContext(ResponsiveContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const renderHeadings = () => (
    <div className={cssClasses.headingsContainer}>
      <div>ABOUT US</div>
      <div>OUR COMMITMENT TO CLEAN</div>
      <div>BLOG</div>
    </div>
  );

  const renderMembershipButtons = () => (
    <div className={cssClasses.membershipButtonsContainer}>
      <div className="align-middle">LOG IN</div>
      <div className="rounded-md border">
        <div className="py-4 px-10">JOIN US</div>
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
    <div className="border-t-2 py-8 font-heading text-3xl">{option}</div>
  );

  return (
    <div>
      <div className={cssClasses.container}>
        <div className={cssClasses.topContainer}>
          <div className={cssClasses.solsticeLabel}>
            {!isMobile && <div>Solstice</div>}
            <SunIcon width={isMobile ? 120 : 40} height={isMobile ? 120 : 40} />
          </div>
        </div>

        {isMobile && renderDropdownMenuIcon()}
        {!isMobile && renderHeadings()}
        {!isMobile && renderMembershipButtons()}
      </div>
      {isDropdownOpen && renderDropdownModal()}
    </div>
  );
}
