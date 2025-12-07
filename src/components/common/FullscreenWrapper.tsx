"use client";

import { useState, useRef, useEffect } from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconMaximize, IconMinimize } from "@tabler/icons-react";

export default function Fullscreen({ targetId }: { targetId: string }) {
  const [isFull, setIsFull] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 480;
  useEffect(() => {
    targetRef.current = document.getElementById(targetId);

    const onChange = () => {
      setIsFull(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [targetId]);

  const toggle = () => {
    if (!document.fullscreenElement) {
      targetRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: isMobile ? "5px" : "20px",
        right: isMobile ? "5px" : "20px",
        zIndex: 9999,
      }}
    >
      <Tooltip label={isFull ? "Exit Fullscreen" : "Fullscreen"} withArrow>
        <ActionIcon
          size={isMobile ? "md" : "xl"}
          radius="xl"
          variant="filled"
          color="gray"
          onClick={toggle}
        >
          {isFull ? <IconMinimize size={isMobile ? 10 : 20} /> : <IconMaximize size={isMobile ? 10 : 20} />}
        </ActionIcon>
      </Tooltip>
    </div>
  );
}
