import BST from 'binary_search_tree'
import { shuffledRange } from 'shuffle'

const BST_SOURCE = shuffledRange(1, 100)
const randomValue = Math.floor(Math.random() * BST_SOURCE.length + 1)
const tree = new BST(BST_SOURCE)
tree.printBFS()
