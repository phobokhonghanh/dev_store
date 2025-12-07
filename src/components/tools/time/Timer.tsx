// "use client";

// import { Group, Text } from "@mantine/core";
// import TimeBlock from "./TimeBlock";

// export type TimeData = {
//   y: number;
//   mo: number;
//   d: number;
//   h: number;
//   m: number;
//   s: number;
//   ms: number;
// };

// export default function Timer({ time }: { time: TimeData }) {
//   const optionalParts = [
//     { label: "Years", value: time.y },
//     { label: "Months", value: time.mo },
//     { label: "Days", value: time.d },
//     { label: "Milliseconds", value: time.ms },
//   ].filter((p) => p.value > 0);

//   const fixedParts = [
//     { label: "Hours", value: time.h },
//     { label: "Minutes", value: time.m },
//     { label: "Seconds", value: time.s },
//   ];

//   const allParts = [...optionalParts, ...fixedParts];

//   return (
//     <Group justify="center" gap="lg" wrap="nowrap">
//       {allParts.map((p, index) => (
//         <Group key={p.label} align="center" gap={8} wrap="nowrap">
//           <TimeBlock
//             label={p.label}
//             value={String(p.value).padStart(2, "0")}
//           />

//           {index < allParts.length - 1 && (
//             <Text
//               fz="clamp(20px, 5vw, 48px)" // auto scale
//               fw={700}
//               style={{ marginTop: "-6px" }}
//             >
//               :
//             </Text>
//           )}
//         </Group>
//       ))}
//     </Group>
//   );
// }
"use client";

import { Group, Text, rem } from "@mantine/core";
import TimeBlock from "./TimeBlock";
import { useMemo } from "react";

export type TimeData = {
  y: number;
  mo: number;
  d: number;
  h: number;
  m: number;
  s: number;
  ms: number;
};

// Cấu hình thứ tự hiển thị và định dạng cho từng đơn vị
// Định nghĩa bên ngoài để tránh khởi tạo lại mỗi lần render
const TIME_CONFIG = [
  { key: "y", label: "Years", pad: 0, forceShow: false },
  { key: "mo", label: "Months", pad: 2, forceShow: false },
  { key: "d", label: "Days", pad: 2, forceShow: false },
  { key: "h", label: "Hours", pad: 2, forceShow: true },
  { key: "m", label: "Minutes", pad: 2, forceShow: true },
  { key: "s", label: "Seconds", pad: 2, forceShow: true },
  { key: "ms", label: "Milliseconds", pad: 3, separator: ".", forceShow: false }, // Dùng dấu chấm trước MS
] as const;

export default function Timer({ time }: { time: TimeData }) {
  // Tính toán các phần tử cần hiển thị dựa trên dữ liệu time hiện tại
  const visibleParts = useMemo(() => {
    return TIME_CONFIG.map((config) => {
      const value = time[config.key as keyof TimeData];
      return { ...config, value };
    }).filter((part) => part.forceShow || part.value > 0);
  }, [time]);

  return (
    // Sử dụng wrap="wrap" để tránh vỡ layout trên mobile khi chuỗi thời gian quá dài
    <Group justify="center" gap="lg" wrap="wrap">
      {visibleParts.map((part, index) => {
        const isLast = index === visibleParts.length - 1;
        // Kiểm tra phần tử tiếp theo để quyết định dấu ngăn cách (. hay :)
        const nextPart = !isLast ? visibleParts[index + 1] : null;
        const separator = nextPart?.key === "ms" ? "." : ":";

        return (
          <Group key={part.key} align="center" gap={rem(8)} wrap="nowrap">
            <TimeBlock
              label={part.label}
              // Format: Milliseconds -> 3 số, còn lại tùy config
              value={String(part.value).padStart(part.pad, "0")}
            />

            {!isLast && (
              <Text
                fz="clamp(20px, 5vw, 48px)"
                fw={700}
                // Điều chỉnh vị trí dấu ngăn cách cho thẳng hàng với số
                style={{ marginTop: rem(-6), lineHeight: 1 }}
                // Nếu là dấu chấm (trước MS), cho màu nhạt hơn chút để phân cấp
                c={separator === "." ? "dimmed" : undefined}
              >
                {separator}
              </Text>
            )}
          </Group>
        );
      })}
    </Group>
  );
}