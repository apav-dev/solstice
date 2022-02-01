import { useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';
import { Image } from '../cards/TrainerCard';
import { Hours, Interval } from '../cards/LocationCard';
import { ResponsiveContext } from '../../App';
import { useContext } from 'react';
import { useAnswersState } from '@yext/answers-headless-react';
import classNames from 'classnames';

//prettier-ignore
export interface ClassCardConfig {
  showOrdinal?: boolean
}

//prettier-ignore
export interface ClassCardProps extends CardProps {
  configuration: ClassCardConfig
}

//prettier-ignore
interface Trainer {
  entityId: string,
  name: string
}

//prettier-ignore
interface PrimaryPhoto {
  image: Image
}

//prettier-ignore
export interface ClassData {
  name?: string,
  c_trainer?: Trainer[],
  primaryPhoto: PrimaryPhoto,
  c_time?: Hours
}

//prettier-ignore
export interface TrainerCardCssClasses {
  container?: string,
  descriptionContainer?: string,
  title?: string,
  body?: string,
  ctaButton?: string,
  ctaButtonText?: string
}

const builtInCssClasses: TrainerCardCssClasses = {
  container: 'flex sm:justify-between border-b p-4 shadow-sm ',
  descriptionContainer: 'w-full sm:text-sm',
  title: 'sm:text-base text-3xl font-medium font-body font-bold',
  body: 'sm:text-base text-2xl font-medium font-body',
  ctaButton: 'flex justify-center border w-full rounded-md self-center align-middle mt-4 hover:bg-gray-400',
  ctaButtonText: 'align-middle font-heading font-bold sm:text-base text-3xl',
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function ClassCard(props: ClassCardProps): JSX.Element {
  const { result } = props;
  const workoutClass = result.rawData as unknown as ClassData;
  const primaryTrainer = workoutClass.c_trainer && workoutClass.c_trainer.length ? workoutClass.c_trainer[0].name : '';

  const isMobile = useContext(ResponsiveContext);
  const searchType = useAnswersState((state) => state.meta.searchType);

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderTitle(title?: string) {
    if (!title) return;
    return <span className={cssClasses.title}>{title}</span>;
  }

  function renderTrainerName(trainerName?: string) {
    if (!trainerName) return;
    return <span className={cssClasses.body}>{trainerName}</span>;
  }

  function getClassInterval(intervals: Interval[]) {
    const interval = intervals[0];

    const startTimeHour = interval.start.slice(0, 2);
    const endTimeHour = interval.end.slice(0, 2);

    const startAMPM = +startTimeHour < 12 ? 'AM' : 'PM';
    const endAMPM = +endTimeHour < 12 ? 'AM' : 'PM';

    const startHour = +startTimeHour % 12 || 12;
    const endHour = +endTimeHour % 12 || 12;

    return `${startHour}:${interval.start.slice(3, 5)}${startAMPM} - ${endHour}:${interval.end.slice(3, 5)}${endAMPM}`;
  }

  function renderClassInterval(hours?: Hours) {
    // if day has openIntervals
    let classTime = '';
    switch (new Date().getDay()) {
      case 0:
        if (hours?.monday.openIntervals) {
          classTime = getClassInterval(hours.monday.openIntervals);
        }
        break;
      case 1:
        if (hours?.tuesday.openIntervals) {
          classTime = getClassInterval(hours.tuesday.openIntervals);
        }
        break;
      case 2:
        if (hours?.wednesday.openIntervals) {
          classTime = getClassInterval(hours.wednesday.openIntervals);
        }
        break;
      case 3:
        if (hours?.thursday.openIntervals) {
          classTime = getClassInterval(hours.thursday.openIntervals);
        }
        break;
      case 4:
        if (hours?.friday.openIntervals) {
          classTime = getClassInterval(hours.friday.openIntervals);
        }
        break;
      case 5:
        if (hours?.saturday.openIntervals) {
          classTime = getClassInterval(hours.saturday.openIntervals);
        }
        break;
      case 6:
        if (hours?.sunday.openIntervals) {
          classTime = getClassInterval(hours.sunday.openIntervals);
        }
        break;
    }

    if (!classTime) return;

    return (
      <span className="font-body text-2xl font-medium sm:text-base">
        {/* "absolute bottom-2 h-1/3 whitespace-pre font-body text-2xl font-medium sm:text-base" */}
        {classTime}
      </span>
    );
  }

  const isVertical = useAnswersState((s) => s.meta.searchType) === 'vertical';

  const renderLayout = () => (
    <div className="flex flex-col ">
      <div className="flex flex-col justify-between sm:flex-row sm:justify-start sm:space-x-2">
        {renderTitle(workoutClass.name)}
        {/* TODO: why doesn't tailwind work here? */}
        <span style={{ fontSize: '6px' }} className="self-center bg-[#C4C4C4] text-[6px] ">{`\u2B24`}</span>
        {renderTrainerName(primaryTrainer)}
      </div>
      <div className="relative ">{renderClassInterval(workoutClass.c_time)}</div>
    </div>
  );

  const renderMobileLayout = () => {
    return (
      <div className="my-4 ml-4 flex w-2/5 flex-col justify-between">
        {renderTitle(workoutClass.name)}
        {renderTrainerName(primaryTrainer)}
        {renderClassInterval(workoutClass.c_time)}
      </div>
    );
  };

  return (
    <div className="my-8 flex  p-4 sm:flex-col">
      <div
        // className="sm:h-16 sm:w-20"
        style={{
          height: !isMobile && !isVertical ? '16rem' : '',
          // width: isMobile ? '22rem' : '16rem',
          width: !isMobile && !isVertical ? '20rem' : '',
        }}>
        <img
          src={workoutClass.primaryPhoto.image.url}
          alt="Workout Class"
          style={{ objectFit: 'cover', width: '100vh', height: '250px' }}
        />
      </div>
      {isMobile ? renderMobileLayout() : renderLayout()}
      {!isMobile && (
        <div className={cssClasses.ctaButton}>
          <div className={cssClasses.ctaButtonText}>SIGN UP</div>
        </div>
      )}
    </div>
  );
}
