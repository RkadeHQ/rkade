import { NFTStorage, File } from 'nft.storage';
import fs from 'fs';
import mime from 'mime';
import path from 'path';

const PLAYERS = [
  'Vinícius Júnior (Gold)',
  'Luka Modrić (Gold)',
  'Toni Kroos (Gold)',
  'Sergio Ramos (Gold)',
  'Lionel Messi (Gold)',
  'Neymar Jr. (Gold)',
  'Robert Lewandowski (Gold)',
  'Sadio Mane (Gold)',
  'Frenkie De Jong (Gold)',
  'Thibaut Coutois (Gold)',
  'Erling Haaland (Gold)',
  'Ansu Fati (Gold)',
  'Gabriel Jesus (Gold)',
  'Raphaël Varane (Gold)',
  'Jadon Sancho (Gold)',
  'David De Gea (Gold)',
  'Karim Benzema (Gold)',
  'Christian Pulisic (Gold)',
  'Alisson Becker (Gold)',
  'T. Alexander Arnold (Gold)',
  'Mohamed Salah (Gold)',
  'Virgil Van Dijk (Gold)',
  "N'golo Kante (Gold)",
  'Kevin De Bruyne (Gold)',
  'Phil Foden (Gold)',
  'Riyadh Mahrez (Gold)',
  'Vinícius Júnior',
  'Luka Modrić',
  'Toni Kroos',
  'Sergio Ramos',
  'Lionel Messi',
  'Neymar Jr.',
  'Robert Lewandowski',
  'Sadio Mane',
  'Frenkie De Jong',
  'Thibaut Coutois',
  'Erling Haaland',
  'Ansu Fati',
  'Gabriel Jesus',
  'Raphaël Varane',
  'Jadon Sancho',
  'David De Gea',
  'Karim Benzema',
  'Christian Pulisic',
  'Alisson Becker',
  'T. Alexander Arnold',
  'Mohamed Salah',
  'Virgil Van Dijk',
  "N'golo Kante",
  'Kevin De Bruyne',
  'Phil Foden',
  'Riyadh Mahrez',
  'Vinícius Júnior (Bronze)',
  'Luka Modrić (Bronze)',
  'Toni Kroos (Bronze)',
  'Sergio Ramos (Bronze)',
  'Lionel Messi (Bronze)',
  'Neymar Jr. (Bronze)',
  'Robert Lewandowski (Bronze)',
  'Sadio Mane (Bronze)',
  'Frenkie De Jong (Bronze)',
  'Thibaut Coutois (Bronze)',
  'Erling Haaland (Bronze)',
  'Ansu Fati (Bronze)',
  'Gabriel Jesus (Bronze)',
  'Raphaël Varane (Bronze)',
  'Jadon Sancho (Bronze)',
  'David De Gea (Bronze)',
  'Karim Benzema (Bronze)',
  'Christian Pulisic (Bronze)',
  'Alisson Becker (Bronze)',
  'T. Alexander Arnold (Bronze)',
  'Mohamed Salah (Bronze)',
  'Virgil Van Dijk (Bronze)',
  "N'golo Kante",
  'Kevin De Bruyne (Bronze)',
  'Phil Foden (Bronze)',
  'Riyadh Mahrez (Bronze)',
  'Vinícius Júnior (Silver)',
  'Luka Modrić (Silver)',
  'Toni Kroos (Silver)',
  'Sergio Ramos (Silver)',
  'Lionel Messi (Silver)',
  'Neymar Jr. (Silver)',
  'Robert Lewandowski (Silver)',
  'Sadio Mane (Silver)',
  'Frenkie De Jong (Silver)',
  'Thibaut Coutois (Silver)',
  'Erling Haaland (Silver)',
  'Ansu Fati (Silver)',
  'Gabriel Jesus (Silver)',
  'Raphaël Varane (Silver)',
  'Jadon Sancho (Silver)',
  'David De Gea (Silver)',
  'Karim Benzema (Silver)',
  'Christian Pulisic (Silver)',
  'Alisson Becker (Silver)',
  'T. Alexander Arnold (Silver)',
  'Mohamed Salah (Silver)',
  'Virgil Van Dijk (Silver)',
  "N'golo Kante (Silver)",
  'Kevin De Bruyne (Silver)',
  'Phil Foden (Silver)',
  'Riyadh Mahrez (Silver)'
];

async function storeNFT(imagePath, name, description) {
  // load the file from disk
  const image = await fileFromPath(imagePath);

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ4MjhCZjY0NTA1ODk1QjU2RjE4Q0E1REI1MkVlYjVjMTRmMUM5NDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTYyMzA0NjkzNywibmFtZSI6InJrYWRlIn0.NFO-I0fD7HIUjtPZ7JM1sDbDuh4rCqJjfqjgSaoqWn8'
  });

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    image,
    name,
    description
  });
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

for await (const player of PLAYERS) {
  const res = await storeNFT(
    `NFTs/${PLAYERS.indexOf(player) + 1}.png`,
    player,
    'One of one player card NFT from Rkade football.'
  );

  fs.appendFile('tokenURIs.txt', `${res.url}\n`, (err) => {
    if (err) console.log(err);
    else console.log('File written successfully\n');
  });

  console.log('One file done...');
}
