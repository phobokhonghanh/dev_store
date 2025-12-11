import { NavLinkBar } from "@/components/layout/nav_link/NavLinkBar";
import { Container, Grid, GridCol } from "@mantine/core";
import { getBlogRoutes } from "@/components/layout/data/blogs"; // Import data blogs

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
    const blogRoutes = getBlogRoutes();
    return (
        <Container my="md">
            <Grid gutter="md">
                <GridCol span={{ base: 12, md: 3 }}>
                    <NavLinkBar data={blogRoutes} />
                </GridCol>

                <GridCol span={{ base: 12, md: 9 }}>
                    {children}
                </GridCol>  
            </Grid>
        </Container>
    );
}