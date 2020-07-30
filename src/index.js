import BST from 'binary_search_tree'
import { shuffledRange } from 'shuffle'
import { graphVizPrintHelper } from 'print_helpers'

const GRAPHVIZ_CONFIG = {
  initialGraphStyles: {
    deletionNode: '[style=filled,shape=star,fillcolor=red]',
    deletionNodesLeftChild: '[style=filled,shape=triangle,fillcolor=yellow] # Deletion Node LeftChild',
    deletionNodesRightChild: '[style=filled,shape=triangle,fillcolor=yellow] # Deletion Node RightChild'
  },
  deletionActionStyles: {
    promotionNode: '[color=red,label="Promoted"]',
    newChildNode: (a, b) => {
      let side
      if (!a && !b) {
        side = "child"
      } else {
        side = a.value > b ? "L" : "R"
      }

      return `[color=green,label="New ${side}"]`
    },
    reboundNode: (labelText) => `[color=blue,label="${labelText}"]`
  }
}

const deletionDigraphDisplayLogic = function (valueOfNodeToDelete) {
  const [deletionNode, deletedNodeParent] = tree.findNodeAndParentNode(valueOfNodeToDelete)
  const template = [
    'graph [ordering="out"]; # Ensure L -> R order is preserved',
    `"${deletionNode.value}"${GRAPHVIZ_CONFIG.initialGraphStyles.deletionNode}`
  ]

  if (deletionNode.left === null && deletionNode.right === null) {
    template.push("# NO-OP: Deletion target was a leaf")
  } else if (!deletionNode.left && deletionNode.right) {
    template.push("# Missing left")
    template.push(`"${deletionNode.right.value}" -> ${deletionNode.value} ${GRAPHVIZ_CONFIG.deletionActionStyles.promotionNode}`)
    template.push(`"${deletedNodeParent.value}" -> ${deletionNode.right.value} ${GRAPHVIZ_CONFIG.deletionActionStyles.newChildNode()}`)
  } else if (deletionNode.left && !deletionNode.right) {
    template.push("# Missing right")
    template.push(`"${deletionNode.left.value}" -> ${deletionNode.value} ${GRAPHVIZ_CONFIG.deletionActionStyles.promotionNode}`)
    template.push(`"${deletedNodeParent.value}" -> ${deletionNode.left.value} ${GRAPHVIZ_CONFIG.deletionActionStyles.newChildNode(deletedNodeParent.value, deletionNode.left.value)}`)
  } else {
    template.push("# Children present")
    const [, deletedNodeParent, replacementNode] = tree.projectDeletion(deletionNode.value)
    template.push(`"${replacementNode.value}" -> ${deletionNode.value} ${GRAPHVIZ_CONFIG.deletionActionStyles.promotionNode}`)
    template.push(`"${deletedNodeParent.value}" -> ${replacementNode.value} ${GRAPHVIZ_CONFIG.deletionActionStyles.newChildNode(deletedNodeParent.value, replacementNode.value)}`)

    if (deletionNode.left) {
      template.push(`"${deletionNode.left.value}"${GRAPHVIZ_CONFIG.initialGraphStyles.deletionNodesLeftChild}`)
      template.push(`"${replacementNode.value}" -> "${deletionNode.left.value}" ${GRAPHVIZ_CONFIG.deletionActionStyles.reboundNode("New L")}`)
    }

    if (deletionNode.right) {
      template.push(`"${deletionNode.right.value}"${GRAPHVIZ_CONFIG.initialGraphStyles.deletionNodesRightChild}`)
      template.push(`"${replacementNode.value}" -> "${deletionNode.right.value}" ${GRAPHVIZ_CONFIG.deletionActionStyles.reboundNode("New R")}`)
    }
  }

  return template.join("\n")
}

const BST_SOURCE = shuffledRange(1, 100)
const randomValue = Math.floor(Math.random() * BST_SOURCE.length + 1)
const tree = (new BST(BST_SOURCE))
tree.printBFS({
  ...graphVizPrintHelper,
  pre: (...args) => {
    graphVizPrintHelper.pre(...args)
    console.log(deletionDigraphDisplayLogic(randomValue))
  }
})
