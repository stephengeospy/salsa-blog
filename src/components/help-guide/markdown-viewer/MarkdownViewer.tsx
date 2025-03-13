import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Box, Divider, Heading, Link, Spinner, Text } from "@chakra-ui/react";
import { TocItem } from "../layout/Layout";

interface MarkdownViewerProps {
  setToc: (toc: TocItem[]) => void;
}

function formatSlug(heading: string){
  return heading.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
}

function MarkdownViewer({
  setToc,
}: MarkdownViewerProps){
  const { "*": docPath } = useParams();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        if (docPath) {
          setLoading(true);
          const url = `https://raw.githubusercontent.com/stephengeospy/salsa-documentation/develop/${docPath}.md`;
          const response = await fetch(url);
          if (!response.ok) {
            setNotFound(true);
            setLoading(false);
            return;
          }
          const text = await response.text();
          setContent(text);
          setLoading(false);

          // Extract headings for TOC
          const headings = extractHeadings(text);
          setToc(headings);
        }
      } catch(error){
        console.error("Error fetching markdown:", error);
        setNotFound(true);
        setLoading(false);
      }
    };
    fetchMarkdown();
  }, [docPath]);

  if (notFound) {
    return (
      <Box textAlign="center" p={10}>
        <Heading>404</Heading>
        <Text>Document not found</Text>
      </Box>
    );
  }

  const extractHeadings = (text: string): TocItem[] => {
    const headingLines = text.split("\n").filter((line) => line.startsWith("#"));
    return headingLines.map((line) => {
      const level = line.split(" ")[0].length;
      const text = line.replace(/#/g, "").trim();
      const id = formatSlug(text);
      return { id, text, level };
    });
  };
  

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : (
          <Box p={4}>
            <ReactMarkdown
              children={content || ""}
              rehypePlugins={[rehypeSlug]}
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <Heading as="h1" size="2xl" mb={4} id={formatSlug(String(children))}>
                    {children}
                  </Heading>
                ),
                h2: ({ children }) => (
                  <>
                  <Box padding="5">
                      <Divider />
                  </Box>
                  
                  <Heading as="h2" size="xl" mb={4} id={formatSlug(String(children))}>
                    {children}
                  </Heading>
                  </>
                ),
                h3: ({ children }) => (
                  <Heading as="h3" size="lg" mb={3} id={formatSlug(String(children))}>
                    {children}
                  </Heading>
                ),
                h4: ({ children }) => (
                  <Heading as="h4" size="md" mb={3} id={formatSlug(String(children))}>
                    {children}
                  </Heading>
                ),
                h5: ({ children }) => (
                  <Heading as="h5" size="sm" mb={2} id={formatSlug(String(children))}>
                    {children}
                  </Heading>
                ),
                h6: ({ children }) => (
                  <Heading as="h6" size="xs" mb={2} id={formatSlug(String(children))}>
                    {children}
                  </Heading>
                ),
                p: ({ children }) => <Text mb={4} size="sm">{children}</Text>,
                li: ({ children }) => <Text as="li" mb={2}>{children}</Text>,
                a: ({ href, children }) => (
                  <Link 
                    href={href} 
                    color="orange.500" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{textDecoration: "underline", cursor: "pointer"}}
                    _hover={{
                      opacity: 0.8
                    }}>
                    {children}
                  </Link>
                ),
                img: ({ src, alt }) => (
                  <Box textAlign="center">
                    <img src={src} alt={alt} style={{ width: "100%", maxWidth: "768px" }} />
                  </Box>
                ),
                table: ({ children }) => (
                  <Box
                    as="table"
                    width="100%"
                    border="1px solid #ddd"
                    borderRadius="8px"
                    mb={4}
                    boxShadow="sm"
                  >
                    {children}
                  </Box>
                ),
                th: ({ children }) => (
                  <Box
                    as="th"
                    bg="orange.100"
                    padding={2}
                    textAlign="left"
                    fontWeight="bold"
                    borderBottom="1px solid #ddd"
                  >
                    {children}
                  </Box>
                ),
                td: ({ children }) => (
                  <Box
                    as="td"
                    padding={2}
                    borderBottom="1px solid #ddd"
                    _hover={{
                      bgColor: "orange.50",
                    }}
                  >
                    {children}
                  </Box>
                ),
              }}
            />
          </Box>
      )}
    </Box>
  );
};

export default MarkdownViewer;
