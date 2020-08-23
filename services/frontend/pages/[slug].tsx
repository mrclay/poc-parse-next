import { GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";

// TODO Gutenberg was not happy SSR
const Playground = dynamic(() => import("../components/Playground/"), {
  ssr: false,
});

interface Props {
  fetched?: {
    id: string;
    title: string;
    content: string;
  };
}

export default function Post({ fetched }: Props) {
  return <Playground />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      ...(params.slug === "foo" && {
        fetched: {
          id: "foo",
          title: "Hey",
          content: "<p>Hello <strong>World</strong></p>",
        },
      }),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
