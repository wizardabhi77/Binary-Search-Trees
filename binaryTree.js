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
        let noDupArr = removeDuplicates(initArr);
        this.rootNode = this.buildTree(noDupArr, 0, noDupArr.length-1);
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