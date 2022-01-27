import { useContext } from 'react';
import { ResponsiveContext } from '../../App';
import { useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';

export interface TrainerCardConfig {
  showOrdinal?: boolean;
}

export interface TrainerCardProps extends CardProps {
  configuration: TrainerCardConfig;
}

export interface SimpleImage {
  url: string;
  width: number;
  height: number;
}

export interface Image extends SimpleImage {
  sourceUrl: string;
  thumbnails: SimpleImage[];
}

interface Logo {
  image?: Image;
}

export interface TrainerData {
  name?: string;
  c_inspirationalQuote?: string;
  logo?: Logo;
}

export interface TrainerCardCssClasses {
  container?: string;
  descriptionContainer?: string;
  name?: string;
  // TODO: why can't I use the tailwind pixels here
  trainerPhoto?: string;
  ctaButton?: string;
  ctaButtonText?: string;
}

const builtInCssClasses: TrainerCardCssClasses = {
  container: 'flex flex-col justify-between border-b p-4 shadow-sm',
  descriptionContainer: 'w-full sm:text-sm text-2xl',
  name: 'sm:text-base text-3xl font-medium font-body font-bold',
  ctaButton: 'flex border rounded-md mt-4 px-4 bg-white',
  ctaButtonText: 'font-heading font-bold sm:text-base text-3xl ',
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function TrainerCard(props: TrainerCardProps): JSX.Element {
  const { result } = props;
  const trainer = result.rawData as unknown as TrainerData;
  // const smallestThumbnail = trainer.logo?.image?.thumbnails[trainer.logo?.image?.thumbnails.length - 1].url

  const isMobile = useContext(ResponsiveContext);

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderName(name?: string) {
    return <div className={cssClasses.name}>{name}</div>;
  }

  function renderQuote(quote?: string) {
    return <div className={cssClasses.descriptionContainer}>{quote}</div>;
  }

  return (
    <div className={cssClasses.container}>
      <div style={{ height: isMobile ? '512px' : '256px', width: isMobile ? '512px' : '256px' }}>
        <img src={trainer.logo?.image?.url} alt="Trainer Headshot" />
      </div>
      <div>{renderName(trainer.name)}</div>
      <div className="h-6">{renderQuote(trainer.c_inspirationalQuote)}</div>
      <div className="flex justify-between text-black">
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
