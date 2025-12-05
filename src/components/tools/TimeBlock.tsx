import { Box, Text, useMantineTheme, useMantineColorScheme } from "@mantine/core";
import type { ReactNode } from "react";

type TimeBlockProps = {
  label: string;
  value: ReactNode;
};

export default function TimeBlock({ label, value }: TimeBlockProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      style={{
        padding: "clamp(10px, 2vw, 20px)",
        minWidth: "clamp(60px, 12vw, 110px)",
        border: `1px solid ${colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.gray[7]
          }`,
        borderRadius: "16px",
        textAlign: "center",
      }}
    >
      <Text
        fz="clamp(24px, 6vw, 48px)" // auto-co theo viewport
        fw={700}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </Text>

      <Text
        fz="clamp(10px, 2.3vw, 16px)"
        c="gray.4"
      >
        {label}
      </Text>
    </Box>
  );
}
