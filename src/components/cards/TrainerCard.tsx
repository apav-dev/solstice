import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import { CardProps } from "../../models/cardComponent";

export interface TrainerCardConfig {
  showOrdinal?: boolean
}

export interface TrainerCardProps extends CardProps {
  configuration: TrainerCardConfig
}

export interface SimpleImage {
  url: string,
  width: number,
  height: number
}

export interface Image extends SimpleImage {
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
export function TrainerCard(props: TrainerCardProps): JSX.Element {
  const { result } = props;
  const trainer = result.rawData as unknown as TrainerData;
  // const smallestThumbnail = trainer.logo?.image?.thumbnails[trainer.logo?.image?.thumbnails.length - 1].url

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderName(name?: string) {
    return <div className={cssClasses.name}>{name}</div>
  };

  function renderQuote(quote?: string) {
    return <div className={cssClasses.descriptionContainer}>{quote}</div>
  }

  return (
    <div className={cssClasses.container}>
      <div className='flex' style={{ height: "253px", width: "253px" }}>
        <img src={trainer.logo?.image?.url} alt="Trainer Headshot"/>
      </div>
      <div>{renderName(trainer.name)}</div>
      <div>{renderQuote(trainer.c_inspirationalQuote)}</div>
      <div className="flex justify-between text-black">
        <div className="flex justify-center border rounded-md self-center	align-middle mt-4 px-4 bg-white">
          <div className="align-middle font-heading font-bold">VIEW SCHEDULE</div>
        </div>
        <div className="flex justify-center border rounded-md self-center	align-middle mt-4 px-4 bg-white">
          <div className="align-middle font-heading font-bold ">CONTACT</div>
        </div>
      </div>
    </div>);
}