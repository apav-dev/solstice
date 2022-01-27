import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';

//prettier-ignore
interface CheckboxOptionLabel {
  id: string,
  label: string
}

//prettier-ignore
export interface CheckboxOptionCssClasses {
  option?: string,
  optionLabel?: string,
  optionInput?: string
}

//prettier-ignore
interface CheckBoxOptionProps {
  option: CheckboxOptionLabel,
  onClick: (isChecked: boolean) => void,
  selected?: boolean,
  customCssClasses?: CheckboxOptionCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export const builtInCssClasses: CheckboxOptionCssClasses = {
  option: 'flex items-center space-x-3',
  optionInput:
    'w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500',
  optionLabel: 'text-gray-500 text-sm font-normal cursor-pointer',
};

export default function CheckboxOption({
  option,
  selected,
  onClick,
  customCssClasses,
  cssCompositionMethod,
}: CheckBoxOptionProps) {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  return (
    <div className={cssClasses.option} key={option.id}>
      <input
        type="checkbox"
        id={option.id}
        checked={selected}
        className={cssClasses.optionInput}
        onChange={(evt) => onClick(evt.target.checked)}
      />
      <label className={cssClasses.optionLabel} htmlFor={option.id}>
        {option.label}
      </label>
    </div>
  );
}
