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
  Stack,
} from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconRotate } from '@tabler/icons-react';

export default function ToolsPage() {
  const [isLoading, setIsLoading] = useState(false);

  // --- countdown states ---
  const [target, setTarget] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);

  // --- handle countdown interval ---
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

  // --- convert structured time into seconds ---
  const calcSeconds = () => {
    const total =
      target.days * 86400 +
      target.hours * 3600 +
      target.minutes * 60 +
      target.seconds;

    return total;
  };

  const start = () => {
    const sec = calcSeconds();

    setRunning(true);

    if (timeLeft > 0) {
      return;
    }

    if (sec <= 0) return;

    setTimeLeft(sec);
    setRunning(true);
  };

  const pause = () => setRunning(false);

  const reset = () => {
    setRunning(false);
    setTimeLeft(0);
  };

  // --- convert seconds → d/h/m/s ---
  const formatTime = (sec: number) => {
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return { d, h, m, s };
  };

  const t = formatTime(timeLeft);

  return (
    <Box p="md">
      <LoadingOverlay visible={isLoading} />

      <Card shadow="md" radius="md" p="lg">
        <Text size="xl" fw={700} mb="md">
          Bộ đếm thời gian ngược
        </Text>

        {/* time inputs */}
        <Group grow>
          <NumberInput
            label="Ngày"
            value={target.days}
            onChange={(v) => setTarget({ ...target, days: Number(v) || 0 })}
            min={0}
          />
          <NumberInput
            label="Giờ"
            value={target.hours}
            onChange={(v) => setTarget({ ...target, hours: Number(v) || 0 })}
            min={0}
            max={23}
          />
          <NumberInput
            label="Phút"
            value={target.minutes}
            onChange={(v) => setTarget({ ...target, minutes: Number(v) || 0 })}
            min={0}
            max={59}
          />
          <NumberInput
            label="Giây"
            value={target.seconds}
            onChange={(v) => setTarget({ ...target, seconds: Number(v) || 0 })}
            min={0}
            max={59}
          />
        </Group>

        {/* selected time display */}
        <Box mt="md" ta="center">
          <Text size="2rem" fw={700}>
            {t.d}d : {t.h}h : {t.m}m : {t.s}s
          </Text>
        </Box>

        {/* buttons */}
        <Group mt="lg" justify="center">

        {/* Start */}
        {!running && timeLeft === 0 && (
          <Button
            variant="outline"
            color="green"
            onClick={start}
            leftSection={<IconPlayerPlay size={18} />}
          >
            Start
          </Button>
        )}

        {/* Continue + Reset */}
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

        {/* Pause + Reset */}
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

      </Card>
    </Box>
  );
}
