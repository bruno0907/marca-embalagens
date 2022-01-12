import { ReactNode, memo } from "react"

import { GoBackButton } from "./GoBackButton"

import { 
  Flex, 
  Heading, 
  FlexProps, 
  Spacer 
} from "@chakra-ui/react"

type Props = FlexProps & {
  withGoBack?: boolean;
  to?: string;
  children?: ReactNode;
  title?: string;
}

const HeaderComponent = ({ withGoBack, children, title, to, ...rest }: Props) => {
  return (
    <Flex id="header" align="center" justify="space-between" {...rest}>
      { withGoBack && <GoBackButton to={to}/> }
      { title && <Heading fontSize="xx-large" mr="auto">{title}</Heading>}
      { children ? children : <Flex w="10" h="10"/> }
    </Flex>
  )
}

const Header = memo(HeaderComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.title, nextProps.title)
})

export { Header }
