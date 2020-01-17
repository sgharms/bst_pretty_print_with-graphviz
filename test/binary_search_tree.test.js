import BST from '../src/node_modules/binary_search_tree';

describe("Basic BST", () => {
  test("can be initialized", () => {
    const bst = new BST()
    expect(bst).toBeDefined()
  })

  test("can have a new value inserted", () => {
    const bst = new BST()
    expect(bst.insert).toBeDefined()
  })

  test("reports its length", () => {
    const bst = new BST()
    bst.insert(1)
    bst.insert(2)
    expect(bst.length()).toEqual(2)
  })
})

describe("Three-node BST", () => {
  const source = [2, 1, 3]
  let bst = new BST()
  source.forEach(n => bst.insert(n))

  describe("exercises meta information", () => {
    test("reports its length", () => {
      expect(bst.length()).toEqual(3)
    })

    test("reports its depth", () => {
      expect(bst.depth()).toEqual(2)
    })

    test("reports its fullness", () => {
      expect(bst.isFull()).toBeTruthy()
    })

    test(`has minValue of ${source[1]}`, () => {
      expect(bst.getMin()).toEqual(source[1])
    })

    test(`has maxValue of ${source[2]}`, () => {
      expect(bst.getMax()).toEqual(source[2])
    })

    test("has depth of 2", () => {
      expect(bst.depth()).toEqual(2)
    })
  })

  describe("has finding functions", () => {
    const apex = source[0]

    test(`finds the ${apex} node`, () => {
      const apexNode = bst.findNode(apex)
      const childValues = [ apexNode.left.value, apexNode.right.value ]
      expect([1, 3]).toEqual(expect.arrayContaining(childValues))
    })

    test(`confirms the apex presence of ${apex}`, () => {
      expect(bst.contains(3)).toBeTruthy()
    })
  })
})

describe("Seven-node BST", () => {
  const source = [20, 10, 30, 8, 12, 29, 31]
  let bst = new BST()
  source.forEach(n => bst.insert(n))

  describe("exercises meta information", () => {
    test("reports its length", () => {
      expect(bst.length()).toEqual(7)
    })

    test("reports its depth", () => {
      expect(bst.depth()).toEqual(3)
    })

    test("reports its fullness", () => {
      expect(bst.isFull()).toBeTruthy()
    })
  })

  describe("can provide dry-run information for dirgraph visualization", () => {
    let [__current, parent, replacement, __replacementParent] = bst.projectDeletion(10)

    test('parent should be 20', () => {
      expect(parent.value).toBe(20)
    })

    test('replacement should be 8', () => {
      expect(replacement.value).toBe(8)
    })
  })
})

describe("Deletion in a complex BST works", () => {
  let bst

  beforeEach(() => {
    const source = [20, 10, 30, 8, 12, 29, 31]
    bst = new BST()
    for (const n of source){ bst.insert(n) }
  })

  test("it does not contain the node with value 10", () => {
    bst.removeNode(10)
    expect(bst.contains(10)).toBeFalsy()
  })

  test("its length reduces by 1", () => {
    bst.removeNode(10)
    expect(bst.length()).toBe( 6 )
  })

  test("12 is promoted to replace 10 to the left of root", () => {
    bst.removeNode(10)
    expect(bst.findNode(20).left.value).toEqual(8)
  })
})

describe("BST can be created in bulk from Array", () => {
  let bst

  beforeAll(() => {
    bst = new BST([ 200, 100, 300, 350, 187])
  })

  describe("and has the corect metdata", () => {
    test("correctly identifies the max", () => {
      expect(bst.getMax()).toBe(350)
    })

    test("correctly identifies the min", () => {
      expect(bst.getMin()).toBe(100)
    })

    test("correctly calculates length", () => {
      expect(bst.length()).toBe(5)
    })
  })
})