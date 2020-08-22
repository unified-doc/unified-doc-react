import { Doc as DocInstance, Options } from 'unified-doc';

export * from 'unified-doc';

/** props for the react `Doc` component */
export interface Props {
  /** options for `doc` instance */
  options: Options;
  /** optional `className` to attach to rendered `docElement` */
  className?: string;
  /** a reference to the rendered `docElement` */
  ref?: React.Ref<HTMLDivElement>;
}

/** props for the `DocProvider` */
export interface ProviderProps {
  /** any React node */
  children: React.ReactNode;
  /** options for `doc` instance */
  options: Options;
}

/**
 * React component wrapping around a `doc` instance
 */
export function Doc(props: Props): React.ReactElement;

/**
 * Provider exposing the `doc` instance in a React context
 */
export function DocProvider(providerProps: ProviderProps): React.ReactElement;

/**
 * Access the `doc` instance exposed by the `DocProvider`
 */
export function useDoc(): DocInstance;
