import { useState } from "react";
import { Box, Flex, Grid, GridItem, Image, HStack, Link, Text } from "@chakra-ui/react";
import FileSidebar from "../file-sidebar/FileSidebar";
import MarkdownViewer from "../markdown-viewer/MarkdownViewer";
import TocSidebar from "../toc-sidebar/TocSidebar";

export interface TocItem { 
  id: string; 
  text: string 
}

function Layout(){
  const [toc, setToc] = useState<TocItem[]>([]);
  console.log(toc)

  return (
    <Box>
      {/* Header */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="1rem"
        bg="orange.100"
        color="black"
      >
        {/* Logo */}
        <Flex align="center">
          <Image
            src="/sample-logo.svg"
            alt="Logo"
            boxSize="40px"
          />
          <Text fontSize="xl" fontWeight="bold" marginLeft="4">
            Salsa Blog
          </Text>
        </Flex>

        {/* Links */}
        <HStack spacing="24px">
          <Link href="/docs/Overview" _hover={{ textDecoration: "underline" }}>
            Home
          </Link>
          <Link href="/app" _hover={{ textDecoration: "underline" }}>
            Salsa App
          </Link>
        </HStack>
      </Flex>
       {/* Main content */}
      <Grid templateColumns="250px 1fr 300px" height="100vh">
      {/* Left Sidebar - File List */}
      <GridItem
        display="flex"
        flexDirection="column"
        height="100vh"
        bg="orange.50"
        borderRight="1px solid"
        borderColor="orange.200"
      >
        <Box
          position="sticky"
          top="0"
          maxHeight="100vh"
          overflowY="auto"
          width="100%"
          paddingTop={10}
          paddingRight={0}
        >
          <FileSidebar />
        </Box>
      </GridItem>

      {/* Main Content - Markdown Viewer */}
      <GridItem
        display="flex"
        flexDirection="column"
        height="100vh"
        overflowY="auto"
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow="md"
      >
        <MarkdownViewer setToc={setToc} />
      </GridItem>

      {/* Right Sidebar - TOC */}
      <GridItem
        display="flex"
        flexDirection="column"
        height="100vh"
        bg="orange.50"
        borderLeft="1px solid"
        borderColor="orange.200"
      >
        <Box
          position="sticky"
          top="0"
          maxHeight="100vh"
          overflowY="auto"
          width="100%"
          paddingTop={10}
          p={4}
        >
          <TocSidebar toc={toc} />
        </Box>
      </GridItem>
    </Grid>
    </Box>
  );
};

export default Layout;
