// components/TOCSidebar.tsx
import { Box, List, ListItem, Link } from "@chakra-ui/react";
import { Heading } from "react-markdown/lib/ast-to-react";

interface TOCSidebarProps {
  headings: Heading[];
}

const TOCSidebar = ({ headings }: TOCSidebarProps) => {
  return (
    <Box as="aside" width="200px" p="4" bg="gray.50">
      <List>
        {headings.map((heading) => (
          <ListItem key={heading.id}>
            <Link href={`#${heading.id}`}>{heading.value}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TOCSidebar;
