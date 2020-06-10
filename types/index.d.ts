import {
  Annotation,
  AnnotationCallbacks,
  Plugin,
  SearchAlgorithm,
} from 'unified-doc';

export type Optional<T> = {
  [P in keyof T]?: T[P];
};

export interface Props {
  filename: string;
  className?: string;
  content?: string | Buffer;
  annotations?: Annotation[];
  annotationCallbacks?: Optional<AnnotationCallbacks>;
  plugins?: Plugin[] | Plugin[][];
  sanitizeSchema?: object;
}

export default function Doc(props: Props): React.ReactElement;
