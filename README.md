# Power Doc version 3

## features

main feature set

- all inputs are labeled
- entries are nested
- task
- research
- clear daily
- save history

iteration - secondary feature set

- iterations (future proposed features) 
- scopes (singling out features that are in this scope tasks, docs)
- docs, pipelines, etc.
- move item
- delete item


# dependencies

postgres

prisma

    npx prisma migrate dev --name init
    npx prisma generate

vitest

    npx vitest run

# tools

postgres

    user: admin 
    user: postgres
    password: password

    database: pd
    https://docs.fedoraproject.org/en-US/quick-docs/postgresql/
    sudo -u postgres psql
    https://thoughtbot.com/blog/psql-basics
