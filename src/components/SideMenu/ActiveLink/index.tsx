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

  const itMatchesHref = (href: string) => {
    return asPath.startsWith(href)
  }

  return (
    <Link href={href} passHref>
      <ChakraLink
        display="flex"
        // alignItems="flex-end"
        fontWeight="bold"
        p="2"
        _hover={{ color: "blue.500" }}
        {...rest}
      >
        <Icon as={icon} fontSize="xl" mr="4" color={itMatchesHref(href) && "blue.500"}/>        
        <Text color={itMatchesHref(href) && "blue.500"}>
          {label}
        </Text>
      </ChakraLink>
    </Link>
  );
};

export { ActiveLink };
