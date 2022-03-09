import { DisplayableFilter } from '../models/displayableFilter';

//prettier-ignore
interface FilterSentence {
  displayableFilters: DisplayableFilter[]
}

export default function FilterSentences({ displayableFilters }: FilterSentence): JSX.Element {
  function renderClassTypeFilters() {
    let classesSegment = '';

    const classFilters = displayableFilters.filter(
      (displayableFilter) => displayableFilter.filter.fieldId === 'c_classType'
    );

    if (classFilters.length > 0) {
      for (const [i, classFilter] of classFilters.entries()) {
        classesSegment = classesSegment.concat(
          i < classFilters.length - 1 ? `${classFilter.label}, ` : `${classFilter.label}`
        );
      }
    }

    return classesSegment;
  }

  function renderNeighborhoodsFilters() {
    let neighborhoodsSegment = '';

    const neighborhoodsFilters = displayableFilters.filter(
      (displayableFilter) => displayableFilter.filter.fieldId === 'c_trainer.linkedLocation.neighborhood'
    );

    if (neighborhoodsFilters.length > 0) {
      for (const [i, neighborhoodFilter] of neighborhoodsFilters.entries()) {
        neighborhoodsSegment = neighborhoodsSegment.concat(
          i < neighborhoodsFilters.length - 1 ? `${neighborhoodFilter.label}, ` : `${neighborhoodFilter.label}`
        );
      }
    }

    return neighborhoodsSegment;
  }

  function renderTimeOfDayFilters() {
    let timeOfDaySegment = '';

    const timeOfDayFilters = displayableFilters.filter(
      (displayableFilters) => displayableFilters.filter.fieldId === 'c_partOfDay'
    );

    if (timeOfDayFilters.length > 0) {
      for (const [i, timeOfDayFilter] of timeOfDayFilters.entries()) {
        timeOfDaySegment = timeOfDaySegment.concat(
          i < timeOfDayFilters.length - 1 ? `${timeOfDayFilter.label}, ` : `${timeOfDayFilter.label}`
        );
      }
    }

    return timeOfDaySegment;
  }

  function renderFilterSentence() {
    const classes = renderClassTypeFilters();
    const neighborhoods = renderNeighborhoodsFilters();
    const timesOfDay = renderTimeOfDayFilters();

    return (
      <div className="text-gold">
        <span>{classes}</span>
        <span className="text-white">{classes.length === 0 ? 'Classes' : ' classes'}</span>
        <span className="text-white">{neighborhoods.length > 0 && ' in '}</span>
        <span>{neighborhoods}</span>
        <span className="text-white">{timesOfDay.length > 0 && ' during the '}</span>
        <span>{timesOfDay}</span>
      </div>
    );
  }

  return (
    <>
      {displayableFilters.length > 0 && (
        <div className="mb-2 flex flex-grow pl-4 sm:pl-0">
          <div className="font-heading text-4xl sm:text-3xl">{renderFilterSentence()}</div>
          {/* <div className="font-heading text-4xl sm:text-3xl">{renderNeighborhoodsFilters()}</div> */}
        </div>
      )}
    </>
  );
}
