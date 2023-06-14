const { expect } = require("chai");
const { ethers } = require("hardhat");

const bytes32 = require('bytes32');

const baseSize = 1000000;

describe("Trustlesss fund", function () {
  it("bad news", async function () {
    const [owner, addr1 ,addr2,addr3,addr4,addr5,addr6] = await ethers.getSigners();
    console.log("begian")

    // Init the base token for test
    const Token = (await ethers.getContractFactory("keyToken"));
    const token = await Token.connect(addr1).deploy("KT","keyToken");
    await token.deployed();
    
    //Init the the recipentERC20
    const R = (await ethers.getContractFactory("recipentErc20"));
    const r = await R.connect(owner).deploy(token.address,30000000,3,false);
    await r.deployed();
    console.log("🍺Init the testing Contract : "+r.address);


    //Transfer the tokens into different account 
    await token.connect(addr1).transfer(addr2.address,10000000);
    console.log("🍺Transfer the base assert to addr2")
    await token.connect(addr1).transfer(addr3.address,10000000);
    console.log("🍺Transfer the base assert to addr3")
    await token.connect(addr1).transfer(addr4.address,10000000);
    console.log("🍺Transfer the base assert to addr4")

    //Get the information 
    var s = await r.status();
    avg = s.averageAmount;
    console.log(s)

    //Approve  the token usage 
    await token.connect(addr1).approve(r.address,avg);
    console.log("🍺Approve addr1")
    await token.connect(addr2).approve(r.address,avg);
    console.log("🍺Approve addr2")
    await token.connect(addr3).approve(r.address,avg);
    console.log("🍺Approve addr3")
    await token.connect(addr4).approve(r.address,avg);
    console.log("🍺Approve addr4")

    console.log("🔥Balance of owner : " ,await token.balanceOf(owner.address));
    
    await r.connect(addr1).pay();
    console.log("🍺Addr1 pay")
    await r.connect(addr2).pay();
    console.log("🍺Addr2 pay")
    await r.connect(addr3).pay();
    console.log("🍺Addr3 pay")
    await r.connect(addr4).pay();
    console.log("🍺Addr4 pay")
    
    console.log("🔥Balance of owner : " ,await token.balanceOf(owner.address));


    s = await r.status();
    console.log(s)
  });
});
