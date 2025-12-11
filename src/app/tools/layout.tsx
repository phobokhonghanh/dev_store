import { NavLinkBar } from "@/components/layout/nav_link/NavLinkBar";
import { Container, Grid, GridCol } from "@mantine/core";
import { toolsRoutes } from "@/components/layout/data/tools"; // Import data tools

export default function ToolsLayout({ children }: { children: React.ReactNode }) {    
  return (
    <Container my="md">
      <Grid gutter="md">
        <GridCol span={{ base: 12, md: 3 }}>
          <NavLinkBar data={toolsRoutes} />
        </GridCol>
        
        <GridCol span={{ base: 12, md: 9 }}>
          {children}
        </GridCol>
      </Grid>
    </Container>

  );
}
