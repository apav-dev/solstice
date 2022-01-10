import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import { CardProps } from "../../models/cardComponent";
import { StandardCardCssClasses } from "./StandardCard";

export interface TrainerCardConfig {
  showOrdinal?: boolean
}

export interface TrainerCardProps extends CardProps {
  configuration: TrainerCardConfig
}

interface SimpleImage {
  url: string,
  width: number,
  height: number
}

interface Image extends SimpleImage {
  sourceUrl: string,
  thumbnails: SimpleImage[]
}

interface Logo {
  image?: Image
}

export interface TrainerData {
  name?: string,
  c_inspirationalQuote?: string,
  logo?: Logo
}

const builtInCssClasses: StandardCardCssClasses = {
  container: 'flex flex-col justify-between border-b p-4 shadow-sm',
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
export function TrainerCard(props: TrainerCardProps): JSX.Element {
  const { result } = props;
  const trainer = result.rawData as unknown as TrainerData;
  const smallestThumbnail = trainer.logo?.image?.thumbnails[trainer.logo?.image?.thumbnails.length - 1].url

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderName(name?: string) {
    return <div className={cssClasses.title}>{name}</div>
  };

  function renderQuote(quote?: string) {
    return <div className={cssClasses.descriptionContainer}>{quote}</div>
  }

  return (
    <div className={cssClasses.container}>
      <img style={{ minWidth: '253px' }} src={smallestThumbnail} alt="Trainer Headshot"/>
      <div>{renderName(trainer.name)}</div>
      <div>{renderQuote(trainer.c_inspirationalQuote)}</div>
    </div>);
}