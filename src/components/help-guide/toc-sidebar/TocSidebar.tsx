import { Box, List, ListItem, Text, Link, useColorModeValue } from "@chakra-ui/react";
import { TocItem } from "../layout/Layout";

interface TocSidebarProps {
  toc: TocItem[];
}

function TocSidebar({ toc }: TocSidebarProps){
  const focusBg = useColorModeValue("orange.100", "orange.700");

  // Function to determine padding based on the heading level
  const getPadding = (level: number) => {
    switch (level) {
      case 1:
        return "0"; // no padding for h1
      case 2:
        return "4"; // padding for h2
      case 3:
        return "8"; // more padding for h3
      case 4:
        return "12"; // more padding for h4
      case 5:
        return "16"; // more padding for h5
      default:
        return "20"; // default padding for lower levels
    }
  };
  
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
              paddingLeft={`${getPadding(item.level)}px`}
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
