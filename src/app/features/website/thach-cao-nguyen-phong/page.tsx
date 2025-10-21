// app/thi-cong-thach-cao/page.tsx
'use client';

import { Carousel } from '@mantine/carousel';
import { Container, Title, Text, Button, Box, Overlay, Table, Timeline, SimpleGrid, Paper, ThemeIcon, rem, ActionIcon } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { IconPhone } from '@tabler/icons-react';

import classes from './services.module.css';

// Import tất cả dữ liệu
import {carouselImages, pricingData, processSteps, benefits, otherServices, contact } from './data';


// Component Card thông tin (tái sử dụng)
function InfoCard({ item }: { item: { icon: any; title: string; description: string } }) {
    const Icon = item.icon;
    return (
        <Paper withBorder radius="md" p="lg">
            <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ deg: 0, from: 'red', to: 'orange' }}>
                <Icon style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
            </ThemeIcon>
            <Text fz="lg" fw={500} mt="md">{item.title}</Text>
            <Text fz="sm" c="dimmed" mt="sm">{item.description}</Text>
        </Paper>
    );
}

export default function ThachCaoServicePage() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const pricingRows = pricingData.rows.map((row) => (
    <Table.Tr key={row[0]}>
      <Table.Td>{row[0]}</Table.Td>
      <Table.Td>{row[1]}</Table.Td>
      <Table.Td>{row[2]}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Box className={classes.carouselWrapper}>
        <Carousel
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          withIndicators
          className={classes.carousel} // Class này chỉ định chiều cao 100%
        >
          {carouselImages.map((image) => (
            <Carousel.Slide key={image.src}>
              <Box style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '800px' }} />
            </Carousel.Slide>
          ))}
        </Carousel>

        <Overlay className={classes.carouselOverlay} />
        
        <Container className={classes.carouselContent} size="lg">
            <Title className={classes.heroTitle}>
                Thi Công <Text component="span" className={classes.heroHighlight} inherit>Trần & Vách Thạch Cao</Text> Trọn Gói
            </Title>
            <Button
                component="a"
                href={`tel:${contact.phone}`}
                className={classes.heroButton}
                leftSection={<IconPhone size={24} />}
            >
                {contact.heroButton}
            </Button>
        </Container>
      </Box>

      <Container size="lg">
        {/* --- Pricing Section --- */}
        <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>{pricingData.title}</Title>
            <Text c="dimmed" ta="center" maw={700} mx="auto" mb="xl">{pricingData.description}</Text>
            <Table withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        {pricingData.headers.map(header => <Table.Th key={header}>{header}</Table.Th>)}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {pricingRows}
                    <Table.Tr className={classes.tableCtaRow}>
                        <Table.Td colSpan={3} align="center">{pricingData.cta} <Text component="a" href={`tel:${contact.phone}`} fw={700} c="red">{contact.phoneDisplay}</Text></Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </section>

        {/* --- Process Section --- */}
        <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>{processSteps.title}</Title>
            <Timeline active={5} bulletSize={24} lineWidth={2} color="red">
                {processSteps.steps.map((step, index) => (
                    <Timeline.Item key={index} bullet={<step.icon size={14} />} title={<Text className={classes.timelineItemTitle}>{step.title}</Text>}>
                        <Text c="dimmed" size="sm">{step.description}</Text>
                    </Timeline.Item>
                ))}
            </Timeline>
        </section>

        {/* --- Benefits Section --- */}
        <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>{benefits.title}</Title>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
                {benefits.items.map(item => <InfoCard key={item.title} item={item} />)}
            </SimpleGrid>
        </section>

        {/* --- Other Services Section --- */}
        <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>{otherServices.title}</Title>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
                {otherServices.items.map(item => <InfoCard key={item.title} item={item} />)}
            </SimpleGrid>
        </section>
      </Container>
      {/* Nút gọi điện nổi (chỉ hiển thị trên mobile) */}
      <ActionIcon component="a" href={`tel:${contact.phone}`} className={classes.floatingCallButton}>
        <IconPhone style={{ width: '60%', height: '60%' }} stroke={1.5} />
      </ActionIcon>
    </>
  );
}