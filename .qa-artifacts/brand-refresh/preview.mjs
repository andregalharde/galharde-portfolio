import sharp from 'sharp'
for (const name of ['logo-galharde', 'logo-minimal']) {
  await sharp(`public/brand/${name}.svg`).resize(name === 'logo-galharde' ? 810 : 156).png().toFile(`.qa-artifacts/brand-refresh/${name}.png`)
}
