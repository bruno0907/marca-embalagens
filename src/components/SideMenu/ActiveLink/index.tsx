import { ElementType } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

import {
  Link as ChakraLink,
  Text,
  Icon,
  Flex,
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
        px="2"
        py="6"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        color={asPath.startsWith(href) && "blue.500"}
        bgColor={asPath.startsWith(href) && "blue.500"}
        borderColor={asPath.startsWith(href) ? "blue.500" : "gray.200"}
        borderWidth="1px"
        borderRadius="3xl"
        fontWeight="bold"
        _hover={{          
          color: "gray.50",
          svg: {
            color: "blue.500"
          },
          borderColor: "blue.500",
          bgColor: 'blue.500'
        }}
        {...rest}
      >
        <Flex
          p="2.5"
          align="center"
          justify="center"
          bgColor="gray.100"
          borderRadius="100%"          
        >
          <Icon
            as={icon}
            fontSize="24"
          />
        </Flex>
        <Text color={asPath.startsWith(href) && "gray.50"} mt="1" mb="-0.5">
          {label}
        </Text>
      </ChakraLink>
    </Link>
  );
};

export { ActiveLink };
