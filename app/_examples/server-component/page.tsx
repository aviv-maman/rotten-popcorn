// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function ServerComponent() {
  // Create a Supabase client configured to use cookies
  const supabase = createClient();

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
  const { data: todos } = await supabase.from('todos').select();

  return <pre>{JSON.stringify(todos, null, 2)}</pre>;
}
