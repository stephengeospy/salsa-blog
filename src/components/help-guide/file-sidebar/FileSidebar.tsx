import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { 
  Box, 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel, 
  AccordionIcon, 
  Link,
  List, 
  ListItem,
  useColorModeValue } from "@chakra-ui/react";


// Function to fetch the GitHub repository tree
const fetchRepoTree = async (owner: string, repo: string) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/develop?recursive=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.tree;
};

function FileSidebar(){
  const { docName } = useParams<{ docName: string }>();
  const [fileTree, setFileTree] = useState<any[]>([]);
  const activeColor = useColorModeValue("orange.600", "orange.300");
  const focusBg = useColorModeValue("orange.100", "orange.700");

  useEffect(() => {
    const fetchFiles = async () => {
      const tree = await fetchRepoTree("stephengeospy", "salsa-documentation");
      const sortedTree = tree.filter((item: any) => item.type === "blob" || item.type === "tree");
      setFileTree(sortedTree);
    };
    fetchFiles();
  }, []);

  const renderTree = (tree: any[], folderPath = "") => {
    const folders = tree.filter((item) => item.type === "tree" && item.path.startsWith(folderPath));
    let files = tree.filter((item) => item.type === "blob" && item.path.startsWith(folderPath));
    if(folderPath === "" && files.length){
      files = files?.filter((file) => !file.path.includes('/'))
    }

    return (
      <Accordion allowMultiple>
        {folders.map((folder) => {
          const folderFullPath = folder.path;
          return (
            <AccordionItem key={folderFullPath}>
              <AccordionButton
                _hover={{ opacity: "70%"}}
                _focus={{ bg: focusBg, color: "orange.900" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  {folderFullPath.replace(folderPath, "")}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {renderTree(tree, `${folderFullPath}/`)}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
        <List spacing={2}>
          {files.map((file) => {
            const currentFileName = file.path.replace(".md", "")
            const displayFileName = currentFileName.split('/').pop();

            return (
            <ListItem
              key={file.path}
            >
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
                {displayFileName.charAt(0).toUpperCase() + displayFileName.slice(1).replace(/-/g, " ")}
              </Link>

            </ListItem>
          )})}
        </List>
      </Accordion>
    );
  };

  return (
    <Box paddingLeft={4}>
      {renderTree(fileTree)}
    </Box>
  );
};

export default FileSidebar;

