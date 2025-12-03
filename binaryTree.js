class Node {
    constructor (data) {
        this.data = data;
        this.leftNode = null;
        this.rightNode = null;
    }


}

class Tree {
    
    constructor (initArr) {
        
        initArr.sort((a, b) => a - b);
        this.noDupArr = removeDuplicates(initArr);
        this.rootNode = this.buildTree(this.noDupArr, 0, this.noDupArr.length-1);
    }

    buildTree (arr,start,end) {
        
        
        if(start>end){
            return null;
        }
        
        let mid = Math.floor((start+end)/2);

        let root = new Node(arr[mid]);
        
        
        root.leftNode = this.buildTree(arr, start, mid-1);
        root.rightNode = this.buildTree(arr, mid+1, end);
        
        
        return root;
    }

    insert(root,value){
            
        if(!root){
            return new Node(value);
        }


        if(value > root.data){

            root.rightNode = this.insert(root.rightNode, value);

        }
        else if(value < root.data){
                    
            root.leftNode = this.insert(root.leftNode, value);

        }
            
        return root;

    }

    getSuccessor(curr) {
        curr = curr.rightNode;
        while(curr!==null && curr.leftNode !== null){
            curr = curr.leftNode;
        }
        return curr;
    }

    delete(root,value){
        if(!root){
            return root;
        }

        if(root.data > value){
            root.leftNode = this.delete(root.leftNode, value);
        }
        else if(root.data < value){
            root.rightNode = this.delete(root.rightNode, value);
        }
        else {
            if(!root.rightNode) {
                return root.leftNode;
            }
            if(!root.leftNode){
                return root.rightNode;
            }
            
            const succ = this.getSuccessor(root);
            root.data = succ.data;
            root.rightNode = this.delete(root.rightNode, succ.data);
        }

        return root;
    }

    find(root,value){

        if(!root){
            throw new Error('Value is not Found');
        }
        if(value === root.data){
            return root;
        }

        if(value > root.data){

           root = this.find(root.rightNode, value);

        }
        else if(value < root.data){
                    
          root = this.find(root.leftNode, value);

        }
        
        return root;
            
    }

    height(value){

        let currNode = this.find(this.rootNode,value);
        if(currNode === null){
            return null;
        }
        let height = 0;
        let maxheight = 0;
        this.preOrderForEach(currNode, (node) => {
            if(node.leftNode === null && node.rightNode === null){
                maxheight = Math.max(maxheight,height);
                height = 0;
                return null;
            }
            height++;
            
        })

        return maxheight;
    }

    depth(root, value){

        if(value === this.rootNode.data){
            return 0;
        }
        
        if (!root) {
            return -1;
        }

        let dist = -1;
        
        if(root.data === value || 
            (dist = this.depth(root.leftNode, value)) >= 0 ||
            (dist = this.depth(root.rightNode, value)) >= 0){
           return  dist+1;
        }

        return dist;
    }




    levelOrderForEach(callback) {
        
        if(typeof callback !== 'function'){
            throw new Error('callback is not a function');
        }

        let q = [this.rootNode];
        
        
        while(q[0]){
            
            let currNode = q[0];
            callback(currNode);

            if(currNode.leftNode){
                q.push(currNode.leftNode);
            }
            if(currNode.rightNode){
                q.push(currNode.rightNode);
            }

            q.shift();
        }

    }

    inOrderForEach(root, callback){
        if(typeof callback !== 'function'){
            throw new Error('callback is not a function');
        }

        if(!root) {
            return null;
        }

        this.inOrderForEach(root.leftNode, callback);
        callback(root);
        this.inOrderForEach(root.rightNode, callback);

    }

    preOrderForEach(root, callback){
        if(typeof callback !== 'function'){
            throw new Error('callback is not a function');
        }

        if(!root) {
            return null;
        }

        callback(root);
        this.preOrderForEach(root.leftNode, callback);
        
        this.preOrderForEach(root.rightNode, callback);

    }

    postOrderForEach(root, callback){
        if(typeof callback !== 'function'){
            throw new Error('callback is not a function');
        }

        if(!root) {
            return null;
        }

        
        this.postOrderForEach(root.leftNode, callback);
        
        this.postOrderForEach(root.rightNode, callback);

        callback(root);

    }

    isBalanced(root){

        if(!root){
            return true;
        }

        let isBalance = true;
    
        let leftHeight = 0;
        let rightHeight = 0;

        if(root.leftNode){
            leftHeight = this.height(root.leftNode.data);
            isBalance =this.isBalanced(root.leftNode);
        }

        if(root.rightNode){
            rightHeight = this.height(root.rightNode.data);
            isBalance = this.isBalanced(root.rightNode);
        }

        if(Math.abs(leftHeight - rightHeight) > 1){
            isBalance = false;
        }

        return isBalance;

    }

    rebalance(){
        let sortedArr = [];

        this.inOrderForEach(this.rootNode, (node) => sortedArr.push(node.data));

        this.rootNode = this.buildTree(sortedArr, 0, sortedArr.length-1);
    }

    
}

function removeDuplicates(array){
    
    
    let noDup = [array[0]];
    
    for (let i=1; i<array.length; i++){
        if(array[i] !== array[i-1]){
            noDup.push(array[i]);
        }
       
    }
    
    return noDup;
}

export default Tree;


