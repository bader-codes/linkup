type PostTimestampProps = {
  createdAt: string;
};

export default function PostTimestamp({ createdAt }: PostTimestampProps) {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000,
  );

  const SECOND = 1;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  // Seconds
  if (diffInSeconds < MINUTE) {
    return (
      <span>{diffInSeconds === 0 ? "now" : `${diffInSeconds} sec ago`}</span>
    );
  }

  // Minutes
  if (diffInSeconds < HOUR) {
    const minutes = Math.floor(diffInSeconds / MINUTE);

    return <span>{minutes} min</span>;
  }

  // Check if the date is today
  const isToday =
    createdDate.getFullYear() === now.getFullYear() &&
    createdDate.getMonth() === now.getMonth() &&
    createdDate.getDate() === now.getDate();

  if (isToday) {
    return (
      <span>
        today at{" "}
        {createdDate.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
      </span>
    );
  }

  // Check if the date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    createdDate.getFullYear() === yesterday.getFullYear() &&
    createdDate.getMonth() === yesterday.getMonth() &&
    createdDate.getDate() === yesterday.getDate();

  if (isYesterday) {
    return (
      <span>
        yesterday at{" "}
        {createdDate.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
      </span>
    );
  }

  // Days
  if (diffInSeconds < DAY * 30) {
    const days = Math.floor(diffInSeconds / DAY);

    return <span>{days} days ago</span>;
  }

  // Months
  const months =
    (now.getFullYear() - createdDate.getFullYear()) * 12 +
    (now.getMonth() - createdDate.getMonth());

  if (months < 12) {
    return (
      <span>
        {months} month{months !== 1 ? "s" : ""}
      </span>
    );
  }

  // Years
  const years = Math.floor(months / 12);

  return (
    <span>
      {years} year{years !== 1 ? "s" : ""}
    </span>
  );
}
