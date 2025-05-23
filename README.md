# Mycelia

### pnpm Command List
- I like pnpm, the choice is yours, otherwise install with `npm i -g pnpm`
- For a cheat-sheet of pnpm commands, run `pnpm cheat`

### Run Local Server
- To run development locally `pnpm i && pnpm dev`

### Start & Connect to Duckdb
- To open duckdb database file for REPL:
    - Install duckdb for Linux: `curl https://install.duckdb.org | sh`
    - Add duckdb to your system PATH in `.bashrc` or `.zshrc`:
        - `export PATH='/root/.duckdb/cli/latest':$PATH`
    - Open a persistant database file: `duckdb ./database/mycelia.duckdb`
    - Write a Table with SQL (run this in duckdb REPL): 
    ```SQL
    CREATE TABLE IF NOT EXISTS nodes (
        nodeId varchar(255),
        label varchar(255),
        ...
        PRIMARY KEY (nodeId)
    );
    ```
    - run `.quit` to save the changes and exit the manual connection to the persistant file
    - run `pnpm database` to connect via REPL
