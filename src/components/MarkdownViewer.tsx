// components/MarkdownViewer.tsx
import ReactMarkdown from "react-markdown";
import { Box } from "@chakra-ui/react";

const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <Box as="article" p="4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
};

export default MarkdownViewer;
