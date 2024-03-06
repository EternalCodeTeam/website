interface TabFileProps {
  withIcon?: React.ReactNode;
  title: string;
  isActive?: boolean;
}

export function TabFile({ withIcon, title, isActive }: Readonly<TabFileProps>) {
  return (
    <div
      className={`flex h-6 select-none flex-row ${
        isActive
          ? "bg-[#e6e7e8] pl-2 pr-4 dark:bg-[#1F2A37] dark:text-gray-400"
          : "bg-[#bfbfbf] pl-2 pr-4 dark:bg-[#374151] dark:text-gray-400"
      }`}
      style={{ width: "fit-content" }}
    >
      {withIcon}
      <span className="ml-1 mr-auto font-mono">{title}</span>
    </div>
  );
}
