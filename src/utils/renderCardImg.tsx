import classNames from 'classnames';

export default function renderCardImg(isVertical = false, alt: string, imgUrl?: string, imgText?: string) {
  return (
    <div className={classNames('group relative h-auto w-80', { 'sm:w-full': isVertical })}>
      <div className="absolute top-0 bottom-0 right-0 left-0 w-full bg-gray-900 object-cover opacity-0 transition duration-300 ease-linear sm:group-hover:opacity-90"></div>
      <img src={imgUrl} alt={alt} className="w-full object-cover sm:object-fill" />
      {imgText && (
        <div className="absolute top-1/4 transform px-8 opacity-0 transition duration-500 sm:group-hover:opacity-100 ">
          <div className="md:text-body w-full text-center font-heading text-sm xl:text-lg">{imgText}</div>
        </div>
      )}
    </div>
  );
}
