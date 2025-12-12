import { NavLinkBar } from "@/components/layout/nav_link/NavLinkBar";
import { Container, Grid, GridCol } from "@mantine/core";
import { getBlogRoutes } from "@/components/layout/data/blogs";

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
    const blogRoutes = getBlogRoutes();

    return (
        // Sử dụng Container bình thường, KHÔNG giới hạn height, KHÔNG hidden overflow
        <Container size="xl" my="md">
            <Grid gutter="xl">

                {/* Cột trái: NavLinkBar */}
                <GridCol span={{ base: 12, md: 3 }}>
                    {/* NavLinkBar đã có:
                        - position: sticky (để bám lại khi browser cuộn)
                        - ScrollArea max-height (để cuộn riêng nếu menu dài)
                    */}
                    <NavLinkBar data={blogRoutes} />
                </GridCol>

                {/* Cột phải: Nội dung chính */}
                <GridCol span={{ base: 12, md: 9 }} style={{ minHeight: '80vh' }}>
                    {/* Nội dung render tự nhiên, browser sẽ tự xuất hiện thanh cuộn khi nội dung dài */}
                    {children}
                </GridCol>
            </Grid>
        </Container>
    );
}