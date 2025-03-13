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
    <Box as="nav" width="250px" p={5} borderLeft="1px solid #e2e8f0">
      <Heading size="md" mb={4}>
        Table of Contents
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
