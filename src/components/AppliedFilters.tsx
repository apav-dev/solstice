import { DisplayableFilter } from '../models/displayableFilter';
import { ReactComponent as CloseX } from '../icons/x.svg';
import { useAnswersActions, AppliedQueryFilter, useAnswersState } from '@yext/answers-headless-react';
import { isNearFilterValue } from '../utils/filterutils';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { GroupedFilters } from '../models/groupedFilters';
import { getGroupedAppliedFilters } from '../utils/appliedfilterutils';
import FilterSentence from './FilterSentence';

//prettier-ignore
export interface AppliedFiltersCssClasses {
  appliedFiltersContainer?: string,
  nlpFilter?: string,
  removableFilter?: string,
  removeFilterButton?: string,
  filterLabel?: string
}

const builtInCssClasses: AppliedFiltersCssClasses = {
  appliedFiltersContainer: 'flex flex-wrap',
  nlpFilter: 'border rounded-3xl px-3 py-1.5 text-sm font-medium italic mr-2',
  removableFilter: 'flex items-center border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-900 mr-2',
  removeFilterButton: 'w-2 h-2 text-gray-500 m-1.5',
};

//prettier-ignore
interface AppliedFiltersDisplayProps {
  showFieldNames?: boolean,
  labelText?: string,
  delimiter?: string,
  displayableFilters: DisplayableFilter[],
  customCssClasses?: AppliedFiltersCssClasses,
  cssCompositionMethod?: CompositionMethod
}

//prettier-ignore
export interface AppliedFiltersProps {
  hiddenFields?: Array<string>,
  labelText?: string,
  /**
   * A mapping of static filter fieldIds to their displayed group labels.
   */
  staticFiltersGroupLabels?: Record<string, string>,
  appliedQueryFilters?: AppliedQueryFilter[],
  customCssClasses?: AppliedFiltersCssClasses,
  cssCompositionMethod?: CompositionMethod,
  filterBarType?: FilterBarType
}

type FilterBarType = 'default' | 'sentence';

export default function AppliedFilters(props: AppliedFiltersProps): JSX.Element {
  const nlpFilters = useAnswersState((state) => state.vertical?.appliedQueryFilters) || [];
  const state = useAnswersState((state) => state);
  const filterState = state.vertical.results ? state.filters : {};
  const { hiddenFields = [], staticFiltersGroupLabels = {}, filterBarType = 'default', ...otherProps } = props;
  const groupedFilters: Array<GroupedFilters> = getGroupedAppliedFilters(
    filterState,
    nlpFilters,
    hiddenFields,
    staticFiltersGroupLabels
  );
  const appliedFilters = groupedFilters.flatMap((groupedFilters) => groupedFilters.filters);

  if (filterBarType === 'sentence') {
    return <FilterSentence displayableFilters={appliedFilters} />;
  } else {
    return <AppliedFiltersDisplay displayableFilters={appliedFilters} {...otherProps} />;
  }
}

export function AppliedFiltersDisplay({
  labelText,
  displayableFilters,
  customCssClasses = {},
  cssCompositionMethod,
}: AppliedFiltersDisplayProps): JSX.Element {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  function NlpFilter({ filter }: { filter: DisplayableFilter }): JSX.Element {
    return (
      <div className={cssClasses.nlpFilter}>
        <span className={cssClasses.filterLabel}>{filter.label}</span>
      </div>
    );
  }

  function RemovableFilter({ filter }: { filter: DisplayableFilter }): JSX.Element {
    const answersAction = useAnswersActions();

    const onRemoveFacetOption = () => {
      const { fieldId, matcher, value } = filter.filter;
      if (isNearFilterValue(value)) {
        console.error('A Filter with a NearFilterValue is not a supported RemovableFilter.');
        return;
      }
      answersAction.setFacetOption(fieldId, { matcher, value }, false);
      answersAction.executeVerticalQuery();
    };

    const onRemoveStaticFilterOption = () => {
      answersAction.setFilterOption({ ...filter.filter, selected: false });
      answersAction.executeVerticalQuery();
    };

    const onRemoveFilter = filter.filterType === 'FACET' ? onRemoveFacetOption : onRemoveStaticFilterOption;

    return (
      <div className={cssClasses.removableFilter}>
        <div className={cssClasses.filterLabel}>{filter.label}</div>
        <button className={cssClasses.removeFilterButton} onClick={onRemoveFilter}>
          <CloseX />
        </button>
      </div>
    );
  }

  return (
    <>
      {displayableFilters.length > 0 && (
        <div className={cssClasses.appliedFiltersContainer} aria-label={labelText}>
          {displayableFilters.map((filter: DisplayableFilter) => {
            const key = `${filter.filterType}-${filter.label}`;
            if (filter.filterType === 'NLP_FILTER') {
              return <NlpFilter filter={filter} key={key} />;
            }
            return <RemovableFilter filter={filter} key={key} />;
          })}
        </div>
      )}
    </>
  );
}
