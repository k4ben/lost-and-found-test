import type { Category } from "@prisma/client";

export function parseJSON(json: string) {
  return JSON.parse(json, (key, value) => {
    if (typeof value === 'object' && value !== null && value.constructor === Object) {
      // If the value is an object, iterate through its properties
      Object.entries(value).forEach(([k, v]) => {
        if (typeof v === 'bigint') {
          // Convert BigInts to strings
          value[k] = v.toString();
        }
      });
    }
    return value;
  });
}

export type AnyObject = Record<string, any>;

export function serializeWithBigInts<T extends AnyObject>(obj: T): string {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  });
}

// Extend JSON.stringify to handle BigInts
export function stringifyJSON(object: Object) {
  return JSON.stringify(object, (key, value) => {
    if (typeof value === 'bigint') {
      // Convert BigInts to strings
      return value.toString();
    }
    return value;
  });
}

export type CategoryWithChildren = Category & {children: Category[]};

export function convertToHierarchy(categories: Category[]): CategoryWithChildren[] {
  const categoryMap: {[key: string]: Category & { children: Category[]}} = {};
  const topLevelCategories: CategoryWithChildren[] = [];

  categories.forEach(category => {
    const idString = category.ID.toString(); // Convert BigInt ID to string
    if (!categoryMap[idString]) {
      categoryMap[idString] = { ...category, children: [] };
    } else {
      categoryMap[idString] = { ...category, children: categoryMap[idString].children };
    }

    if (category.ParentCategoryID === null) {
      topLevelCategories.push(categoryMap[idString]);
    } else {
      const parentIDString = category.ParentCategoryID.toString(); // Convert BigInt ParentCategoryID to string
      if (!categoryMap[parentIDString]) {
        categoryMap[parentIDString] = { ...categories.find(c => c.ID.toString() === parentIDString)!, children: [] };
      }
      categoryMap[parentIDString].children.push(categoryMap[idString]);
    }
  });

  return topLevelCategories;
}

export function convertToHierarchy2(nodes: Category[]): CategoryWithChildren[] {
  const nodeMap: Map<bigint | null, Category[]> = new Map();

  // Create a map of nodes by their parent IDs
  for (const node of nodes) {
      const parentId = node.ParentCategoryID;
      if (!nodeMap.has(parentId)) {
          nodeMap.set(parentId, []);
      }
      nodeMap.get(parentId)!.push(node);
  }

  // Function to recursively build the flipped tree
  function buildTree(parentId: bigint | null): CategoryWithChildren[] {
      const children = nodeMap.get(parentId) || [];
      const flippedChildren = children.map(child => {
          return {
              ...child,
              children: buildTree(child.ID)
          };
      });
      return flippedChildren;
  }

  // Find top-level nodes (nodes with null parent)
  const topLevelNodes = nodeMap.get(null) || [];
  const flippedTree = topLevelNodes.map(node => {
      return {
          ...node,
          children: buildTree(node.ID)
      };
  });

  return flippedTree;
}