import { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
  getDatabase, getBlocks, getPageFromSlug,
} from '../../../lib/notion';
import Text from '../../../components/text';
import { renderBlock } from '../../../components/notion/renderer';
import styles from '../../../styles/post.module.css';
import { optimizeImageUrl } from '../../../helper/util';

export const revalidate = Number(process.env.RAVALIDATION_TIME_IN_SEC); // invalidate every hour

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const database = await getDatabase();
  return database?.map((page) => {
    const slug = page.properties.Slug?.formula?.string;
    return ({ id: page.id, slug });
  });
}

export async function generateMetadata({ params }) {
  const page = await getPageFromSlug(params?.slug);
  const title = page.properties.Title?.title[0].plain_text;
  const description = page?.properties?.Description?.rich_text[0]?.plain_text || '';

  const coverImage = page?.cover?.external?.url;
  const optimizedCoverImage = coverImage ? optimizeImageUrl(coverImage) : null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [optimizedCoverImage],
      author: 'Aakash Singh',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [optimizedCoverImage],
      creator: '@aakashsingh_dev',
    },
  };
}

export default async function Page({ params }) {
  const page = await getPageFromSlug(params?.slug);
  const blocks = await getBlocks(page?.id);

  if (!page || !blocks) {
    return <div />;
  }

  const title = page.properties.Title?.title[0].plain_text;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.postImageContainer} card-img-top mb-4 mt-5`}>
        {page?.cover?.external?.url && (
          <Image
            src={page?.cover?.external?.url}
            alt={`Cover image for ${page.properties?.Title?.title[0]?.plain_text}`}
            width={1200}
            height={600}
            className="mx-auto d-block img-fluid"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        )}
      </div>
      <article className={`${styles.container} mt-5`}>
        <h1 className={styles.name}>
          <Text title={page.properties.Title?.title} />
        </h1>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>
    </div>
  );
}
