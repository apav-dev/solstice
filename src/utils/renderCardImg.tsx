import classNames from 'classnames';

type PhotoType = 'class' | 'trainer';

export default function renderCardImg(
  isVertical = false,
  alt: string,
  type: PhotoType,
  imgUrl?: string,
  imgText?: string
) {
  // const trainerImgStyle = isVertical ? ''
  return (
    <div
      className={classNames(
        'group relative',
        // { 'h-24 w-40 sm:h-64 sm:w-full': type === 'class' },
        { 'h-60 w-80 self-center sm:h-64 sm:w-96': type === 'trainer' },
        { 'h-24 w-48 sm:h-64': type === 'class' },
        { 'sm:w-96': !isVertical },
        { 'sm:w-full': isVertical }
      )}>
      <div className="absolute top-0 bottom-0 right-0 left-0 w-full bg-gray-900 object-cover opacity-0 transition duration-300 ease-linear sm:group-hover:opacity-90"></div>
      <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})` }} />
      {imgText && (
        <div className="absolute top-1/4 transform px-8 opacity-0 transition duration-500 sm:group-hover:opacity-100 ">
          <div className="md:text-body w-full text-center font-heading text-sm xl:text-lg">{imgText}</div>
        </div>
      )}
    </div>
  );
}
