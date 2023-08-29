const token_stack = {
  name: "StackOS",
  address: "0xE047a4e5B0057d7f21E667DF64B6ca1ad89d0634",
  ticker: "STACK",
};

const token_okx = {
  name: "OKX",
  address: "0x4e228A23dC6B3167757C73C585311A59833DEb7c",
  ticker: "OKX",
};

const token_neo = {
  name: "TNeo",
  address: "0xEB0dbA59d17d2016B08B9C9E23D51BbBE7289519",
  ticker: "tNEO",
};

const Pools = [
  {
    T1: token_okx,
    T2: token_stack,
    Pool: "0xE7D7e374f9662Fc95Ab9BdD4781b2c96e5541A93",
  },
  {
    T1: token_stack,
    T2: token_neo,
    Pool: "0x608bF3AbA80b08F935f7E01a79526bC46d1B5787",
  },
  {
    T1: token_neo,
    T2: token_okx,
    Pool: "0x535b5fA2C06A979b4624Ec5A2096A9948dA2C60b",
  },
];

const Tokens = [token_okx, token_stack, token_neo];
const _Tokens = Tokens.reverse();

function getTokenDetails(address: string) {
  for (var i = 0; i < Tokens.length; i++) {
    if (Tokens[i].address === address) {
      console.log(Tokens[i]);
      return Tokens[i];
    }
  }
  return null;
}

function getPoolDetails(tokenA: string, tokenB: string) {
  for (var i = 0; i < Pools.length; i++) {
    if (
      (Pools[i].T1.address === tokenA && Pools[i].T2.address === tokenB) ||
      (Pools[i].T2.address === tokenA && Pools[i].T1.address === tokenB)
    ) {
      return Pools[i];
    }
  }
  return null;
}

export { Tokens, _Tokens, Pools, getTokenDetails, getPoolDetails };
