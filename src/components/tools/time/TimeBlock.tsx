import { Box, Text, rem } from "@mantine/core";
import type { ReactNode } from "react";

type TimeBlockProps = {
  label: string;
  value: ReactNode;
};

export default function TimeBlock({ label, value }: TimeBlockProps) {
  
  return (
    <Box
      p="clamp(10px, 2vw, 20px)"
      miw="clamp(60px, 12vw, 110px)"
      ta="center"
      style={{
        border: `${rem(1)} solid light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-3))`,
        
        borderRadius: rem(16),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Text
        fz="clamp(24px, 6vw, 48px)"
        fw={700}
        lh={1}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </Text>

      <Text
        fz="clamp(10px, 2.3vw, 16px)"
        c="dimmed"
        mt={rem(4)}
        style={{ letterSpacing: '0.5px' }}
      >
        {label}
      </Text>
    </Box>
  );
}