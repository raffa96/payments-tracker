# Security policy

## Supported versions

The project is in early development and has no stable release yet. Security
fixes are applied to the `develop` branch and shipped with the next release.

## Reporting a vulnerability

**Please do not report security vulnerabilities through public issues, pull
requests or discussions.**

Report them privately through GitHub's
[private vulnerability reporting](https://github.com/raffa96/payments-tracker/security/advisories/new).
Include as much of the following as you can:

- the type of issue (e.g. SQL injection, cross-site scripting);
- the affected files, routes or versions;
- step-by-step instructions to reproduce it;
- the potential impact.

You will receive an acknowledgement as soon as possible. Once the issue is
confirmed, a fix will be prepared and released, and you will be credited in the
advisory unless you prefer otherwise.

## Running an instance safely

payments-tracker is meant to run as a private instance. In particular:

- by default the server only listens on `127.0.0.1`, so it is not reachable from
  other machines;
- if you expose it to a network, put it behind a reverse proxy that serves it
  over **HTTPS**;
- keep Node.js and the project dependencies up to date;
- back up the data directory regularly and restrict its file permissions.
