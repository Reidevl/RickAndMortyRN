import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    marginRight: 8,
    minWidth: 80,
    justifyContent: "center",
    height: 40,
  },
  label: {
    fontSize: 15,
    marginRight: 6,
  },
  iosOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  androidOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  iosModal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    minHeight: 180,
    maxHeight: 350,
  },
  androidModal: {
    borderRadius: 16,
    padding: 16,
    minWidth: 200,
    maxHeight: 250,
    elevation: 8,
    alignSelf: "center",
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
});
