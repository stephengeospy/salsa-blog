import { useEffect, useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import FileSidebar from "../file-sidebar/FileSidebar";
import MarkdownViewer from "../markdown-viewer/MarkdownViewer";
import TocSidebar from "../toc-sidebar/TocSidebar";
import './Layout.css'


interface TocItem {
    heading: string;
    slug: string;
  }
  
  function Layout(){
    const [toc, setToc] = useState<TocItem[]>([]);
    const [files, setFiles] = useState<string[]>([]);
  
    useEffect(() => {
      // Fetch the list of files from the GitHub repository
      const fetchFiles = async () => {
        const url = "https://api.github.com/repos/stephengeospy/salsa-documentation/contents?ref=develop";
        try {
          const response = await fetch(url);
          const data = await response.json();
          const markdownFiles = data.filter((file: any) => file.name.endsWith(".md")).map((file: any) => file.name);
          setFiles(markdownFiles);
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      };
  
      fetchFiles();
    }, []);

return (
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
          p={2}
          paddingRight={0}
        >
          <FileSidebar files={files} />
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
          p={4}
        >
          <TocSidebar toc={toc} />
        </Box>
      </GridItem>
    </Grid>
  );}

export default Layout;