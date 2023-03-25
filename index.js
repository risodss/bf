const { ethers } = require('ethers');
const Web3 = require("web3");
const fs = require('fs');
const wordlist = fs.readFileSync('input.txt', 'utf8').split('\n');
const api = 'https://eth-mainnet.g.alchemy.com/v2/RmGuCDSAurpFNgW82eCz3_NaDTpZ6WPB';
const provider = new Web3(new Web3.providers.HttpProvider(api));

async function main() {
  while(1){
    var mnemonic = generateMnemonic();
    var wallet = new ethers.Wallet.fromMnemonic(mnemonic);
    var address = wallet.address;
    var balance = await provider.eth.getBalance(address);
    
    if (balance !== '0')
    {
      const content = mnemonic+'\n'+address+'\n'+balance+'\n';
      
      fs.appendFile('cracked.txt', content, err => {
        if (err) {
          console.error(err)
          return;
        }
      });
      
      console.log(mnemonic);
      console.log(address);
      console.log("balance: ", balance);
      break;
    } 
  }
}

function generateMnemonic() {
  const mnemonicArray = [];
  const length = wordlist.length;
  
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * length);
    mnemonicArray.push(wordlist[randomIndex]);
  }
  
  return mnemonicArray.join(' ');
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
