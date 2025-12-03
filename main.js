import Tree from './binaryTree.js';

let arr = [];

for(let i=0; i<10; i++) {
    arr.push(Math.floor(Math.random()*100));
} 
let tree = new Tree(arr);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(tree.rootNode);

console.log(tree.isBalanced(tree.rootNode));

console.log('level-order------------------');
tree.levelOrderForEach((node)=> console.log(node.data));
console.log('In-order------------------');
tree.inOrderForEach(tree.rootNode, (node)=> console.log(node.data));
console.log('Pre-order------------------');
tree.preOrderForEach(tree.rootNode, (node)=> console.log(node.data));
console.log('Post-order------------------');
tree.postOrderForEach(tree.rootNode, (node)=> console.log(node.data));

tree.insert(tree.rootNode,1000);
tree.insert(tree.rootNode,1123);
tree.insert(tree.rootNode,123);

prettyPrint(tree.rootNode);

console.log(tree.isBalanced(tree.rootNode));

tree.rebalance();
prettyPrint(tree.rootNode);

console.log(tree.isBalanced(tree.rootNode));

console.log('level-order------------------');
tree.levelOrderForEach((node)=> console.log(node.data));
console.log('In-order------------------');
tree.inOrderForEach(tree.rootNode, (node)=> console.log(node.data));
console.log('Pre-order------------------');
tree.preOrderForEach(tree.rootNode, (node)=> console.log(node.data));
console.log('Post-order------------------');
tree.postOrderForEach(tree.rootNode, (node)=> console.log(node.data));



