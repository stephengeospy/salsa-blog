// pages/docs/[folderName]/[docPath]/index.tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useRouter } from 'next/router';
import Header from '../../../../components/Header';
import FileSidebar from '../../../../components/FileSidebar';
import MarkdownViewer from '../../../../components/MarkdownViewer';
import TOCSidebar from '../../../../components/TOCSidebar';
import { Box, Flex } from "@chakra-ui/react";

interface DocPageProps {
  content: string;
  headings: { id: string; value: string }[];
  folders: string[];
  files: string[];
}

const DocPage = ({ content, headings, folders, files }: DocPageProps) => {
  const router = useRouter();
  const { folderName } = router.query;

  return (
    <Flex>
      <Header folders={folders} />
      <FileSidebar folder={folderName as string} files={files} />
      <MarkdownViewer content={content} />
      <TOCSidebar headings={headings} />
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { folderName, docPath } = params as { folderName: string; docPath: string };

  const filePath = path.join(process.cwd(), 'public', 'docs', folderName, `${docPath}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContent);

  // Extract headings for TOC
  const headings = content
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((heading) => {
      const id = heading.replace(/\s+/g, '-').toLowerCase();
      const value = heading.replace('#', '').trim();
      return { id, value };
    });

  // Get list of folders and files in 'public/docs'
  const folders = fs.readdirSync(path.join(process.cwd(), 'public', 'docs'));
  const files = fs.readdirSync(path.join(process.cwd(), 'public', 'docs', folderName));

  return {
    props: {
      content,
      headings,
      folders,
      files,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docsPath = path.join(process.cwd(), 'public', 'docs');
  const folders = fs.readdirSync(docsPath);
  const paths: { params: { folderName: string; docPath: string } }[] = [];

  folders.forEach((folder) => {
    const files = fs.readdirSync(path.join(docsPath, folder));
    files.forEach((file) => {
      paths.push({
        params: {
          folderName: folder,
          docPath: file.replace('.md', ''),
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export default DocPage;
