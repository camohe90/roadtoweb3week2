//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;



contract BueMeACofffe {

    event NewMemi(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo{
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo [] memos;

    address payable owner;

    construct(){
        owner = payable(msg.sender);

    }

    /**
    *@dev comprar un cafe al dueño
    @parametro _name nombre del comprador de cafe
    @parametro _message el mensaje que envia el comprador del cafe
     */

    function buyCoffee (string memory _name, string memory _message) public payable{
        require(msg.value >0,"no puedes comprar un cafe con 0 eth");
        
        //agregar el memo al almacenamiento
        memo.push(Memo(
            msg.sender,
            block.timestamp,
            _name;
            _message;   
        ));

        //enviamos un log de evento cuando un nuevo memo es creado
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name;
            _message; 
            );
    }

    
    /**
    *@dev retirar el balance del contrato al dueño
     */

     function withdrawTips() public{
         address(this).balance;
         require(owner.send(address(this).balance));
     }
     

         /**
    *@dev retorna todos los memos recibidos y almacenados en blockchain
     */

     function getMemos() public view returns(Memo[] memory){
         return memos;
     }



}
