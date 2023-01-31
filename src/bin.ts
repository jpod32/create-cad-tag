#!/usr/bin/env node

import { colors, generateTag } from "./canvas.js"
import prompt, { PromptObject } from "prompts"

import c from "chalk"

const questions: PromptObject[] = [
  {
    type: "list",
    name: "labels",
    message: "Input tag labels",
    separator: ",",
  },
  {
    type: "multiselect",
    name: "colors",
    message: "Select colors",
    choices: Object.keys(colors).map((name) => ({
      title: c.hex(colors[name])(name),
      value: name,
      selected: name === "White",
    })),
    instructions: false,
    hint: "- Space to select. Enter to finish",
  },
  {
    type: "number",
    name: "height",
    message: "Adjust tag height (px)",
    initial: 18,
    max: 100,
    min: 10,
  },
]

console.log(c.green.bold("📟 Create CAD Tags"))

prompt(questions)
  .then((responses) => {
    const { labels, height, colors } = responses

    for (const label of labels) {
      for (const color of colors) {
        generateTag(label, height, color)
      }
    }
  })
  .catch(() => console.log(c.red("× Prompt cancelled")))
