# #!/bin/bash
set -a
source .env
set +a

npx supabase gen types typescript --project-id $PROJECT_ID --schema public > database.types.ts
