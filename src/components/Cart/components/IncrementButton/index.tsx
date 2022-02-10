import { IconButton, IconButtonProps } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"

type Props = IconButtonProps & {
  handleIncrement: () => void;
}

export const IncrementButton = ({ handleIncrement, ...rest }: Props) => {
  return (
    <IconButton
      icon={<FiPlus/>} 
      bgColor="transparent"
      onClick={handleIncrement}
      _hover={{ svg: { color: 'blue.500' } }}
      {...rest}
    />      
  )
}