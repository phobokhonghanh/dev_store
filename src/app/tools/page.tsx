'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  LoadingOverlay,
  Text,
  Group,
  Button,
  NumberInput,
  Card,
  Title,
  Center,
} from '@mantine/core';

import {
  IconPlayerPlay,
  IconPlayerPause,
  IconRotate,
  IconX,
} from '@tabler/icons-react';

import classes from './tools-countdown.module.css';
import Timer, { TimeData } from '@/components/tools/time/Timer';
import Fullscreen from '@/components/common/FullscreenWrapper';
import { AutoBreadcrumbs } from '@/components/layout/breadcrumb/AutoBreadcrumbs';

export default function ToolsPage() {
  const [isLoading] = useState(false);

  const [target, setTarget] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const calcSeconds = () =>
    target.days * 86400 +
    target.hours * 3600 +
    target.minutes * 60 +
    target.seconds;

  const start = () => {
    const sec = calcSeconds();
    if (sec <= 0) return;

    if (timeLeft > 0) {
      setRunning(true);
      return;
    }

    setTimeLeft(sec);
    setRunning(true);
  };

  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setTimeLeft(0);
  };

  const clear = () => {
    setTarget({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    setRunning(false);
    setTimeLeft(0);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        running ? pause() : start();
      }
      if (e.key.toLowerCase() === 'r') reset();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [running, timeLeft]);

  // Convert seconds → TimeData object
  const formatTime = (sec: number): TimeData => {
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    return {
      y: 0,
      mo: 0,
      d,
      h,
      m,
      s,
      ms: 0,
    };
  };

  // const timeObj = formatTime(timeLeft);
  const timeObj =
    !running && timeLeft === 0
      ? {
          y: 0,
          mo: 0,
          d: target.days,
          h: target.hours,
          m: target.minutes,
          s: target.seconds,
          ms: 0,
        }
      : formatTime(timeLeft);

  return (
    <Box p="md">
      <LoadingOverlay visible={isLoading} />
      <Box mb="sm">
        <AutoBreadcrumbs />
      </Box>
      <Box mb="md">
        <Title order={2} c="green">Home Tools</Title>
        <Text c="dimmed" mt={4}>
          Welcome to Home Tools in real time.
        </Text>
      </Box>      
    </Box>
  );
}
