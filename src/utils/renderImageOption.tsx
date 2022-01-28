import { CheckboxOption, CheckboxOptionCssClasses } from './renderCheckboxOption';
import { ReactComponent as BoxingIcon } from '../icons/boxing.svg';
import classnames from 'classnames';

//prettier-ignore
interface ImageOptionProps {
  option: CheckboxOption,
  image?: JSX.Element,
  onClick: (isChecked: boolean) => void,
  selected?: boolean,
  customCssClasses?: CheckboxOptionCssClasses
}

const builtInCssClasses: CheckboxOptionCssClasses = {
  option: 'flex flex-col border-4 rounded-xl justify-center items-center p-4',
  // optionInput:
  //   'w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500',
  optionLabel: 'font-heading text-3xl',
};

export default function renderImageOption({ option, image, selected, onClick, customCssClasses }: ImageOptionProps) {
  const cssClasses = { ...builtInCssClasses, ...customCssClasses };
  return (
    <div
      id={option.id}
      className={classnames(cssClasses.option, { 'bg-gold': selected })}
      key={option.id}
      onClick={() => onClick(true)}>
      {/* {image} */}
      {image}
      <div className={cssClasses.optionLabel}>{option.label}</div>
      {/* <input
        type="checkbox"
        id={option.id}
        checked={selected}
        className={cssClasses.optionInput}
        onChange={(evt) => onClick(evt.target.checked)}
      /> */}
      {/* <label className={cssClasses.optionLabel} htmlFor={option.id}>
        {option.label}
      </label> */}
    </div>
  );
}
