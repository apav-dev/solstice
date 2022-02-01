import { useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';

import { useContext } from 'react';
import { LocationContext } from '../../sections/LocationSection';
import { ResponsiveContext } from '../../App';

//prettier-ignore
export interface LocationCardConfig {
  showOrdinal?: boolean
}

//prettier-ignore
export interface LocationCardProps extends CardProps {
  configuration: LocationCardConfig
}

//prettier-ignore
interface Address {
  line1: string,
  city: string,
  countryCode: string,
  postalCode: string,
  region: string
}

//prettier-ignore
export interface Interval {
  start: string,
  end: string
}

//prettier-ignore
interface DayHours {
  isClosed: boolean,
  // TODO: change to optional field
  openIntervals: Interval[]
}

//prettier-ignore
export interface Hours {
  monday: DayHours,
  tuesday: DayHours,
  wednesday: DayHours,
  thursday: DayHours,
  friday: DayHours,
  saturday: DayHours,
  sunday: DayHours
}

//prettier-ignore
export interface LocationData {
  id?: string,
  address?: Address,
  name?: string,
  hours?: Hours
}

const builtInCssClasses = {
  container: 'flex flex-col justify-between border-b p-4 shadow-sm hover:bg-gray-900',
  header: 'flex text-base',
  body: 'flex justify-between pt-2.5 sm:text-sm font-body',
  descriptionContainer: 'sm:text-sm text-2xl',
  ctaContainer: 'flex flex-col justify-between ml-4',
  cta1: 'min-w-max bg-blue-600 text-white font-medium rounded-lg py-2 px-5 shadow',
  cta2: 'min-w-max bg-white text-blue-600 font-medium rounded-lg py-2 px-5 mt-2 shadow',
  ordinal: 'mr-1.5 text-lg font-medium',
  title: 'sm:text-base text-3xl font-medium font-body font-bold',
  ctaButton: 'flex justify-center border-2 w-2/5 rounded-md self-center	align-middle mt-4 hover:bg-gray-400',
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function LocationCard(props: LocationCardProps): JSX.Element {
  const { result } = props;
  const location = result.rawData as unknown as LocationData;

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  const locationContext = useContext(LocationContext);
  const isMobile = useContext(ResponsiveContext);

  function renderTitle(title: string) {
    return <div className={cssClasses.title}>{title}</div>;
  }

  function renderAddress(address?: Address) {
    if (!address) return;
    return (
      <div className={cssClasses.descriptionContainer}>
        <div>{location.address?.line1}</div>
        <div>{`${location.address?.city}, ${location.address?.region} ${location.address?.postalCode}`}</div>
      </div>
    );
  }

  function renderIsGymOpen(hours?: Hours) {
    // if day has openIntervals
    let classTime = '';
    switch (new Date().getDay()) {
      case 0:
        if (hours?.monday.isClosed) {
          return getGymText(true, '');
        } else {
          return getGymText(false, hours?.monday.openIntervals[0].end);
        }
      case 1:
        if (hours?.tuesday.isClosed) {
          return getGymText(true, '');
        } else {
          return getGymText(false, hours?.tuesday.openIntervals[0].end);
        }
      case 2:
        if (hours?.wednesday.isClosed) {
          return getGymText(true, '');
        } else {
          return getGymText(false, hours?.wednesday.openIntervals[0].end);
        }
      case 3:
        if (hours?.thursday.isClosed) {
          return getGymText(true, '');
        } else {
          return getGymText(false, hours?.thursday.openIntervals[0].end);
        }
      case 4:
        if (hours?.friday.isClosed) {
          return getGymText(true, '');
        } else {
          return getGymText(false, hours?.friday.openIntervals[0].end);
        }
      case 5:
        if (hours?.saturday.isClosed) {
          return getGymText(true, '');
        } else {
          return getGymText(false, hours?.saturday.openIntervals[0].end);
        }
      case 6:
        if (hours?.sunday.isClosed) {
          return getGymText(true, '');
        } else {
          return getGymText(false, hours?.sunday.openIntervals[0].end);
        }
    }

    if (!classTime) return;

    return <div className={cssClasses.body}>{classTime}</div>;
  }

  function getGymText(isClosed: boolean, time?: string) {
    return (
      <div className="flex flex-col text-2xl sm:text-sm">
        <div className="font-bold">{isClosed ? 'Closed' : 'Open'}</div>
        <div>{isClosed ? `Opens at ${time}` : `Closes at ${formatTime(time)}`}</div>
      </div>
    );
  }

  // TODO: move to util class and use in ClassCard
  function formatTime(time?: string) {
    if (!time) return;
    let hour: string | number = time.slice(0, 2);
    const ampm = +hour < 12 ? 'AM' : 'PM';
    hour = +hour % 12 || 12;
    return `${hour}:${time.slice(3, 5)}${ampm}`;
  }

  function updateLocationId(id?: string) {
    if (locationContext?.dispatch) locationContext?.dispatch(id || '');
  }

  return (
    <div
      className={cssClasses.container}
      onMouseOver={() => updateLocationId(location.id)}
      onMouseLeave={() => updateLocationId()}>
      <div className={cssClasses.header}>
        {/* {configuration.showOrdinal && result.index && renderOrdinal(result.index)} */}
        {renderTitle(location.name || '')}
      </div>
      <div className={cssClasses.body}>
        {renderAddress(location.address)}
        {renderIsGymOpen(location.hours)}
      </div>
      {!isMobile && (
        <div className={cssClasses.ctaButton}>
          <div className="sm:text-body align-middle font-heading text-3xl font-bold sm:text-base">JOIN US</div>
        </div>
      )}
    </div>
  );
}
