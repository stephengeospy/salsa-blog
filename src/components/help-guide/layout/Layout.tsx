import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
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
          console.log('data', data)
          const markdownFiles = data.filter((file: any) => file.name.endsWith(".md")).map((file: any) => file.name);
          setFiles(markdownFiles);
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      };
  
      fetchFiles();
    }, []);

return (    <Flex>
    <FileSidebar files={files} />
    <Box flex="1">
    <MarkdownViewer setToc={setToc} />
    </Box>
    <TocSidebar toc={toc}/>
  </Flex>)
}

export default Layout;