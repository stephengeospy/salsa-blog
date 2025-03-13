import { Box, List, ListItem, Text, Link, useColorModeValue } from "@chakra-ui/react";
import { TocItem } from "../layout/Layout";

interface TocSidebarProps {
  toc: TocItem[];
}

function TocSidebar({ toc }: TocSidebarProps){
  const focusBg = useColorModeValue("orange.100", "orange.700");
  
  return (
    <Box paddingRight={4}>
      <Text fontWeight="bold" mb={2}>
        On this page
      </Text>
      <List spacing={2}>
        {toc.map((item) => (
          <ListItem
            key={item.id}
          >
            <Link
              href={`#${item.id}`}
              fontSize="md"
              p={2}
              display="block"
              textAlign="left"
              _hover={{ bg: focusBg, color: "orange.900" }}
            >
              {item.text}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TocSidebar;
