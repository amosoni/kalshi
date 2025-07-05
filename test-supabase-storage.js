require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

async function test() {
  // 列出 bucket
  const { error } = await supabase.storage.listBuckets();
  if (error) {
    process.exit(1);
  }
}

test();
