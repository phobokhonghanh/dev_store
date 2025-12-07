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
        <Title order={2} c="green">Countdown Timer</Title>
        <Text c="dimmed" mt={4}>
          Set any duration and count down in real time.
        </Text>
      </Box>
      <Card shadow="sm" radius="md" p="lg" withBorder mb="md">
        <Group grow align="flex-end" gap="md" mb="md">
          <NumberInput
            label="Days"
            value={target.days}
            onChange={(v) => setTarget({ ...target, days: Number(v) || 0 })}
            className={classes.inputClean}
          />
          <NumberInput
            label="Hours"
            value={target.hours}
            onChange={(v) => setTarget({ ...target, hours: Number(v) || 0 })}
            className={classes.inputClean}
            max={23}
          />
          <NumberInput
            label="Minutes"
            value={target.minutes}
            onChange={(v) => setTarget({ ...target, minutes: Number(v) || 0 })}
            className={classes.inputClean}
            max={59}
          />
          <NumberInput
            label="Seconds"
            value={target.seconds}
            onChange={(v) => setTarget({ ...target, seconds: Number(v) || 0 })}
            className={classes.inputClean}
            max={59}
          />
        </Group>
      </Card>

      <Card
        shadow="sm"
        radius="md"
        p="lg"
        withBorder
        id="timer-root"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Fullscreen targetId="timer-root" />
        <Box mt="md">
          <Timer time={timeObj} />
        </Box>

        <Group mt="lg" justify="center">
          {!running && timeLeft === 0 && (
            <>
            <Button
              variant="outline"
              color="green"
              onClick={start}
              leftSection={<IconPlayerPlay size={18} />}
            >
              Start
            </Button>

            <Button
              variant="outline"
              color="gray"
              onClick={clear}
              leftSection={<IconX size={18} />}
            >
              Clear
            </Button>
            </>
          )}

          {!running && timeLeft > 0 && (
            <>
              <Button
                variant="outline"
                color="green"
                onClick={start}
                leftSection={<IconPlayerPlay size={18} />}
              >
                Continue
              </Button>
              <Button
                variant="outline"
                color="gray"
                onClick={reset}
                leftSection={<IconRotate size={18} />}
              >
                Reset
              </Button>
            </>
          )}

          {running && (
            <>
              <Button
                variant="outline"
                color="red"
                onClick={pause}
                leftSection={<IconPlayerPause size={18} />}
              >
                Pause
              </Button>
              <Button
                variant="outline"
                color="gray"
                onClick={reset}
                leftSection={<IconRotate size={18} />}
              >
                Reset
              </Button>
            </>
          )}
        </Group>

        <Text size="sm" c="dimmed" ta="center" mt="md">
          Shortcuts: <b>Space</b> (Start/Pause), <b>R</b> (Reset)
        </Text>
      </Card>
    </Box>
  );
}
