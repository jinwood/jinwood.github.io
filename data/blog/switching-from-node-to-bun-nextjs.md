---
title: Switching your NextJS site from Node.js to Bun
summary: Quick & easy switching guide
tags: [bun, nodejs, runtime, nextjs]
date: '2023-09-10'
---

# Switching Your Next.js Site from Node.js to Bun

## Introduction

Bun, the JavaScript runtime, recently unveiled its highly anticipated V1 release, marking a significant milestone for its development team and potentially for the entire JavaScript ecosystem. I've had the pleasure of putting it to the test, and I must say, it's truly impressive. In a mere 20 minutes, I transitioned this website from relying on Node.js to harnessing the power of Bun. Not only did this switch prove quick and easy, but it also brought a substantial boost in performance and introduced a range of exciting built-in features like hot reloading and a test runner, which I couldn't wait to explore further.

In this guide, I'll walk you through the seamless process of migrating your Next.js site from Node.js to Bun.

## Install Bun

Begin by installing Bun on your system. You can do this with a simple terminal command:

```shell
$ curl -fsSL https://bun.sh/install | bash
```

## Install Bun Dependencies

Next, navigate to your project root directory and install the necessary Bun dependencies:

```shell
$ cd my-project-root
$ bun install
```

## Remove npm Configuration

To avoid any conflicts, remove the `package-lock.json` file from your project:

```shell
$ rm package-lock.json
```

## Adjust package.json Scripts

Open your project's `package.json` file and update the scripts section. Replace the existing scripts with the following:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Update CI/CD Actions to Use Bun

If you're using CI/CD pipelines, update your configuration to utilize Bun. Here's an example YAML configuration snippet:

```yaml
jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      # Remove
      - name: Checkout
        uses: actions/checkout@v3
      # /Remove
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      # Final steps:
      - name: Install dependencies
        run: bun install
      - name: Build with Next.js
        run: bun run build
      - name: Static HTML export with Next.js
        run: bun next export
```

## Conclusion

And that's it! With these straightforward steps, your Next.js site is now powered by Bun. You'll find that Bun not only simplifies the migration process but also brings notable improvements over Node.js in terms of speed and functionality. Whether it's for development, building, or other tasks in your Next.js project, Bun has a lot to offer. Give it a try, and you may just discover the enhanced capabilities it brings to your web development workflow.
