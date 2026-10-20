const potrace = require('potrace');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function trace(file) {
  return new Promise((resolve, reject) => {
    potrace.trace(
      file,
      {
        optCurve: true,
        threshold: 128,
        turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
        turdSize: 2,
        alphaMax: 1,
      },
      (err, svg) => {
        if (err) reject(err);
        else resolve(svg);
      }
    );
  });
}

function extractPath(svg) {
  const match = svg.match(/d="([^"]+)"/);
  return match ? match[1] : '';
}

async function main() {
  const logoDir = path.resolve(__dirname, '../public/images/logo');

  console.log('Tracing masks...');
  const svgRed = await trace(path.join(logoDir, 'mask_red_clean.png'));
  const svgGrey = await trace(path.join(logoDir, 'mask_grey_clean.png'));
  const svgDark = await trace(path.join(logoDir, 'mask_dark_clean.png'));

  const pathRed = extractPath(svgRed);
  const pathGrey = extractPath(svgGrey);
  const pathDark = extractPath(svgDark);

  console.log('Path Red length:', pathRed.length);
  console.log('Path Grey length:', pathGrey.length);
  console.log('Path Dark length:', pathDark.length);

  // 1. Emblem SVG (viewBox: 0 0 600 712)
  const emblemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 712" width="600" height="712">
  <path fill="#1B2527" d="${pathDark}" />
  <path fill="#9AAFB0" d="${pathGrey}" />
  <path fill="#9B111E" d="${pathRed}" />
</svg>`;
  fs.writeFileSync(path.join(logoDir, 'volagro-emblem.svg'), emblemSvg);

  // 2. Emblem White SVG (All White for dark backgrounds)
  const emblemWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 712" width="600" height="712">
  <path fill="#FFFFFF" d="${pathDark}" />
  <path fill="rgba(255,255,255,0.7)" d="${pathGrey}" />
  <path fill="#FFFFFF" d="${pathRed}" />
</svg>`;
  fs.writeFileSync(path.join(logoDir, 'volagro-emblem-white.svg'), emblemWhiteSvg);

  console.log('Rendered vector emblem SVGs.');
}

main().catch(console.error);
