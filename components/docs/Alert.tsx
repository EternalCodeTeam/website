import React from "react";

interface AlertProps {
  type: "info" | "warning" | "danger" | "tip";
  children: React.ReactNode;
}

const alertStyles = {
  info: "bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
  warning:
    "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200",
  danger: "bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-200",
  tip: "bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-200",
};

export const Alert: React.FC<AlertProps> = ({ type, children }) => {
  return (
    <div className={`my-4 rounded-lg p-4 ${alertStyles[type]}`}>{children}</div>
  );
};
