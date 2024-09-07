'use client';

import Link from 'next/link';
import GoogleAnalytics from '../lib/googleAnalytics';

const googleAnalytics = new GoogleAnalytics();

export default function PostLink({
  href, className, post, children,
}) {
  const handlePostClick = () => {
    googleAnalytics.sendEvent('post_click', {
      post_slug: post.properties?.Slug?.rich_text[0]?.text?.content,
      post_title: post?.properties?.Title?.title[0]?.plain_text,
    });
  };

  return (
    <Link href={href} className={className} onClick={handlePostClick}>
      {children}
    </Link>
  );
}
