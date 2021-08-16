import {Button, Center, Divider, Heading, Spacer, Stack} from "@chakra-ui/react";
import {useInitialized} from "../../hooks/use-initialized";
import {useCurrentUser} from "../../hooks/use-current-user";
import {IDLE, PROCESSING} from "../../global/constants";
import {Suspense} from "react";
import StatusItem from "./StatusItem";

export function Initialize() {
  const [cu] = useCurrentUser()
  const init = useInitialized(cu.addr)

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={4} w={650}>
        <Heading>Initialize account</Heading>
        <Divider/>
        <StatusItem status={init.status} name={"WakandaToken"} item={init.WakandaToken}/>
        <StatusItem status={init.status} name={"WakandaPass"} item={init.WakandaPass}/>
        <StatusItem status={init.status} name={"WakandaProfile"} item={init.WakandaProfile}/>
        <Divider/>
        <Stack direction={"row"}>
          <Spacer/>
          <Button disabled={init.status !== IDLE || (init.WakandaToken && init.WakandaPass && init.WakandaProfile)}
                  isLoading={init.status === PROCESSING}
                  onClick={init.initialize} w={40} colorScheme={"blue"}>
            {(init.WakandaToken && init.WakandaPass && init.WakandaProfile) ? "Done" : "Initialize"}
          </Button>
        </Stack>
      </Stack>
    </Center>
  )
}

export default function WrappedInitialize() {
  return (
    <Suspense fallback={
      <Center>
        <Stack pl={4} pr={4} spacing={4} w={650}>
          <Heading>Initialize account</Heading>
          <Divider/>
          <StatusItem status={PROCESSING} name={"WakandaToken"} item={false}/>
          <StatusItem status={PROCESSING} name={"WakandaPass"} item={false}/>
          <StatusItem status={PROCESSING} name={"WakandaProfile"} item={false}/>
          <Divider/>
          <Stack direction={"row"}>
            <Spacer/>
            <Button isLoading w={40} loadingText="Checking"/>
          </Stack>
        </Stack>
      </Center>
    }>
      <Initialize/>
    </Suspense>
  )
}