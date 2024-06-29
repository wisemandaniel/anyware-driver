import { ViewStyle } from "react-native";

type ISharedStyleArg =
  | "row"
  | "rowBetween"
  | "rowBetweenWrap"
  | "rowCenter"
  | "rowBetweenWrapCenter"
  | "rowCenterWrap"
  | "rowBetweenStart"
  | "rowEnd"
  | "rowStart"
  | "rowWrap"
  | "rowBetweenCenter";

const SharedStyles: Record<ISharedStyleArg, ViewStyle> = {
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rowBetweenStart: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowBetweenWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  rowBetweenWrapCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignSelf: "center"
  },
  rowBetweenCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center"
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  rowEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  rowStart: {
    flexDirection: "row",
    alignItems: "center"
  },
  rowCenterWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexWrap: "wrap"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  }
};

export default SharedStyles;
