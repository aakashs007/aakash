import { getPageFromSlug } from '../../../lib/notion';

export const runtime = 'edge';

function optimizeImageUrl(url) {
  // Check if the URL is from a service that supports optimization parameters
  if (url.includes('cloudinary.com')) {
    // Cloudinary optimization
    return url.replace('/upload/', '/upload/c_scale,w_1200,q_auto:good/');
  } if (url.includes('imgix.net')) {
    // Imgix optimization
    return `${url}?w=1200&q=75&auto=compress`;
  } if (url.includes('images.unsplash.com')) {
    // Unsplash optimization
    const newUrl = url.replace(/[?&](w|q)=\d+/g, '').replace(/\?$/, '');
    return `${newUrl}&w=1200&q=75&`;
  }
  // Add more conditions for other image hosting services as needed

  // If no optimization is possible, return the original URL
  return url;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return new Response('Missing slug parameter', { status: 400 });
  }

  const page = await getPageFromSlug(slug);
  const coverImage = page?.cover?.external?.url;

  // Optimize the cover image URL if it's from a service that supports URL parameters
  const optimizedCoverImage = coverImage ? optimizeImageUrl(coverImage) : null;

  if (!optimizedCoverImage) {
    return new Response('', { status: 200 });
  }

  // Fetch the image
  const imageResponse = await fetch(optimizedCoverImage);
  if (!imageResponse.ok) {
    return new Response('Failed to fetch image', { status: 500 });
  }

  // Get the image buffer and content type
  const imageBuffer = await imageResponse.arrayBuffer();
  const contentType = imageResponse.headers.get('content-type');

  // Return the image directly
  return new Response(imageBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
