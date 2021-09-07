import { ElementType } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

import {
  Link as ChakraLink,
  Text,
  Icon,  
  LinkProps
} from '@chakra-ui/react'

interface ActiveLinkProps extends LinkProps {
  icon: ElementType;
  label: string;
  href: string;
}

const ActiveLink = ({ icon, label, href, ...rest }: ActiveLinkProps) => {
  const { asPath } = useRouter()

  return (
    <Link href={href} passHref>
      <ChakraLink
        display="flex"
        alignItems="center"
        fontWeight="bold"
        p="2"
        _hover={{ color: "blue.500" }}
        {...rest}
      >
        <Icon as={icon} fontSize="16" mr="4"/>        
        <Text color={asPath.startsWith(href) && "blue.500"}>
          {label}
        </Text>
      </ChakraLink>
    </Link>
  );
};

export { ActiveLink };
