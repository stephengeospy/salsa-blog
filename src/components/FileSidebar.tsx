// components/FileSidebar.tsx
import { Box, List, ListItem, Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface FileSidebarProps {
  folder: string;
  files: string[];
}

const FileSidebar = ({ folder, files }: FileSidebarProps) => {
  return (
    <Box as="aside" width="200px" p="4" bg="gray.50">
      <List>
        {files.map((file) => (
          <ListItem key={file}>
            <NextLink href={`/docs/${folder}/${file}`} passHref>
              <Link>{file.replace(".md", "")}</Link>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FileSidebar;
