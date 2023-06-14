

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
struct rules {
    address owner ;
    address keyToken;
    uint256 total;
    uint pairs ;
    uint256 realRecive ;
    uint256 averageAmount ;
    bool includingMyself;
    bool isFinished;
    address[] payers ;
}

contract recipentErc20 {
    using SafeMath for uint256;
    rules private _r;
    /** Recipent settings */
    constructor(address keyToken ,uint256 total, uint pairs , bool includingMyself)
    {
        _r.total = total;
        _r.keyToken =keyToken;
        _r.pairs= pairs;
        _r.includingMyself = includingMyself;
        _r.owner = msg.sender;
        _r.averageAmount = _r.total.div(_r.pairs);
        if(_r.includingMyself)
        {
            _r.payers.push(msg.sender);
            _r.realRecive = _r.realRecive.add(_r.averageAmount);
        }
    }

    function status()public view returns(rules memory r)
    {
        rules memory tmpR;
        tmpR = _r;
        if(_r.realRecive >=_r.total && _r.payers.length>=_r.pairs)
        {
            tmpR.isFinished = true;
        }
        return tmpR;
    }

    function pay()public
    {
        IERC20(_r.keyToken).transferFrom(msg.sender,_r.owner, _r.averageAmount);
        _r.payers.push(msg.sender);
        _r.realRecive = _r.realRecive.add(_r.averageAmount);
    }
}