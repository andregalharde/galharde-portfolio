type DecodableImage = Pick<HTMLImageElement, "decode" | "naturalWidth">

export function watchHeroImages(images: readonly DecodableImage[], onChange: (indices: number[]) => void) {
  let active = true
  const report = () => {
    if (!active) return
    const available = images.flatMap((image, index) => image.naturalWidth > 0 ? [index] : [])
    onChange(available)
  }

  report()
  images.forEach((image) => {
    void image.decode().then(report, report)
  })

  return () => { active = false }
}
