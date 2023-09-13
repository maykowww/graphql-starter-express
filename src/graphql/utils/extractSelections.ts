import { GraphQLResolveInfo } from "graphql";

const getSelections = (info: GraphQLResolveInfo) => {
  return info.fieldNodes[0].selectionSet?.selections || null;
};

export const extractSelection = (info: GraphQLResolveInfo) => {
  const selections = getSelections(info);
  if (!selections) return [];

  return selections.reduce<string[]>((intialValue, selection) => {
    if (selection.kind === "Field") {
      return [...intialValue, selection.name.value];
    }

    return intialValue;
  }, []);
};
