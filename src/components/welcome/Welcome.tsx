import { Title, Text, Container } from '@mantine/core';
import classes from './welcome.module.css';

export function Welcome() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Welcome to the{' '}
          <Text component="span" className={classes.highlight} inherit>
            Future
          </Text>
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
          </Text>
        </Container>
      </div>
    </Container>
  );
}