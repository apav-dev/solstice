import { useAnswersState } from '@yext/answers-headless-react';
import { useState } from 'react';
import Facets from './Facets';
import MobileFilterButton from './MobileFilterButton';
import { Divider } from './StaticFilters';

export default function MobileFilterLayout() {
  const [isPopupUpOpen, setIsPopupOpen] = useState(false);

  const resultsCount = useAnswersState((state) => state.vertical.resultsCount);

  const toggleFilterPopup = () => setIsPopupOpen(!isPopupUpOpen);

  return (
    <div>
      <MobileFilterButton onClick={() => toggleFilterPopup()} />
      {isPopupUpOpen && (
        <div className="fixed top-0 left-0 right-0 z-10 h-full w-full bg-black sm:top-0">
          <div className="my-8 flex w-full justify-center font-heading text-4xl text-white">Filter</div>
          <Divider />
          <Facets
            customCssClasses={{
              label: 'text-5xl font-heading text-gold text-left',
              container: 'md:w-40 ml-8',
              divider: 'bg-transparent',
              labelContainer: 'w-full flex justify-between items-center my-6',
              option: 'flex items-center space-x-3 ml-8',
              optionInput:
                'w-8 h-8 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-gold focus:ring-gold',
              optionLabel: 'text-white text-heading text-4xl my-4',
            }}
            cssCompositionMethod="assign"
            searchOnChange={true}
            defaultExpanded={true}
            facetConfigs={{ 'c_location.neighborhood': { label: 'GYM LOCATION' }, c_classType: { label: 'ACTIVITY' } }}
          />
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
