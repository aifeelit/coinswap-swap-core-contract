pragma solidity =0.5.16;

import '../CoinSwapERC20.sol';

contract ERC20 is CoinSwapERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
