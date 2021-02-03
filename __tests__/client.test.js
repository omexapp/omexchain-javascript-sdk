import OMEXChainClient from "../src"
import * as crypto from "../src/crypto"



const mnemonic = "total lottery arena when pudding best candy until army spoil drill pool"
const privateKey = "29892b64003fc5c8c89dc795a2ae82aa84353bb4352f28707c2ed32aa1011884"
const fromAddress = "omexchain1pt7xrmxul7sx54ml44lvv403r06clrdkgmvr9g"
const serverUrl = "http://localhost:8545"
const userAddress = "omexchain1jjvpmgwwgs99nhlje3aag0lackunqgj7xnrnwe"
const chainId = "omexchain-1" // -testnet1
const baseCoin = "omt"
const testCoin = "xxb-781"
const testProduct = testCoin + "_" + baseCoin
const testPoolName = "aaa-882_omt"



describe("OMEXChainClient test", async () => {


  it("get balance", async () => {
    const client = new OMEXChainClient(serverUrl, {
      chainId: chainId
    })
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    const res = await client.getBalance(fromAddress)
    expect(res.length).toBeGreaterThanOrEqual(0)
  })

  it("send sendTransaction", async () => {
    jest.setTimeout(10000)
    const client = new OMEXChainClient(serverUrl, {
      chainId: chainId
    })
    // const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    //console.log(client)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
    const res = await client.sendSendTransaction(userAddress, "1.00000000", baseCoin, "hello world", sequence)
    console.log(JSON.stringify(res))
    // expect(res.status).toBe(200)
  })

  it("send placeOrderTransaction,cancelOrderTransaction", async () => {
    jest.setTimeout(20000)
    const symbol = testProduct
    const client = new OMEXChainClient(serverUrl, {
      chainId: chainId
    })
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    //console.log(client)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    //console.log(addr)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))

    const res1 = await client.sendPlaceOrderTransaction(symbol, "BUY", "1.00000000", "1.10000000", "",sequence)
    console.log(JSON.stringify(res1))
    expect(res1.status).toBe(200)

    var patt = /ID[0-9]*-[0-9]*/
    const orderId = patt.exec(JSON.stringify(res1))[0].toString()
    //const orderId = res1.result.tags[1].value
    console.log(orderId)
    const res2 = await client.sendCancelOrderTransaction(orderId, "",sequence + 1)
    console.log(JSON.stringify(res2))
    expect(res2.status).toBe(200)

  })

   async function  prepareAccount() {
     const client = new OMEXChainClient(serverUrl, {
       chainId: chainId
     })
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
     return {
       omclient:client,
       sequence:sequence
     }
  }

  it("send sendTokenIssueTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendTokenIssueTransaction("aa", "aa11", "10000.00000000", true, '', 'test')
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })
  it("send sendTokenBurnTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendTokenBurnTransaction("aa", "100.00000000", "burn")
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })
  it("send sendTokenMintTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendTokenMintTransaction("aa", "200.00000000", "mint")
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })


  it("send sendRegisterDexOperatorTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendRegisterDexOperatorTransaction("http://test.json", "omexchain14zg88reaad4czrcnf93esftwe44gpev9cqhkny", "add deposit", data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })

  it("send sendListTokenPairTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendListTokenPairTransaction("tbtc-edc", "tusdk-d42","0.01000000", "list tokenpair", data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })

  it("send sendAddProductDepositTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendAddProductDepositTransaction("50.00000000", "tbtc-edc_tusdk-d42", "add deposit", data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })

  it("send sendWithdrawProductDepositTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendWithdrawProductDepositTransaction("40.00000000", "tbtc-edc_tusdk-d42", "withdraw deposit", data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })

  // ammswap
  it("send AddLiquidityTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendAddLiquidityTransaction("0.01001000", "100.00000000", "eth", "200.00000000", 'omt', "1619677667", 'AddLiquidityTransaction', data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })
  it("send RemoveLiquidityTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendRemoveLiquidityTransaction("0.01001000", "50.00000000", "eth", "100.00000000", 'omt', "1619677667", 'RemoveLiquidityTransaction', data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })
  it("send CreateExchangeTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendCreateExchangeTransaction("eth", "omt", "CreateExchangeTransaction", data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })
  it("send SwapTokenTransaction", async () => {
    jest.setTimeout(10000)
    const data = await prepareAccount()
    const res = await data.omclient.sendSwapTokenTransaction("50.00000000", "aa11", "10.00000000", "omt", "1612781334", userAddress, '', data.sequence)
    console.log(JSON.stringify(res))
    expect(res.status).toBe(200)
  })

  // farm
  it("send sendFarmCreatePoolTransaction", async () => {
    jest.setTimeout(10000)
    const client = new OMEXChainClient(serverUrl, {
      chainId: chainId
    })
    // const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    //console.log(client)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
    const res = await client.sendFarmCreatePoolTransaction(testPoolName, baseCoin, 15, testCoin, "hello world", sequence)
    console.log(JSON.stringify(res))
    // expect(res.status).toBe(200)
  })

  it("send sendFarmDestroyPoolTransaction", async () => {
    jest.setTimeout(10000)
    const client = new OMEXChainClient(serverUrl, {
      chainId: chainId
    })
    // const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    //console.log(client)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
    const res = await client.sendFarmDestroyPoolTransaction(testPoolName, "hello world", sequence)
    console.log(JSON.stringify(res))
    // expect(res.status).toBe(200)
  })

  it("send sendFarmProvideTransaction", async () => {
    jest.setTimeout(10000)
    const client = new OMEXChainClient(serverUrl, {
      chainId: chainId
    })
    // const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    //console.log(client)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
    const res = await client.sendFarmProvideTransaction(testPoolName, testCoin, 100, 2, "11450", "hello world", sequence)
    console.log(JSON.stringify(res))
    // expect(res.status).toBe(200)
  })

  it("send sendFarmLockTransaction", async () => {
    jest.setTimeout(10000)
    const client = new OMEXChainClient(serverUrl, {
      chainId: chainId
    })
    // const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    //console.log(client)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
    const res = await client.sendFarmLockTransaction(testPoolName, baseCoin, 1000, "hello world", sequence)
    console.log(JSON.stringify(res))
    // expect(res.status).toBe(200)
  })

  it("send sendFarmUnLockTransaction", async () => {
    jest.setTimeout(10000)
    const client = new OMEXChainClient(serverUrl, {
      chainId: chainId
    })
    // const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    //console.log(client)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
    const res = await client.sendFarmUnLockTransaction(testPoolName, baseCoin, 500, "hello world", sequence)
    console.log(JSON.stringify(res))
    // expect(res.status).toBe(200)
  })

  it("send sendFarmClaimTransaction", async () => {
    jest.setTimeout(10000)
    const client = new OMEXChainClient(serverUrl, {
      chainId: chainId
    })
    // const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    await client.setAccountInfo(privateKey)
    //console.log(client)
    const addr = crypto.getAddressFromPrivateKey(client.privateKey)
    const account = await client.getAccount(addr)
    const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))
    const res = await client.sendFarmClaimTransaction(testPoolName , "hello world", sequence)
    console.log(JSON.stringify(res))
    // expect(res.status).toBe(200)
  })

})
