import RootNavigator from "../src/navigation/RootNavigator";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
      <RootNavigator />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
