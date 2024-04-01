import { Button, Spinner } from "@nextui-org/react";

export default function LoadingButton({
  loading,
  text,
  spinnerSize,
  spinnerColor,
  ...props
}) {
  return (
    <Button className="text-xl font-normal" color="primary" {...props}>
      {loading ? (
        <Spinner color={spinnerColor || "white"} size={spinnerSize || "sm"} />
      ) : (
        text || "Button"
      )}
    </Button>
  );
}
