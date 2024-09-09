import { revalidatePath } from 'next/cache';

export async function GET(request) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }

  revalidatePath('/', 'page');
  revalidatePath('/article/[slug]', 'page');

  return new Response('Revalidation triggered', { status: 200 });
}
