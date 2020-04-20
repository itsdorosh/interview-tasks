export let fromFlatToTree;

// function declaration
fromFlatToTree = (flatCollection, rootId = 1, fieldNames = {ID: 'id', PARENT_ID: 'pid'}) => {
	const elementsMap = {};

	flatCollection.forEach((element) => {
		elementsMap[element[fieldNames.ID]] = {...element, children: []};
	});

	for (const itemId in elementsMap) {
		elementsMap[elementsMap[itemId][fieldNames.PARENT_ID]]
		&& elementsMap[elementsMap[itemId][fieldNames.PARENT_ID]].children.push(elementsMap[itemId]);
	}

	return elementsMap[rootId];
};

// test run
const flatCollection = [
	{id: 1, pid: null, name: "Sonny"},
	{id: 2, pid: 1, name: "Cozy"},
	{id: 3, pid: 1, name: "Lazy"},
	{id: 4, pid: 2, name: "Snooze"},
	{id: 5, pid: 2, name: "Chick"},
	{id: 6, pid: 3, name: "Rog"},
	{id: 7, pid: 3, name: "JV"},
];

const tree = fromFlatToTree(flatCollection, 1);
console.log(tree);
