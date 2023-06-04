import { useFormikContext } from 'formik';

type disabledProps = 'dirty' | 'isValid' | 'dirty & isValid';

import Button, { ButtonProps } from '../Element/Button';

interface SubmitProps extends ButtonProps {
  formValidation?: disabledProps;
}

export default function Submit({
  label,
  formValidation,
  variant,
  ...props
}: SubmitProps): JSX.Element | null {
  const { handleSubmit, isValid, dirty } = useFormikContext();

  const validateBtn = () => {
    switch (formValidation) {
      case 'isValid':
        return !isValid;
      case 'dirty':
        return !dirty;
      case 'dirty & isValid':
        return !(dirty && isValid);
      default:
        return false;
    }
  };

  return (
    <Button
      {...{ label }}
      variant={variant}
      onPress={handleSubmit}
      disabled={validateBtn()}
      {...props}
    />
  );
}
