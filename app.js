(function () {
  const repoUrlGuess = guessRepoUrl();
  const repoLink = document.getElementById('repo-link');
  if (repoUrlGuess) {
    repoLink.href = repoUrlGuess;
    repoLink.textContent = '打开仓库';
  } else {
    repoLink.removeAttribute('href');
    repoLink.textContent = '作者 Aashaby';
  }

  const detected = detectBrowser();
  const detectedText = document.getElementById('detected-browser');
  detectedText.textContent = `检测到：${detected.name}${detected.chromium ? ' (Chromium)' : ''}`;

  const installBtn = document.getElementById('install-btn');
  const stepsList = document.getElementById('steps-list');
  installBtn.addEventListener('click', () => {
    renderSteps(detected, stepsList);
  });

  // Auto render once
  renderSteps(detected, stepsList);

  function detectBrowser() {
    const ua = navigator.userAgent;
    const isEdge = /Edg\//.test(ua);
    const isChrome = /Chrome\//.test(ua) && !isEdge && !/OPR\//.test(ua);
    const isOpera = /OPR\//.test(ua);
    const isBrave = isChrome && (navigator.brave || /Brave\//.test(ua));
    const isVivaldi = /Vivaldi/.test(ua);
    const isFirefox = /Firefox\//.test(ua);
    const isSafari = /Safari\//.test(ua) && !isChrome && !isEdge && !isFirefox;

    if (isEdge) return { name: 'Microsoft Edge', id: 'edge', chromium: true };
    if (isBrave) return { name: 'Brave', id: 'brave', chromium: true };
    if (isVivaldi) return { name: 'Vivaldi', id: 'vivaldi', chromium: true };
    if (isOpera) return { name: 'Opera', id: 'opera', chromium: true };
    if (isChrome) return { name: 'Google Chrome', id: 'chrome', chromium: true };
    if (isFirefox) return { name: 'Mozilla Firefox', id: 'firefox', chromium: false };
    if (isSafari) return { name: 'Safari', id: 'safari', chromium: false };
    return { name: '未知浏览器', id: 'unknown', chromium: false };
  }

  function renderSteps(info, listEl) {
    listEl.innerHTML = '';
    const steps = getSteps(info);
    steps.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      listEl.appendChild(li);
    });
  }

  function getSteps(info) {
    if (info.id === 'firefox') {
      return [
        '打开 about:debugging#/runtime/this-firefox',
        '点击 “临时载入附加组件…（Load Temporary Add-on…）”',
        '选择解压后的目录中的 manifest.json 文件',
        '调试完成后如需持久安装，请打包并提交到 AMO 或使用开发者模式',
      ];
    }

    if (info.id === 'safari') {
      return [
        'Safari 需使用 Xcode 将 Web Extension 转换并签名',
        '打开 Xcode → File → New → Project → Safari Extension App',
        '导入本仓库并按向导进行构建与签名',
      ];
    }

    // Chromium family (Chrome/Edge/Brave/Vivaldi/Opera)
    return [
      '下载上方 ZIP 并解压到本地文件夹',
      '打开 浏览器地址栏输入 chrome://extensions/（Edge 为 edge://extensions/）',
      '右上角开启“开发者模式”',
      '点击“加载已解压的扩展程序”，选择解压后的目录（包含 manifest.json）',
    ];
  }

  function guessRepoUrl() {
    // Best-effort guess based on common Pages pattern: https://<user>.github.io/<repo>/
    // Replace these with your actual values if known.
    const OVERRIDE = 'https://github.com/Aashaby/SharpSword/';
    if (OVERRIDE) return OVERRIDE;
    return '';
  }
})();




