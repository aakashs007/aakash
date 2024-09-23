export function optimizeImageUrl(url) {
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

export function daysPassed(d1, d2) {
  if (d1 - d2 < 0) return 0;

  const diff = (d1 - d2) / 1000; // in seconds
  const hours = Math.floor(diff / 3600);
  return hours / 24;
}
