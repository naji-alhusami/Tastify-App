import * as React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  labelValue: string;
  inputType: string;
  className: string;
  hasErrors: boolean;
  errorsMessage: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      htmlFor,
      labelValue,
      inputType,
      className,
      hasErrors,
      errorsMessage,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <label htmlFor={htmlFor}>{labelValue}</label>
        <input
          ref={ref}
          type={inputType}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...props}
        />
        {hasErrors && <p className="text-sm text-red-500">{errorsMessage}</p>}
      </>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
