import { formatDistanceToNow, isValid, parseISO } from "date-fns";

const formatDate = (createdAt: string) => {
  const parsedDate = parseISO(createdAt);
  if (!isValid(parsedDate)) {
    return createdAt;
  }
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

export default formatDate;
