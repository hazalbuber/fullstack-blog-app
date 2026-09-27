import { useMemo } from "react";
import { Button, Menu, Portal } from "@chakra-ui/react";
import styles from "./ChartButton.module.css";

const months = [
  { label: "January", num: "01" },
  { label: "February", num: "02" },
  { label: "March", num: "03" },
  { label: "April", num: "04" },
  { label: "May", num: "05" },
  { label: "June", num: "06" },
  { label: "July", num: "07" },
  { label: "August", num: "08" },
  { label: "September", num: "09" },
  { label: "October", num: "10" },
  { label: "November", num: "11" },
  { label: "December", num: "12" },
];

interface ChartButtonProps {
  value: string;
  onChange: (month: string) => void;
}

const ChartButton = ({ value, onChange }: ChartButtonProps) => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const selectedLabel = useMemo(() => {
    const mm = value.split("-")[1];
    return months.find((m) => m.num === mm)?.label ?? value;
  }, [value]);

  return (
    <div className={styles.frame47}>
      <h1 className={styles.header}> Lorem ipsum </h1>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="outline" size="sm" className={styles.button}>
            {selectedLabel}
            <svg
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.50423 0.420929L3.99998 2.92518L1.49573 0.420929L0.670898 1.24576L3.99998 4.57485L7.32907 1.24576L6.50423 0.420929Z"
                fill="#1B1B60"
              />
            </svg>
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {months.map((m) => (
                <Menu.Item
                  key={m.label}
                  value={m.num}
                  onClick={() => onChange(`${currentYear}-${m.num}`)}
                >
                  {m.label}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </div>
  );
};

export default ChartButton;
