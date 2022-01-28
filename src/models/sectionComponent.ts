import { Result } from '@yext/answers-headless-react';
import { CardConfig } from './cardComponent';

//prettier-ignore
export interface SectionConfig {
  results: Result[],
  verticalKey: string,
  header?: JSX.Element,
  cardConfig?: CardConfig,
  viewMore?: boolean,
  label?: string
}

/**
 * A component that can be used to render a section template for vertical results.
 */
export type SectionComponent = (props: SectionConfig) => JSX.Element | null;
