import './TocSidebar.css';
import { Box, Heading, List, ListItem, Link } from "@chakra-ui/react";

interface TocItem {
  heading: string;
  slug: string;
}

interface TocSidebarProps {
  toc: TocItem[];
}

function TocSidebar({ toc }: TocSidebarProps) {
  return (
    <Box as="nav" p={5}>
      <Heading size="md" mb={4}>
        On this page
      </Heading>
      <List spacing={3}>
        {toc.map((item) => (
          <ListItem key={item.slug}>
            <Link href={`#${item.slug}`}>{item.heading}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TocSidebar;
