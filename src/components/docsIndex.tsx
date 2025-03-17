import { GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';

export default function DocsIndexRedirect() {
  // This component will never be rendered because of the redirect in getStaticProps
  return null;
}

export const getStaticProps: GetStaticProps = async () => {
  const docsPath = path.join(process.cwd(), 'public', 'docs');

  // Get all the folders in the 'docs' directory
  const folders = fs.readdirSync(docsPath).filter((folder) => 
    fs.statSync(path.join(docsPath, folder)).isDirectory()
  );

  // If no folders are found, return 404
  if (folders.length === 0) {
    return {
      notFound: true,
    };
  }

  const firstFolder = folders[0]; // Get the first folder

  // Get the list of files in the first folder
  const files = fs.readdirSync(path.join(docsPath, firstFolder)).filter((file) => file.endsWith('.md'));

  // If no files are found in the first folder, return 404
  if (files.length === 0) {
    return {
      notFound: true,
    };
  }

  // Get the first file (alphabetically, or you can customize the logic)
  const firstFile = files[0].replace('.md', ''); // Remove .md extension

  // Redirect to the first file in the first folder
  return {
    redirect: {
      destination: `/docs/${firstFolder}/${firstFile}`,
      permanent: false,  // Set to false for non-permanent redirects
    },
  };
};
