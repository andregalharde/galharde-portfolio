type VisualFormSubmitEvent = {
  preventDefault: () => void
}

declare function preventVisualFormSubmission(event: VisualFormSubmitEvent): void

export { preventVisualFormSubmission }
