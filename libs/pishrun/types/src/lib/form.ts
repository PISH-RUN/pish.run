export type FormProps<T> = {
  onSubmit: (values: T) => void;
  disabled: boolean;
  loading: boolean;
  error?: string | null;
  didChange: () => void;
};
