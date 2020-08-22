import { GetStaticProps, GetStaticPaths } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm, usePlugin, useCMS } from "tinacms";
import { InlineForm, InlineText } from "react-tinacms-inline";
import { InlineWysiwyg } from "react-tinacms-editor";

interface Props {
  fetched?: {
    id: string;
    title: string;
    content: string;
  };
}

export default function Post({ fetched }: Props) {
  const cms = useCMS();
  const router = useRouter();

  const formConfig = {
    id: fetched ? fetched.id : "--",
    label: "Blog Post",
    initialValues: fetched,
    onSubmit(values) {
      alert("Submiting");
    },
    fields: [],
    // fields: [
    //   {
    //     name: "title",
    //     label: "Title",
    //     component: "text",
    //   },
    //   {
    //     name: "content",
    //     label: "Content",
    //     component: "textarea",
    //   },
    // ],
  };

  const [modifiedValues, form] = useForm(formConfig);
  usePlugin(form);

  if (router.isFallback || !modifiedValues.id) {
    return "Loading...";
  }

  if (!router.isFallback && !fetched) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      <Head>
        <title>{modifiedValues.title}</title>
      </Head>
      <InlineForm form={form}>
        <h1>
          <InlineText name="title" />
        </h1>
        <InlineWysiwyg name="content" format="html">
          <div
            dangerouslySetInnerHTML={{ __html: modifiedValues.content }}
          ></div>
        </InlineWysiwyg>
      </InlineForm>
      <button onClick={() => (cms.enabled ? cms.disable() : cms.enable())}>
        {cms.enabled ? `Stop Editing ` : `Edit this Site `}
      </button>
    </div>
  );
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
