// components/Header.tsx
import { Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Header = ({ folders }: { folders: string[] }) => {
  return (
    <Box as="header" p="4" bg="gray.100" display="flex">
      {folders.map((folder) => (
        <NextLink key={folder} href={`/docs/${folder}`} passHref>
          <Link mx="2">{folder}</Link>
        </NextLink>
      ))}
    </Box>
  );
};

export default Header;