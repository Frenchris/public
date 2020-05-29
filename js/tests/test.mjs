import { join as joinPath, dirname } from 'path'
import { fileURLToPath } from 'url'
import { deepStrictEqual as eq } from 'assert'
import * as fs from 'fs'
const { readFile, writeFile } = fs.promises
const wait = delay => new Promise(s => setTimeout(s, delay))
const fail = fn => {
  try {
    fn()
  } catch (err) {
    return true
  }
}

const name = process.argv[2]
const fatal = (...args) => {
  console.error(...args)
  process.exit(1)
}

if (!name) fatal('missing exercise, usage:\nnode test exercise-name')

const ifNoEnt = fn => err => {
  if (err.code !== 'ENOENT') throw err
  fn(err)
}

const root = dirname(fileURLToPath(import.meta.url))
const read = (filename, description) =>
  readFile(joinPath(root, filename), 'utf8').catch(
    ifNoEnt(() => fatal(`Missing ${description} for ${name}`)),
  )

const { filter, map, join } = []
const { includes, split } = ''
const stackFmt = (err, url) => {
  Object.assign(String.prototype, { includes, split })
  Object.assign(Array.prototype, { filter, map, join })
  return [
    err.message,
    ...err.stack
      .split('\n')
      .filter(l => l.includes(url))
      .map(l => l.split(url).join(`${name}.js`))
  ].join('\n')
}

const main = async () => {
  const [test, code] = await Promise.all([
    read(`${name}_test.js`, 'test'),
    read(`student/${name}.js`, 'student solution'),
  ])

  if (code.includes('import')) fatal('import keyword not allowed')

  const parts = test.split('// /*/ // ⚡')
  const [inject, testCode] = parts.length < 2 ? ['', test] : parts
  const combined = `${inject.trim()}\n${code
    .replace(inject, '')
    .trim()}\n${testCode.trim()}\n`

  const b64 = Buffer.from(combined).toString('base64')
  const url = `data:text/javascript;base64,${b64}`
  const { setup, tests } = await import(url).catch(err =>
    fatal(`Unable to execute ${name} solution, error:\n${stackFmt(err, url)}`),
  )

  const ctx = (await (setup && setup())) || {}
  const tools = { eq, fail, wait, code, ctx }
  for (const [i, t] of tests.entries()) {
    try {
      await t(tools)
    } catch (err) {
      console.log(`test #${i} failed:\n${t.toString()}\n\nError:`)
      fatal(stackFmt(err, url))
    }
  }
}

main().catch(err => fatal(err.stack))