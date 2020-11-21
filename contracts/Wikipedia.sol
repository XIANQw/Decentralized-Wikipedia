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
  mapping (uint => Article) public articlesById;

  constructor() public {
    ids.push(0);
    Article memory newArticle = Article("This is your first article in your contract");
    articlesById[0] = newArticle;
  }

  function articleContent(uint index) public view returns (string memory) {
    return articlesById[index].content;
  }

  function addArticle(uint index, string memory content) public returns (bool) {
    if(bytes(articlesById[index].content).length != 0) return false;
    Article memory newArticle = Article(content);
    articlesById[index] = newArticle;
    ids.push(index);
    return true;
  }

  function getAllIds() public view returns (uint[] memory) {
    return ids;
  }

  function modifyContent(uint index, string memory content) public returns (bool){
    if(bytes(articlesById[index].content).length != 0){
      Article memory newArticle = Article(content);
      articlesById[index] = newArticle;
      return true;
    }
    return false;
  }

}
