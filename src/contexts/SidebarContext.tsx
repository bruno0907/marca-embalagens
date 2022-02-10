import { createContext, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";

interface ProviderProps { children: ReactNode; }

type ContextProps = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as ContextProps);

export const SidebarDrawerProvider = ({ children }: ProviderProps) => {
  const disclosure = useDisclosure();
  const { asPath } = useRouter()

  useEffect(() => disclosure.onClose(), [asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
