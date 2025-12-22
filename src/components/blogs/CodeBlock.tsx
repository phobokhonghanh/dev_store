"use client";

import { ActionIcon, Box, CopyButton, Tooltip, rem } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ComponentPropsWithoutRef } from "react";

// Định nghĩa kiểu props kế thừa từ thẻ code chuẩn
interface CodeBlockProps extends ComponentPropsWithoutRef<"code"> {
  node?: unknown;
  inline?: boolean;
}

export function CodeBlock({
  className,
  children,
  node,
  inline,
  ...props
}: CodeBlockProps) {
  // FIX: Sử dụng void node để đánh dấu biến này đã được dùng, tránh lỗi unused-vars
  // Chúng ta cần destructure 'node' ra để không truyền nó vào SyntaxHighlighter (gây lỗi DOM)
  void node;

  // react-markdown trả về className dạng "language-js"
  // Ta cần tách lấy phần "js"
  const match = /language-(\w+)/.exec(className || "");

  // Nếu không có ngôn ngữ cụ thể hoặc là inline code (không có xuống dòng), trả về thẻ code thường
  const isInline = inline || (!String(children).includes("\n") && !match);

  if (isInline) {
    return (
      <code
        {...props}
        className={className}
        style={{
          background: "var(--mantine-color-gray-1)",
          padding: "2px 4px",
          borderRadius: "4px",
          color: "#c0392b",
          fontSize: "0.9em",
        }}
      >
        {children}
      </code>
    );
  }

  return (
    <Box style={{ position: "relative", margin: "1rem 0" }}>
      {/* Nút Copy nằm đè lên góc phải */}
      <Box style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}>
        <CopyButton value={String(children).replace(/\n$/, "")} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="left"
            >
              <ActionIcon
                color={copied ? "teal" : "gray"}
                variant="subtle"
                onClick={copy}
              >
                {copied ? (
                  <IconCheck style={{ width: rem(16) }} />
                ) : (
                  <IconCopy style={{ width: rem(16) }} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Box>

      {/* Phần hiển thị Code với Syntax Highlight */}
      <SyntaxHighlighter
        {...props}
        style={atomDark}
        language={match ? match[1] : "text"}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: "8px",
          padding: "1.5rem 1rem", // Padding để tránh đè lên nút copy
          fontSize: "0.9rem",
          backgroundColor: "#1a1b1e", // Màu nền tối khớp với theme Mantine Dark
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </Box>
  );
}
