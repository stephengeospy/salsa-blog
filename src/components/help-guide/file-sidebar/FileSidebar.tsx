import "./FileSidebar.css"

import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, List, ListItem, Link, useColorModeValue } from "@chakra-ui/react";


interface FileSidebarProps {
  files: string[];
}

function FileSidebar({ files }: FileSidebarProps){
  const { docName } = useParams<{ docName: string }>();
  const activeColor = useColorModeValue("orange.600", "orange.300");
  const focusBg = useColorModeValue("orange.100", "orange.700");

  return (
    <Box
      as="nav"
      bg="orange.50"
      p={5}
      paddingRight={0}
    >
      <List spacing={3}>
        {files.map((file) => {
          const currentFileName = file.replace(".md", "")
          return (<ListItem key={currentFileName}>
            <Link
              as={RouterLink}
              to={`/docs/${currentFileName}`}
              fontSize="md"
              p={2}
              display="block"
              textAlign="left"
              borderLeftWidth="2px"
              borderLeftColor={docName === currentFileName ? activeColor : "transparent"}
              _hover={{ opacity: "70%"}}
              _focus={{ bg: focusBg, color: "orange.900" }}
            >
              {currentFileName.charAt(0).toUpperCase() + currentFileName.slice(1).replace(/-/g, " ")}
            </Link>
          </ListItem>)
        })}
      </List>
    </Box>
  );
};

export default FileSidebar;
