'use client';

import { 
  Container, 
  Group, 
  ActionIcon, 
  Text, 
  Stack, 
  Title,
  TextInput,
  Button,
  SimpleGrid,
  Box,
  rem,
  Anchor
} from '@mantine/core';
import { footerLinks, socialLinks } from './data';
import classes from './footer.module.css';

export function Footer() {

  const groups = footerLinks.map((group) => {
    const links = group.links.map((link, index) => (
      <Anchor<'a'>
        key={index}
        className={classes.link}
        href={link.link}
        onClick={(event) => event.preventDefault()} // Replace with Next Link if needed
      >
        {link.label}
      </Anchor>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        <Stack gap="xs">
            {links}
        </Stack>
      </div>
    );
  });

  const social = socialLinks.map((socialItem, index) => (
      <ActionIcon key={index} size="lg" color="gray" variant="subtle" component="a" href={socialItem.link} target="_blank">
          <socialItem.icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ActionIcon>
  ));

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner} size="lg">
        <div className={classes.logoSection}>
           <Box style={{ fontWeight: 'bold', fontSize: '1.8rem' }}>LOGO</Box>
           <Text size="xs" c="dimmed" className={classes.description}>
                Xây dựng thương hiệu của bạn với một trang web hiện đại và đáng tin cậy.
           </Text>
           <div className={classes.newsletter}>
            <Text fw={500} mb="xs">Đăng ký nhận bản tin</Text>
            <Group>
                 <TextInput 
                    placeholder="Email của bạn"
                    style={{ flex: 1 }}
                />
                <Button>Đăng ký</Button>
            </Group>
           </div>
        </div>
        <div className={classes.linksSection}>
          <SimpleGrid cols={{ base: 2, sm: 3 }}>{groups}</SimpleGrid>
        </div>
      </Container>
      <Container className={classes.afterFooter} size="lg">
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} Your Brand Name. All rights reserved.
        </Text>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          {social}
        </Group>
      </Container>
    </footer>
  );
}