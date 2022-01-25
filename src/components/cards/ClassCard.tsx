import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import { CardProps } from "../../models/cardComponent";
import { Image } from "../cards/TrainerCard";
import { Hours, Interval } from "../cards/LocationCard";
import { ResponsiveContext } from "../../App";
import { useContext } from "react";
import { useAnswersState } from "@yext/answers-headless-react";

export interface ClassCardConfig {
  showOrdinal?: boolean
}

export interface ClassCardProps extends CardProps {
  configuration: ClassCardConfig
}

interface Trainer {
  entityId: string,
  name: string
}

interface PrimaryPhoto {
  image: Image
}

export interface ClassData {
  name?: string,
  c_trainer?: Trainer[],
  primaryPhoto: PrimaryPhoto,
  c_time?: Hours
}

export interface TrainerCardCssClasses {
  container?: string,
  descriptionContainer?: string,
  title?: string,
  body?: string,
  ctaButton?: string,
  ctaButtonText?: string
}

const builtInCssClasses: TrainerCardCssClasses = {
  container: 'flex sm:flex-col sm:justify-between border-b p-4 shadow-sm',
  descriptionContainer: 'w-full text-sm',
  title: 'sm:text-base text-3xl font-medium font-body font-bold',
  body: 'sm:text-base text-2xl font-medium font-body',
  ctaButton: 'flex justify-center border sm:w-full rounded-md self-center align-middle bg-white mt-4',
  ctaButtonText: 'align-middle font-heading font-bold text-black sm:text-base text-3xl'
}

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function ClassCard(props: ClassCardProps): JSX.Element {
  const { result } = props;
  const workoutClass = result.rawData as unknown as ClassData;
  const primaryTrainer = workoutClass.c_trainer && workoutClass.c_trainer.length ? workoutClass.c_trainer[0].name : "";

  const isMobile = useContext(ResponsiveContext);
  const searchType = useAnswersState(state => state.meta.searchType);

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderTitle(title?: string) {
    if(!title) return;
    return <div className={cssClasses.title}>{title}</div>
  };

  function renderTrainerName(trainerName?: string) {
    if(!trainerName) return;
    return( 
      <div className={cssClasses.body}>{trainerName}</div> 
    );
  }

  function getClassInterval(intervals: Interval[]) {
    const interval = intervals[0];
    
    const startTimeHour = interval.start.slice(0, 2);
    const endTimeHour = interval.end.slice(0,2);

    const startAMPM = +startTimeHour < 12 ? 'AM' : 'PM';
    const endAMPM = +endTimeHour < 12 ? 'AM' : 'PM';

    const startHour = +startTimeHour % 12 || 12;
    const endHour = +endTimeHour % 12 || 12;

    return `${startHour}:${interval.start.slice(3,5)}${startAMPM} - ${endHour}:${interval.end.slice(3,5)}${endAMPM}`
  }

  const mobileVerticalLayout  = ''

  function renderClassInterval(hours?: Hours) {
    // if day has openIntervals
    let classTime = '';
    switch (new Date().getDay())
    {
      case 0:
        if(hours?.monday.openIntervals){
          classTime = getClassInterval(hours.monday.openIntervals);
        }
        break;
      case 1:
        if(hours?.tuesday.openIntervals){
          classTime = getClassInterval(hours.tuesday.openIntervals);
        }
        break;
      case 2:
        if(hours?.wednesday.openIntervals){
          classTime = getClassInterval(hours.wednesday.openIntervals);
        }
        break;
      case 3:
        if(hours?.thursday.openIntervals){
          classTime = getClassInterval(hours.thursday.openIntervals);
        }
        break;
      case 4:
        if(hours?.friday.openIntervals){
          classTime = getClassInterval(hours.friday.openIntervals);
        }
        break;
      case 5:
        if(hours?.saturday.openIntervals){
          classTime = getClassInterval(hours.saturday.openIntervals);
        }
        break;
      case 6:
        if(hours?.sunday.openIntervals){
          classTime = getClassInterval(hours.sunday.openIntervals);
        }
        break;
    }
    
    if(!classTime) return;

    return <span className='sm:text-base whitespace-pre h-1/3 text-2xl font-medium font-body absolute bottom-2'>{classTime}</span>
  }

  return (
    <div className={cssClasses.container}>
      <div 
         // TODO: Cleanup with tailwind
        style={{ 
          width: searchType === 'universal' ? "256px" : isMobile ? '10rem' : "24rem",
          height: searchType === 'universal' ? "256px" : isMobile ? '10rem' : "24rem"
        }}
      >
        <img src={workoutClass.primaryPhoto.image.url} alt="Workout Class" style={{ height: '100%', width: '100%' }}/>
      </div>
      <div className="flex flex-col my-2 sm:space-y-2">
        <div className='flex flex-col sm:flex-row h-2/3 justify-between sm:justify-start sm:space-x-2 '>
          {renderTitle(workoutClass.name)}
          {/* TODO: why doesn't tailwind work here? */}
          {!isMobile && <div style={{ fontSize: '6px' }} className="text-[6px] bg-[#C4C4C4] self-center ">{`\u2B24`}</div>}
          {renderTrainerName(primaryTrainer)}
        </div>
        <div className="h-1/3 relative">
          {renderClassInterval(workoutClass.c_time)}
        </div>
      </div>
      {!isMobile &&
          <div className={cssClasses.ctaButton}>
            <div className={cssClasses.ctaButtonText}>SIGN UP</div>
          </div>
      }
    </div>
  );
}