import React, {Suspense} from 'react';
import {
  Center,
  Heading, Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import SalePass from "./components/SalePass";
import OwnedPass from "./components/OwnedPass";
import About from "./components/About";
import {useHistory} from "react-router-dom";
import qs from "qs";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import TheFooter from "../../components/TheFooter";
import {withPrefix} from "@onflow/fcl";

export function Account() {
  const tabs = [
    {key: "owned", label: "Owned", path: "owned"},
    {key: "sale", label: "Sale", path: "sale"},
  ]

  const history = useHistory();
  const {tab} = qs.parse(history.location.search.replace(/^\?/, ''))
  const [tabIndex, setTabIndex] = React.useState(getTabIndex(tab))
  const [user, loggedIn] = useCurrentUserHook()
  const address = withPrefix(history.location.pathname.slice(1))

  function getTabIndex(tab) {
    const index = tabs.findIndex((item) => item.key === tab)
    return (index < 0) ? 0 : index
  }

  const handleTabsChange = (index) => {
    setTabIndex(index)
    if (index === 0) {
      history.push("pass")
    } else {
      history.push("pass?tab=" + tabs[index].path)
    }
  }

  if (!loggedIn) {
    return (
      <AccountSkeleton />
    )
  }

  return (
      <Stack pl={4} pr={4}>
        <About address={address}/>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            {tabs.map((tab, index) => (
              <Tab key={index}><Heading fontSize={"md"}>{tab.label}</Heading></Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <OwnedPass address={address}/>
            </TabPanel>
            <TabPanel>
              <SalePass address={address}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Stack h={20} />
      </Stack>
  );
}

export function AccountSkeleton() {
  return (
    <Center minH={"60vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedAccount() {
  return (
    <Suspense fallback={<AccountSkeleton />}>
      <Account/>
      <TheFooter/>
    </Suspense>
  )
}