import { IconButton, IconButtonProps } from "@chakra-ui/react"
import { FiMinus } from "react-icons/fi"

type Props = IconButtonProps & {
  handleDecrement: () => void
}

export const DecrementButton = ({ handleDecrement, ...rest }: Props) => {
  return (
    <IconButton      
      icon={<FiMinus/>}
      bgColor="transparent"
      onClick={handleDecrement}
      _hover={{ svg: { color: 'blue.500' } }}
      {...rest}
    />
  )
}