import Image from 'next/image';
import { getDatabase } from '../lib/notion';
import Text from '../components/text';
import styles from './index.module.css';
import PostLink from '../components/postLink';

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
        <header className={styles.header} style={{ marginTop: '100px' }}>
          <h1>Hey, I am Aakash</h1>
          <p>
            I am a software engineer and a full stack developer. I love to build
            things that make an impact. I am currently working at Backlight Inc.
            I have a passion for building products that solve real-world problems.
          </p>
          <br />
          <div>
            <div className={styles.socialLinks}>
              <a aria-label="linkedIn" href="https://linkedin.com/in/aakashsinghdev/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a aria-label="github" href="https://github.com/aakashs007" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a aria-label="twitter" href="https://twitter.com/aakashsingh_dev" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a aria-label="youtube" href="https://www.youtube.com/@codingturtle" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
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
            const published = post.properties?.Published?.checkbox;
            const description = post.properties?.Description?.rich_text[0]?.plain_text;
            if (!published) return null;

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
