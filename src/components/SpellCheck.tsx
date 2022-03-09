import { useAnswersState, useAnswersActions, SearchTypeEnum } from '@yext/answers-headless-react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';

//prettier-ignore
interface SpellCheckCssClasses {
  container?: string,
  helpText?: string,
  spellCheck___loading?: string,
  link?: string
}

//prettier-ignore
const builtInCssClasses: SpellCheckCssClasses = {
  container: 'text-lg pb-3',
  helpText: 'text-gray-600',
  spellCheck___loading: 'opacity-50',
  link: 'text-blue-600 font-bold cursor-pointer hover:underline focus:underline'
}

//prettier-ignore
interface Props {
  customCssClasses?: SpellCheckCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function SpellCheck({ customCssClasses, cssCompositionMethod }: Props): JSX.Element | null {
  const isVertical = useAnswersState((s) => s.meta.searchType) === SearchTypeEnum.Vertical;
  const verticalKey = useAnswersState((s) => s.vertical.verticalKey);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const correctedQuery = useAnswersState((state) => state.spellCheck.correctedQuery);
  const isLoading = useAnswersState((state) => state.searchStatus.isLoading);
  const browserHistory = useHistory();
  const containerClassNames = cssClasses.spellCheck___loading
    ? classNames(cssClasses.container, { [cssClasses.spellCheck___loading]: isLoading })
    : cssClasses.container;
  const answersActions = useAnswersActions();
  if (!correctedQuery) {
    return null;
  }
  return (
    <div className={containerClassNames}>
      <span className={cssClasses.helpText}>Did you mean </span>
      <button
        className={cssClasses.link}
        onClick={() => {
          answersActions.setQuery(correctedQuery);
          browserHistory.push(`/${isVertical ? verticalKey : 'all'}?query=${verticalKey}`);
        }}>
        {correctedQuery}
      </button>
    </div>
  );
}
