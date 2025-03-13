// components/MarkdownViewer.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Box, Heading, Spinner, Text, Divider } from "@chakra-ui/react";

interface TocItem {
  heading: string;
  slug: string;
}

interface MarkdownViewerProps {
  setToc: (toc: TocItem[]) => void;
}

function formatSlug(heading: string){
    return heading.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
}

function MarkdownViewer({ setToc }: MarkdownViewerProps) {
  const { docName } = useParams<{ docName: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      const url = `https://raw.githubusercontent.com/stephengeospy/salsa-documentation/refs/heads/develop/${docName}.md`;
      try {
        const response = await fetch(url);
        const text = await response.text();
        setContent(text);
        setLoading(false);

        // Extract headings for TOC
        const headings = extractHeadings(text);
        setToc(headings);
      } catch (error) {
        console.error("Error fetching markdown:", error);
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [docName]);

  const extractHeadings = (text: string): TocItem[] => {
    const headingLines = text.split("\n").filter((line) => line.startsWith("#"));
    return headingLines.map((line) => {
      const heading = line.replace(/#/g, "").trim();
      const slug = formatSlug(heading)
      return { heading, slug };
    });
  };

  return (
    <Box p={5}>
      {loading ? (
        <Spinner />
      ) : (
        <ReactMarkdown
        children={content || ""}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
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
          p: ({ children }) => <Text mb={4}>{children}</Text>,
          li: ({ children }) => <Text as="li" mb={2}>{children}</Text>
        }}
      />
      )}
    </Box>
  );
};

export default MarkdownViewer;
