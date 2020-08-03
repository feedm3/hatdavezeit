# Hat Dave Zeit?

This project is a funny website to display if a person has time. The person itself
can manage it's freetime in an admin panel.

## Development

Start the project:

```
yarn dev
```

Database setup:

- create a prisma/.env file with `DATABASE_URL="YOUR_URL""`

```
npx prisma introspect
npx prisma generate
```

## Resources

- Hosted at Vercel
- Postgres at Heroku
- DB CLient: https://www.prisma.io
