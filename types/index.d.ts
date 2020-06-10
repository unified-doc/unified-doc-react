import { Annotation, AnnotationCallbacks } from 'unified-doc';

type Optional<T> = {
  [P in keyof T]?: T[P];
};

export interface Props {
  filename: string;
  className?: string;
  content?: string | Buffer;
  annotations?: Annotation[];
  annotationCallbacks?: Optional<AnnotationCallbacks>;
  plugins?: any[]; // TODO: figure out how to type this correctly
  sanitizeSchema?: Record<string, unknown>;
}

export default function Doc(props: Props): React.ReactElement;
