import { useAnswersState } from '@yext/answers-headless-react';
import { useState } from 'react';
import ClassFacets from './ClassFacets';
import MobileFilterButton from './MobileFilterButton';
import { Divider } from './StaticFilters';

export default function MobileFilterLayout() {
  const [isPopupUpOpen, setIsPopupOpen] = useState(false);

  const resultsCount = useAnswersState((state) => state.vertical.resultsCount);

  const toggleFilterPopup = () => {
    setIsPopupOpen(!isPopupUpOpen);
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  };

  return (
    <div>
      <MobileFilterButton onClick={() => toggleFilterPopup()} />
      {isPopupUpOpen && (
        <div className="fixed top-0 left-0 right-0 z-10 h-full w-full bg-black sm:top-0">
          <ClassFacets filterTitle isMobile />
          <div className="absolute bottom-4 flex w-full flex-col items-center">
            <Divider />
            <div
              className="flex h-20 w-5/6 items-center justify-center rounded-3xl border-4"
              onClick={() => toggleFilterPopup()}>
              <div className="text-center font-heading text-4xl text-white">{`VIEW ${resultsCount} RESULTS`}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
