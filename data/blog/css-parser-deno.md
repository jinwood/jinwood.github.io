---
title: Writing a CSS parser using TypeScript and deno
date: '2024-10-09'
tags: [typescript, deno, css]
summary: Writing a CSS parser
---

I need a project to tide me over that challenges me and teaches me more about web technologies. I've never written a "tool" and I'd like to learn more about css, so I figured a css parser could be a fun thing to experiement with.

I'm going to treat the next series of posts as a scratch pad / notes from the experience.

Here's the basic outline of what I will do:

1. Define data structure

- create interfaces for css rules, selectors, decorators etc

2. Implement a tokenizer

- Break the CSS string into tokens (rules, selectors, decorators etc)

3. Create a parser

- Parse the tokens to create an Abstract Syntax Tree

4. Handle the different CSS constructs

- Selectors, declarations etc

5. Implement error handling

- Detect and report syntax errors

6. Build the final output

- Convert the AST into a usable format eg object representation

I'm fully expecting this project to be _rough_ (understatement) as I haven't attempted anything like this before. But it should be fun and teach me some stuff!
