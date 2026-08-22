/**
 * Keep the starter form visual-only by stopping the browser's native submit.
 *
 * @param {{ preventDefault: () => void }} event
 */
function preventVisualFormSubmission(event) {
  event.preventDefault()
}

export { preventVisualFormSubmission }
