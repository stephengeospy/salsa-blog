import "./FileSidebar.css"

import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, List, ListItem, Link, Heading, useColorModeValue } from "@chakra-ui/react";


interface FileSidebarProps {
  files: string[];
}

// function FileSidebar({ files }: FileSidebarProps){
//   return (
//     <Box as="nav" width="250px" p={5} borderRight="1px solid #e2e8f0">
//       <Heading size="md" mb={4}>
//         Documentation
//       </Heading>
//       <List spacing={3}>
//         {files.map((file) => {
//           const filename = file.replace(".md", "")
//           return (
//           <ListItem key={filename}>
//             <Link as={RouterLink} to={`/docs/${filename}`}>
//               {filename}
//             </Link>
//           </ListItem>
//         )
//     })
//   }
//       </List>
//     </Box>
//   );
// };

function FileSidebar({ files }: FileSidebarProps){
  const { docName } = useParams<{ docName: string }>();
  const activeColor = useColorModeValue("orange.600", "orange.300"); // Active file color
  const hoverBg = useColorModeValue("orange.100", "orange.700"); // Hover background

  return (
    <Box
      as="nav"
      width="250px"
      bg="orange.50" // Sidebar background color
      height="100vh"
      p={4}
      borderRight="1px solid"
      borderColor="orange.200"
    >
      <List spacing={3}>
        {files.map((file) => (
          <ListItem key={file.replace(".md", "")}>
            <Link
              as={RouterLink}
              to={`/docs/${file.replace(".md", "")}`}
              fontSize="md"
              p={2}
              borderRadius="md"
              display="block"
              textAlign="left"
              bg={docName === file ? activeColor : "transparent"} // Highlight active file
              color={docName === file ? "white" : "black"}
              _hover={{ bg: hoverBg, color: "orange.900" }} // Hover styles
              _focus={{ boxShadow: "outline" }} // Focus ring for accessibility
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
