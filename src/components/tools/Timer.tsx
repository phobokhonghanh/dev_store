"use client";

import { Group, Text } from "@mantine/core";
import TimeBlock from "./TimeBlock";

export type TimeData = {
  y: number;
  mo: number;
  d: number;
  h: number;
  m: number;
  s: number;
  ms: number;
};

export default function Timer({ time }: { time: TimeData }) {
  const optionalParts = [
    { label: "Years", value: time.y },
    { label: "Months", value: time.mo },
    { label: "Days", value: time.d },
    { label: "Milliseconds", value: time.ms },
  ].filter((p) => p.value > 0);

  const fixedParts = [
    { label: "Hours", value: time.h },
    { label: "Minutes", value: time.m },
    { label: "Seconds", value: time.s },
  ];

  const allParts = [...optionalParts, ...fixedParts];

  return (
    <Group justify="center" gap="lg" wrap="nowrap">
      {allParts.map((p, index) => (
        <Group key={p.label} align="center" gap={8} wrap="nowrap">
          <TimeBlock
            label={p.label}
            value={String(p.value).padStart(2, "0")}
          />

          {index < allParts.length - 1 && (
            <Text
              fz="clamp(20px, 5vw, 48px)" // auto scale
              fw={700}
              style={{ marginTop: "-6px" }}
            >
              :
            </Text>
          )}
        </Group>
      ))}
    </Group>
  );
}
