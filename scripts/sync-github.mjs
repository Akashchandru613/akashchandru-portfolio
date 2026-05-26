/**
 * Fetch live metadata for every GitHub repo referenced in src/data/index.js
 * and write it to src/data/github-live.json. Run before each build so the
 * portfolio shows fresh stars / last-updated / descriptions.
 *
 * Also prints a warning for any public repos under the user that are NOT
 * present in the portfolio yet, so you know what to add.
 *
 * Usage:  node scripts/sync-github.mjs
 * Env:    GITHUB_TOKEN (optional, raises rate limit from 60 → 5000/hr)
 */

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DATA_FILE = resolve(ROOT, 'src/data/index.js')
const OUT_FILE = resolve(ROOT, 'src/data/github-live.json')

const USERNAME = 'akashchandru613'
const SKIP_REPOS = new Set([
  'akashchandru-portfolio', // this portfolio
  'myportfolio-FE',         // superseded
  'Akashchandru613',        // profile readme
])

const headers = { 'Accept': 'application/vnd.github+json' }
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers })
  if (!res.ok) throw new Error(`GitHub ${path} → ${res.status} ${res.statusText}`)
  return res.json()
}

function extractRepoSlugs(source) {
  // matches: github: 'https://github.com/<user>/<repo>'
  const re = /github:\s*['"]https:\/\/github\.com\/[^/]+\/([^/'"\s]+)['"]/g
  const slugs = new Set()
  let m
  while ((m = re.exec(source)) !== null) slugs.add(m[1])
  return [...slugs]
}

async function main() {
  const src = await readFile(DATA_FILE, 'utf8')
  const slugsInPortfolio = extractRepoSlugs(src)
  console.log(`📦 Portfolio references ${slugsInPortfolio.length} repos`)

  const allRepos = await gh(`/users/${USERNAME}/repos?per_page=100&sort=updated`)
  const publicRepos = allRepos.filter(r => !r.fork && !r.private && !SKIP_REPOS.has(r.name))

  const liveBySlug = {}
  for (const slug of slugsInPortfolio) {
    const repo = publicRepos.find(r => r.name.toLowerCase() === slug.toLowerCase())
    if (!repo) {
      console.warn(`⚠️  ${slug} not found on GitHub (skipping)`)
      continue
    }
    liveBySlug[slug] = {
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      url: repo.html_url,
      homepage: repo.homepage || null,
      topics: repo.topics || [],
    }
  }

  const inPortfolio = new Set(slugsInPortfolio.map(s => s.toLowerCase()))
  const missing = publicRepos.filter(r => !inPortfolio.has(r.name.toLowerCase()))
  if (missing.length) {
    console.warn(`\n🆕 ${missing.length} public repo(s) not yet in portfolio:`)
    for (const r of missing) {
      console.warn(`   - ${r.name} — ${r.description || '(no description)'}`)
    }
  } else {
    console.log('\n✅ All public repos are represented in the portfolio.')
  }

  await writeFile(OUT_FILE, JSON.stringify({
    syncedAt: new Date().toISOString(),
    repos: liveBySlug,
  }, null, 2) + '\n')

  console.log(`\n💾 Wrote ${OUT_FILE}`)
}

main().catch(err => {
  console.error('❌ Sync failed:', err.message)
  // Don't fail the build — fall back to whatever live data already exists
  process.exit(0)
})
