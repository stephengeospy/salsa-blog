import { GetStaticProps, GetStaticPaths } from 'next';
import path from 'path';
import fs from 'fs';

interface Props {}

export default function FolderRedirectPage() {
  // This component will never be rendered because of the redirect in getStaticProps
  return null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docsPath = path.join(process.cwd(), 'public', 'docs');
  const folders = fs.readdirSync(docsPath);  // Get all folders in the 'public/docs' directory
  
  const paths = folders.map((folder) => ({
    params: {
      folderName: folder,
    },
  }));

  return {
    paths,
    fallback: false,  // This ensures 404 for non-existent folders
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { folderName } = context.params as { folderName: string };
  const folderPath = path.join(process.cwd(), 'public', 'docs', folderName);

  // Check if folder exists
  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    return {
      notFound: true,
    };
  }

  // Get list of files in the folder
  const files = fs.readdirSync(folderPath).filter((file) => file.endsWith('.md'));

  // If there are no files in the folder, return 404
  if (files.length === 0) {
    return {
      notFound: true,
    };
  }

  // Get the first file (alphabetically or however you want to prioritize)
  const firstFile = files[0].replace('.md', '');  // Remove .md extension to match the URL structure

  // Redirect to the first file in the folder
  return {
    redirect: {
      destination: `/docs/${folderName}/${firstFile}`,
      permanent: false,  // Set to false for non-permanent redirects
    },
  };
};
