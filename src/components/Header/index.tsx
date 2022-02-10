import { ReactNode, memo } from "react"

import { GoBackButton } from "./GoBackButton"

import {
  Heading,   
  Stack,
  HStack,
  StackProps
} from "@chakra-ui/react"

type Props = StackProps & {
  withGoBack?: boolean;
  to?: string;
  children?: ReactNode;
  title?: string;
}

const HeaderComponent = ({ withGoBack, children, title, to, ...rest }: Props) => {
  return (
    <Stack id="header" direction={['column', 'row', 'row']} spacing={6} align={['initial', 'center', 'center']} justify="space-between" {...rest}>
      <HStack spacing={3} align="center">
        { withGoBack && <GoBackButton to={to}/> }
        <Heading fontSize={['xl', 'xl', '3xl']}>{title}</Heading>
      </HStack>
      { children }
    </Stack>
  )
}

const Header = memo(HeaderComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.title, nextProps.title)
})

export { Header }
