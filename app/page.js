import Image from 'next/image';
import { getDatabase } from '../lib/notion';
import Text from '../components/text';
import styles from './index.module.css';
import PostLink from '../components/postLink';
import SocialBtns from '../components/socialBtns';

export const databaseId = process.env?.NOTION_DATABASE_ID ?? 'NOTION_DATABASE_ID';

async function getPosts() {
  const database = await getDatabase();

  return database.map((post) => ({
    ...post,
    coverImage: post?.cover?.external?.url,
  }));
}

export default async function Page() {
  const posts = await getPosts();
  return (
    <div>
      <main className={styles.container}>
        <header className={styles.header} style={{ marginTop: '80px' }}>
          <h1>Hey, I am Aakash</h1>
          <p>
            I am a software engineer and a full stack developer. I love to build
            things that make an impact. I am currently working at Backlight Inc.
            I have a passion for building products that solve real-world problems.
          </p>
          <br />
          <SocialBtns />
        </header>

        <h2 className={styles.heading}>Blog Posts</h2>
        <div className="row">
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              'en-US',
              {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              },
            );
            const slug = post.properties?.Slug?.rich_text[0]?.text?.content;
            const description = post.properties?.Description?.rich_text[0]?.plain_text;

            return (
              <div className="mb-4 col-lg-6 col-md-6 col-sm-12" key={post.id}>
                <PostLink href={`/article/${slug}`} className={`card h-100 ${styles.postCard}`} post={post}>
                  <div className={`${styles.postImageContainer} card-img-top`}>
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={`Cover image for ${post.properties?.Title?.title[0]?.plain_text}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>
                  <div className="card-body">
                    <h3 className={`${styles.postTitle} card-title`}>
                      <Text title={post.properties?.Title?.title} />
                    </h3>
                    <p className={`${styles.postDate} card-text`}>{`${date}`}</p>

                    {description && (
                      <p className={`${styles.postDescription} card-text`}>
                        {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                      </p>
                    )}
                  </div>
                </PostLink>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
