import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import { CardProps } from "../../models/cardComponent";
import { Image } from "../cards/TrainerCard";
import { Hours } from "../cards/LocationCard";

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
  c_trainer?: Trainer,
  primaryPhoto: PrimaryPhoto,
  c_time?: Hours
}

export interface TrainerCardCssClasses {
  container?: string,
  descriptionContainer?: string,
  name?: string
}

const builtInCssClasses: TrainerCardCssClasses = {
  container: 'flex flex-col justify-between border-b p-4 shadow-sm',
  descriptionContainer: 'w-full text-sm',
  name: 'text-base font-medium font-body font-bold'
}

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function ClassCard(props: ClassCardProps): JSX.Element {
  const { result } = props;
  const workoutClass = result.rawData as unknown as ClassData;
  // const smallestThumbnail = trainer.logo?.image?.thumbnails[trainer.logo?.image?.thumbnails.length - 1].url

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderName(name?: string) {
    return <div className={cssClasses.name}>{name}</div>
  };

  return (
    <div className={cssClasses.container}>
      <div className='flex' style={{ height: "253px", width: "253px" }}>
        <img src={workoutClass.primaryPhoto.image.url} alt="Workout Class"/>
      </div>
      <div>{renderName(workoutClass.name)}</div>
    </div>);
}