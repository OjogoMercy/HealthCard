import { useEffect } from "react";
import RootNavigator from "../src/navigation/RootNavigator";
import { useBabyStore } from "@/src/store/useBabyStore";
export default function RootLayout() {
  const baby = useBabyStore((s)=> s.baby)
  const setBaby = useBabyStore((s)=> s.setBaby)
  
useEffect(()=> {
  if(baby){
    setBaby(baby)
  }
},[])

  return <RootNavigator />;
}
