import "./FileSidebar.css"

import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, List, ListItem, Link, Heading, useColorModeValue } from "@chakra-ui/react";


interface FileSidebarProps {
  files: string[];
}

function FileSidebar({ files }: FileSidebarProps){
  const { docName } = useParams<{ docName: string }>();
  const activeColor = useColorModeValue("orange.600", "orange.300"); // Active file color
  const hoverBg = useColorModeValue("orange.100", "orange.700"); // Hover background

  return (
    <Box
      as="nav"
      bg="orange.50"
      p={5}
    >
      <List spacing={3}>
        {files.map((file) => (
          <ListItem key={file.replace(".md", "")}>
            <Link
              as={RouterLink}
              to={`/docs/${file.replace(".md", "")}`}
              fontSize="md"
              p={2}
              display="block"
              textAlign="left"
              borderBottomWidth="2px"
              borderBottomColor={docName === file.replace(".md", "") ? activeColor : "transparent"}
              _hover={{ bg: hoverBg, color: "orange.900" }}
            >
              {file.replace(".md", "").charAt(0).toUpperCase() + file.replace(".md", "").slice(1).replace(/-/g, " ")}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FileSidebar;
