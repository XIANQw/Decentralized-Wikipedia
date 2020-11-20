pragma solidity ^0.5.0;

contract Wikipedia {
  struct Article {
    string content;
  }

  event UpdateArticle (
    address indexed _from,
    uint _id
  );


  uint[] public ids;
  uint id = 0;
  mapping (uint => Article) public articlesById;

  constructor() public {
    ids.push(id);
    Article memory newArticle = Article("This is your first article in your contract");
    articlesById[id++] = newArticle;
  }

  function articleContent(uint index) public view returns (string memory) {
    return articlesById[index].content;
  }

  function addArticle(string memory content) public {
    Article memory newArticle = Article(content);
    articlesById[id] = newArticle;
    emit UpdateArticle(msg.sender, id);
    ids.push(id++);
  }

  function getAllIds() public view returns (uint[] memory) {
    return ids;
  }

}
