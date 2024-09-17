class MyToken {
  constructor(owner) {
    this.name = "MyToken";
    this.symbol = "MTK";
    this.totalSupply = 0;
    this.balances = {};
    this.owner = owner;
  }

  // Helper function to check if the caller is the owner
  isOwner(caller) {
    return caller === this.owner;
  }

  // Mint function to create new tokens
  mint(to, value, caller) {
    if (!this.isOwner(caller)) {
      throw new Error("Only the owner can mint tokens");
    }

    // Increase total supply and update the balance of 'to'
    this.totalSupply += value;
    if (!this.balances[to]) {
      this.balances[to] = 0;
    }
    this.balances[to] += value;
  }

  // Burn function to destroy tokens
  burn(from, value, caller) {
    if (!this.isOwner(caller)) {
      throw new Error("Only the owner can burn tokens");
    }

    // Check if 'from' has enough balance to burn
    if (!this.balances[from] || this.balances[from] < value) {
      throw new Error("Insufficient balance to burn");
    }

    // Decrease total supply and update the balance of 'from'
    this.totalSupply -= value;
    this.balances[from] -= value;
  }

  // Check the balance of a specific address
  balanceOf(address) {
    return this.balances[address] || 0;
  }
}

// Example usage:

// Define owner
const owner = "owner-address";

// Instantiate the MyToken contract
const myToken = new MyToken(owner);

// Mint tokens
try {
  myToken.mint("user1-address", 100, owner);
  console.log(`Balance of user1-address: ${myToken.balanceOf("user1-address")}`);
  console.log(`Total Supply: ${myToken.totalSupply}`);
} catch (error) {
  console.error(error.message);
}

// Burn tokens
try {
  myToken.burn("user1-address", 50, owner);
  console.log(`Balance of user1-address after burn: ${myToken.balanceOf("user1-address")}`);
  console.log(`Total Supply after burn: ${myToken.totalSupply}`);
} catch (error) {
  console.error(error.message);
}
