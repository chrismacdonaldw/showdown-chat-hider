function removeChatMessages() {
  const chatSelector = 'div.battle-log div.chat';
  const messages = document.querySelectorAll(chatSelector);

  messages.forEach(message => {
    const isUserChat = Array.from(message.classList).some(c => c.startsWith('chatmessage-'));

    if (isUserChat) {
      message.remove();
    }
  });
}

function observeBattleLog() {
  const targetNode = document.querySelector('div.ps-room.ps-room-opaque > div.battle-log');

  if (!targetNode) {
    setTimeout(observeBattleLog, 500);
    return;
  }

  const config = { childList: true, subtree: true };

  const callback = function(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        removeChatMessages();
      }
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);
  removeChatMessages();
}

observeBattleLog();