import siteConfig from '@generated/docusaurus.config';

export default function prismIncludeLanguages(PrismObject) {
  const {
    themeConfig: { prism },
  } = siteConfig;

  const { additionalLanguages } = prism;

  const prismLanguageMap = {
    hcl: () => require('prismjs/components/prism-hcl'),
    json: () => require('prismjs/components/prism-json'),
    bash: () => require('prismjs/components/prism-bash'),
    powershell: () => require('prismjs/components/prism-powershell'),
  };

  globalThis.Prism = PrismObject;
  additionalLanguages.forEach((lang) => {
    const loader = prismLanguageMap[lang];
    if (loader) {
      loader();
    }
  });
  delete globalThis.Prism;

  // Extend bash grammar.
  if (PrismObject.languages.bash) {
    PrismObject.languages.bash = PrismObject.languages.insertBefore('bash', 'shebang', {
      'tharsis': {
        pattern: /(?<=^|\n)\s*tharsis\b/,
        alias: 'function',
      },
      'flag': {
        pattern: /(^|\s)--?[\w][\w-]*/,
        lookbehind: true,
        greedy: true,
        alias: 'keyword',
      },
    });
  }
}
