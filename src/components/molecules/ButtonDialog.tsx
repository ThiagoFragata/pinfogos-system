import { Dialog, DialogProps } from '../atoms/Dialog'

type ButtonDialogProps = DialogProps

export function ButtonDialog({
  description,
  title,
  onPress,
  children,
}: ButtonDialogProps) {
  return (
    <Dialog title={title} description={description} onPress={onPress}>
      {children}
    </Dialog>
  )
}
