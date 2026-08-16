// Kaleidoweb service worker: the one button.
// Click -> inject takeover content script into the active tab (or toggle it off).
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !/^https?:/.test(tab.url || '')) return;
  try {
    // If already active, the content script handles toggling via message.
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => !!window.__kaleidoweb_active,
    });
    if (result) {
      chrome.tabs.sendMessage(tab.id, { type: 'kw:toggle' });
      return;
    }
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['extract.js', 'takeover.js'],
    });
  } catch (e) {
    console.error('Kaleidoweb injection failed', e);
  }
});
