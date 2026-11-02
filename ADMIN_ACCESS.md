# Admin access

Admin access is granted to individual Supabase Auth users with the trusted
`app_metadata.role` value `admin`. A user's editable `user_metadata` is not
used for authorization.

Admin screens are available only in the installed Ergosits Admin PWA. Install
the app from the public website, then launch it to sign in. Regular browser
tabs always show the public website and redirect `/admin` routes to `/`, even
when the browser shares an authenticated admin session. The installed PWA
keeps navigation inside the admin area and requires an admin login.

## Add an admin account

1. In Supabase, open **Authentication → Users** and invite or create the user.
2. Copy that user's UUID, then open **SQL Editor** and run the statement below,
   replacing the UUID. This changes trusted app metadata; do not let users set
   their own role from the app.

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"role":"admin"}'::jsonb
where id = 'REPLACE-WITH-AUTH-USER-UUID';
```

3. Have the user launch the installed PWA and sign in at `/admin/login`. If they already had an active
   session, sign out and back in so the refreshed session contains the role.

To remove admin access, run:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) - 'role'
where id = 'REPLACE-WITH-AUTH-USER-UUID';
```

## Database permissions

The app checks the role before showing admin pages, but browser checks are not
a database security boundary. Enable RLS on `products`, `categories`, and
`orders`, and ensure their policies check the JWT's trusted app metadata for
`role = admin` on admin writes and admin-only reads. Keep the public product and
category reads needed by the storefront, and preserve the order-creation path
used by the payment API. Review existing policies too: permissive Supabase
policies combine with OR, so an old broad policy can still grant access.

For example, an admin predicate for RLS policies is:

```sql
(auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
```

Apply equivalent checks to Storage upload/update/delete policies for the
`products` and `categories` buckets. Those buckets can remain publicly
readable if the storefront uses public image URLs.
