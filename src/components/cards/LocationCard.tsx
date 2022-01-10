import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import { CardProps } from "../../models/cardComponent";
import { StandardCardCssClasses } from "./StandardCard";

export interface LocationCardConfig {
  showOrdinal?: boolean
}

export interface LocationCardProps extends CardProps {
  configuration: LocationCardConfig
}
interface Address {
  line1: string,
  city: string,
  countryCode: string,
  postalCode: string,
  region: string
}

export interface Interval {
  start: string,
  end: string
}

interface DayHours {
  isClosed: boolean,
  // TODO: change to optional field 
  openIntervals: Interval[]
}

export interface Hours {
  monday: DayHours,
  tuesday: DayHours,
  wednesday: DayHours,
  thursday: DayHours,
  friday: DayHours,
  saturday: DayHours,
  sunday: DayHours
}

export interface LocationData {
  address?: Address,
  name?: string,
  hours?: Hours
}

const builtInCssClasses: StandardCardCssClasses = {
  container: 'flex flex-col justify-between border-b p-4 shadow-sm ',
  header: 'flex text-base',
  body: 'flex justify-end pt-2.5 text-sm font-body',
  descriptionContainer: 'w-full text-sm',
  ctaContainer: 'flex flex-col justify-end ml-4',
  cta1: 'min-w-max bg-blue-600 text-white font-medium rounded-lg py-2 px-5 shadow',
  cta2: 'min-w-max bg-white text-blue-600 font-medium rounded-lg py-2 px-5 mt-2 shadow',
  ordinal: 'mr-1.5 text-lg font-medium',
  title: 'text-base font-medium font-body font-bold'
}

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function LocationCard(props: LocationCardProps): JSX.Element {
  const { result } = props;
  const location = result.rawData as unknown as LocationData;

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderTitle(title: string) {
    return <div className={cssClasses.title}>{title}</div>
  };

  function renderAddress(address?: Address){
    if(!address) return;
    return (
      <div className={cssClasses.descriptionContainer}>
        <div>{location.address?.line1}</div>
        <div>{`${location.address?.city}, ${location.address?.region} ${location.address?.postalCode}`}</div>
      </div>
    )
  };

  function renderHours(hours?: Hours){
    if(!hours) return;
    return (
      <div className="w-1/3 self-end">
        <div >Hours</div>
        <div>{`Monday: ${formatDayHours(hours.monday)}`}</div>
        <div>{`Tuesday: ${formatDayHours(hours.tuesday)}`}</div>
        <div>{`Wednesday: ${formatDayHours(hours.wednesday)}`}</div>
        <div>{`Thursday: ${formatDayHours(hours.tuesday)}`}</div>
        <div>{`Friday: ${formatDayHours(hours.friday)}`}</div>
        <div>{`Saturday: ${formatDayHours(hours.saturday)}`}</div>
        <div>{`Sunday: ${formatDayHours(hours.sunday)}`}</div>
      </div>
    )
  };

  function formatDayHours(dayHours: DayHours){
    return `${dayHours.openIntervals[0].start} - ${dayHours.openIntervals[0].end}`
  }

  return (
    <div className={cssClasses.container}>
      <div className={cssClasses.header}>
        {/* {configuration.showOrdinal && result.index && renderOrdinal(result.index)} */}
        {renderTitle(location.name || '')}
      </div>
      <div className={cssClasses.body}>
        {renderAddress(location.address)}
        {/* {renderHours(location.hours)} */}
      </div>
    </div>);
}