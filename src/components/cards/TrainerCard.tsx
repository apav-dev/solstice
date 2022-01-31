import { useAnswersState } from '@yext/answers-headless-react';
import { useContext } from 'react';
import { ResponsiveContext } from '../../App';
import { useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';

//prettier-ignore
export interface TrainerCardConfig {
  showOrdinal?: boolean
}

//prettier-ignore
export interface TrainerCardProps extends CardProps {
  configuration: TrainerCardConfig
}

//prettier-ignore
export interface SimpleImage {
  url: string,
  width: number,
  height: number
}

//prettier-ignore
export interface Image extends SimpleImage {
  sourceUrl: string,
  thumbnails: SimpleImage[]
}

//prettier-ignore
interface Logo {
  image?: Image
}

//prettier-ignore
export interface TrainerData {
  name?: string,
  c_inspirationalQuote?: string,
  logo?: Logo
}

//prettier-ignore
export interface TrainerCardCssClasses {
  container?: string,
  descriptionContainer?: string,
  name?: string,
  // TODO: why can't I use the tailwind pixels here
  trainerPhoto?: string,
  ctaButton?: string,
  ctaButtonText?: string
}

//prettier-ignore
const builtInCssClasses: TrainerCardCssClasses = {
  container: 'flex flex-col border-b p-4 shadow-sm',
  descriptionContainer: 'w-full sm:text-sm text-3xl font-heading ',
  name: 'sm:text-base text-3xl font-medium font-body font-bold',
  ctaButton: 'flex border rounded-md mt-4 px-4 bg-black justify-center hover:bg-gray-400',
  ctaButtonText: 'font-heading text-white font-bold sm:text-base text-3xl py-3 sm:py-0',
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function TrainerCard(props: TrainerCardProps): JSX.Element {
  const { result } = props;
  const trainer = result.rawData as unknown as TrainerData;
  const trainerImg = trainer.logo?.image?.url ?? '';
  // const smallestThumbnail = trainer.logo?.image?.thumbnails[trainer.logo?.image?.thumbnails.length - 1].url

  const isMobile = useContext(ResponsiveContext);

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderName(name?: string) {
    return <div className={cssClasses.name}>{name}</div>;
  }

  function renderQuote(quote?: string) {
    return <div className={cssClasses.descriptionContainer}>{quote}</div>;
  }

  const isVertical = useAnswersState((s) => s.meta.searchType) === 'vertical';

  return (
    <div className={cssClasses.container}>
      <div
        // style={{ height: isMobile ? '512px' : '256px', width: isMobile ? '512px' : '256px' }
        style={{
          height: !isMobile && !isVertical ? '16rem' : '',
          // width: isMobile ? '22rem' : '16rem',
          width: !isMobile && !isVertical ? '20rem' : '',
        }}>
        <img src={trainerImg} alt="Trainer Headshot" style={{ objectFit: 'cover', width: '500px', height: '250px' }} />
      </div>
      <div className="">
        {/* <div> */}
        <div>{renderName(trainer.name)}</div>
        <div className="h-6">{renderQuote(trainer.c_inspirationalQuote)}</div>
        {/* </div> */}
      </div>
      <div className="flex flex-col text-black sm:flex-row sm:justify-between">
        <div className={cssClasses.ctaButton}>
          <div className={cssClasses.ctaButtonText}>VIEW SCHEDULE</div>
        </div>
        <div className={cssClasses.ctaButton}>
          <div className={cssClasses.ctaButtonText}>CONTACT</div>
        </div>
      </div>
    </div>
  );
}
