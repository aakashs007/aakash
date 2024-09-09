import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Image from 'next/image';
import {
  getDatabase, getBlocks, getPageFromSlug,
} from '../../../lib/notion';
import Text from '../../../components/text';
import { renderBlock } from '../../../components/notion/renderer';
import styles from '../../../styles/post.module.css';

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

  const ogImageUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og`);
  ogImageUrl.searchParams.append('slug', params.slug);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&q=75'],
      author: 'Aakash Singh',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&q=75'],
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

      <div className={`${styles.postImageContainer} card-img-top mb-4 mt-4`}>
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
          <Link href="/" className={styles.back}>
            ← Go home
          </Link>
        </section>
      </article>
    </div>
  );
}
