const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/USER/Desktop/maple-colosseum/maple-hub/public/blog/hexa-balance-july-2026/';

const map = [
  ['1341504', 'darkknight1'],
  ['1341505', 'darkknight2'],
  ['21141505', 'aran1'],
  ['21141506', 'aran2'],
  ['21141507', 'aran3'],
  ['21141509', 'aran4'],
  ['151141503', 'adele1'],
  ['61141006', 'kaiser1'],
  ['31241506', 'demonavenger1'],
  ['161140507', 'len1'],
  ['400021113', 'arcmage_fd1'],
  ['2341509', 'bishop1'],
  ['22201505', 'evan1'],
  ['142140504', 'kinesis1'],
  ['152140510', 'illium1'],
  ['162141503', 'lara1'],
  ['192141008', 'lethe1'],
  ['192141013', 'lethe2'],
  ['192141504', 'lethe3'],
  ['3241504', 'marksman1'],
  ['3341506', 'pathfinder1'],
  ['3341507', 'pathfinder2'],
  ['400031015', 'windbreaker1'],
  ['23141506', 'mercedes1'],
  ['23141507', 'mercedes2'],
  ['63140511', 'kain1'],
  ['63141509', 'kain2'],
  ['63141514', 'kain3'],
  ['4241507', 'shadower1'],
  ['4241508', 'shadower2'],
  ['4241509', 'shadower3'],
  ['4360507', 'dualblade1'],
  ['154141506', 'kali1'],
  ['36141507', 'xenon1'],
  ['5141509', 'viper1'],
  ['15141505', 'striker1'],
  ['35141506', 'mechanic1'],
  ['155140505', 'ark1'],
  ['65141506', 'angelic1'],
  ['5341002', 'cannonshooter1'],
  ['5341504', 'cannonshooter2'],
];

const files = fs.readdirSync(dir);
for (const file of files) {
  if (!file.startsWith('w_')) continue;
  for (const [id, name] of map) {
    if (file.includes(id)) {
      const src = path.join(dir, file);
      const dst = path.join(dir, name + '.png');
      fs.copyFileSync(src, dst);
      console.log(`Copied ${file} -> ${name}.png`);
      break;
    }
  }
}
console.log('Done!');
