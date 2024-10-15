---
title: Writing a CSS parser using TypeScript and deno
summary: Writing CSS isn't painful enough, let's parse it too"
date: '2024-10-09'
tags: [typescript, deno, css]
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

### Project structure

This bits fairly simple. `deno init`, cd into project.

```
├── deno.json
├── deno.lock
├── main_test.ts
├── main.ts
├── tokenizer.ts
└── types.ts
```

`tokenizer` is where the bulk of our logic will live. Lets start by adding some basic types to represent CSS components. These are incomplete but will get us going:

```typescript
export interface Rule {
  selectors: Selector[]
  declarations: Declaration[]
}

export interface AtRule {
  identifier: string
  value: string
}

export interface Selector {
  selector: string
}

export interface Declaration {
  property: Property
  value: Value
}

export interface Property {
  property: string
}

export interface Value {
  value: string
}

export interface Comment {
  value: string
}
```

We then need a simple state machine we can then use to traverse an input string and make decisions based on the next char.

```typescript
enum State {
  Start,
  Selector,
  OpenBrace,
  PropertyName,
  Colon,
  PropertyValue,
  Semicolon,
  CloseBrace,
  Accept,
  Reject,
}

export class CSSRuleParserStateMachine {
  private state: State = State.Start
  private currentToken: string = ''
  private selector: string = ''
  private properties: { [key: string]: string } = {}
  private currentProperty = ''

  // parse each char of input and attempt to transition
  // set state accordingly
  parse(input: string): boolean {
    for (const char of input) {
      // x
    }

    return this.state === State.Accept
  }

  // state transition logic based on current state
  // and given character
  private transition(char: string): void {
    switch (this.state) {
      default:
        this.state = State.Reject
    }
  }

  // return typed object based off input
  getParseResult(): {
    selector: string
    properties: { [key: string]: string }
  } {
    return {
      selector: this.selector,
      properties: this.properties,
    }
  }
}
```

This should start us off. To do:

- loop the full string
- make state decisions based off the outcome of `transition`
- implement various case blocks for each eventuality of a set of CSS rules
- plenty of other things I've missed out
