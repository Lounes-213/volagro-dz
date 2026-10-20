export const openCallChoice = (): void => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('volagro:open-call-choice'));
  }
};
