pragma solidity =0.5.16;

import '../CoinSwapBEP20.sol';

contract BEP20 is CoinSwapBEP20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
