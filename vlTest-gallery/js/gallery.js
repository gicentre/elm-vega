
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

var _gicentre$elm_vega$VegaLite$viewConfig = function (viewCfg) {
	var _p0 = viewCfg;
	switch (_p0.ctor) {
		case 'ViewWidth':
			return {
				ctor: '_Tuple2',
				_0: 'width',
				_1: _elm_lang$core$Json_Encode$float(_p0._0)
			};
		case 'ViewHeight':
			return {
				ctor: '_Tuple2',
				_0: 'height',
				_1: _elm_lang$core$Json_Encode$float(_p0._0)
			};
		case 'Clip':
			return {
				ctor: '_Tuple2',
				_0: 'clip',
				_1: _elm_lang$core$Json_Encode$bool(_p0._0)
			};
		case 'Fill':
			var _p1 = _p0._0;
			if (_p1.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'fill',
					_1: _elm_lang$core$Json_Encode$string(_p1._0)
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'fill',
					_1: _elm_lang$core$Json_Encode$string('')
				};
			}
		case 'FillOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'fillOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p0._0)
			};
		case 'Stroke':
			var _p2 = _p0._0;
			if (_p2.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'stroke',
					_1: _elm_lang$core$Json_Encode$string(_p2._0)
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'stroke',
					_1: _elm_lang$core$Json_Encode$string('')
				};
			}
		case 'StrokeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'strokeOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p0._0)
			};
		case 'StrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p0._0)
			};
		case 'StrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p0._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'strokeDashOffset',
				_1: _elm_lang$core$Json_Encode$float(_p0._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$vAlignLabel = function (align) {
	var _p3 = align;
	switch (_p3.ctor) {
		case 'AlignTop':
			return 'top';
		case 'AlignMiddle':
			return 'middle';
		default:
			return 'bottom';
	}
};
var _gicentre$elm_vega$VegaLite$timeUnitLabel = function (tu) {
	var _p4 = tu;
	switch (_p4.ctor) {
		case 'Year':
			return 'year';
		case 'YearQuarter':
			return 'yearquarter';
		case 'YearQuarterMonth':
			return 'yearquartermonth';
		case 'YearMonth':
			return 'yearmonth';
		case 'YearMonthDate':
			return 'yearmonthdate';
		case 'YearMonthDateHours':
			return 'yearmonthdatehours';
		case 'YearMonthDateHoursMinutes':
			return 'yearmonthdatehoursminutes';
		case 'YearMonthDateHoursMinutesSeconds':
			return 'yearmonthdatehoursminutesseconds';
		case 'Quarter':
			return 'quarter';
		case 'QuarterMonth':
			return 'quartermonth';
		case 'Month':
			return 'month';
		case 'MonthDate':
			return 'monthdate';
		case 'Date':
			return 'date';
		case 'Day':
			return 'day';
		case 'Hours':
			return 'hours';
		case 'HoursMinutes':
			return 'hoursminutes';
		case 'HoursMinutesSeconds':
			return 'hoursminutesseconds';
		case 'Minutes':
			return 'minutes';
		case 'MinutesSeconds':
			return 'minutesseconds';
		case 'Seconds':
			return 'seconds';
		case 'SecondsMilliseconds':
			return 'secondsmilliseconds';
		default:
			return 'milliseconds';
	}
};
var _gicentre$elm_vega$VegaLite$stackProperty = function (sp) {
	var _p5 = sp;
	switch (_p5.ctor) {
		case 'StZero':
			return {
				ctor: '_Tuple2',
				_0: 'stack',
				_1: _elm_lang$core$Json_Encode$string('zero')
			};
		case 'StNormalize':
			return {
				ctor: '_Tuple2',
				_0: 'stack',
				_1: _elm_lang$core$Json_Encode$string('normalize')
			};
		case 'StCenter':
			return {
				ctor: '_Tuple2',
				_0: 'stack',
				_1: _elm_lang$core$Json_Encode$string('center')
			};
		default:
			return {ctor: '_Tuple2', _0: 'stack', _1: _elm_lang$core$Json_Encode$null};
	}
};
var _gicentre$elm_vega$VegaLite$vlPropertyLabel = function (spec) {
	var _p6 = spec;
	switch (_p6.ctor) {
		case 'VLName':
			return 'name';
		case 'VLDescription':
			return 'description';
		case 'VLTitle':
			return 'title';
		case 'VLWidth':
			return 'width';
		case 'VLHeight':
			return 'height';
		case 'VLPadding':
			return 'padding';
		case 'VLAutosize':
			return 'autosize';
		case 'VLBackground':
			return 'background';
		case 'VLData':
			return 'data';
		case 'VLMark':
			return 'mark';
		case 'VLTransform':
			return 'transform';
		case 'VLEncoding':
			return 'encoding';
		case 'VLConfig':
			return 'config';
		case 'VLSelection':
			return 'selection';
		case 'VLHConcat':
			return 'hconcat';
		case 'VLVConcat':
			return 'vconcat';
		case 'VLLayer':
			return 'layer';
		case 'VLRepeat':
			return 'repeat';
		case 'VLFacet':
			return 'facet';
		case 'VLSpec':
			return 'spec';
		default:
			return 'resolve';
	}
};
var _gicentre$elm_vega$VegaLite$symbolLabel = function (sym) {
	var _p7 = sym;
	switch (_p7.ctor) {
		case 'SymCircle':
			return 'circle';
		case 'SymSquare':
			return 'square';
		case 'Cross':
			return 'cross';
		case 'Diamond':
			return 'diamond';
		case 'TriangleUp':
			return 'triangle-up';
		case 'TriangleDown':
			return 'triangle-down';
		default:
			return _p7._0;
	}
};
var _gicentre$elm_vega$VegaLite$sideLabel = function (side) {
	var _p8 = side;
	switch (_p8.ctor) {
		case 'STop':
			return 'top';
		case 'SBottom':
			return 'bottom';
		case 'SLeft':
			return 'left';
		default:
			return 'right';
	}
};
var _gicentre$elm_vega$VegaLite$selectionMarkProperty = function (markProp) {
	var _p9 = markProp;
	switch (_p9.ctor) {
		case 'SMFill':
			return {
				ctor: '_Tuple2',
				_0: 'fill',
				_1: _elm_lang$core$Json_Encode$string(_p9._0)
			};
		case 'SMFillOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'fillOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p9._0)
			};
		case 'SMStroke':
			return {
				ctor: '_Tuple2',
				_0: 'stroke',
				_1: _elm_lang$core$Json_Encode$string(_p9._0)
			};
		case 'SMStrokeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'strokeOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p9._0)
			};
		case 'SMStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p9._0)
			};
		case 'SMStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p9._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'strokeDashOffset',
				_1: _elm_lang$core$Json_Encode$float(_p9._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$selectionLabel = function (seType) {
	var _p10 = seType;
	switch (_p10.ctor) {
		case 'Single':
			return 'single';
		case 'Multi':
			return 'multi';
		default:
			return 'interval';
	}
};
var _gicentre$elm_vega$VegaLite$scheme = F2(
	function (name, extent) {
		var _p11 = extent;
		if (((_p11.ctor === '::') && (_p11._1.ctor === '::')) && (_p11._1._1.ctor === '[]')) {
			return {
				ctor: '_Tuple2',
				_0: 'scheme',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'name',
							_1: _elm_lang$core$Json_Encode$string(name)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'extent',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$float(_p11._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p11._1._0),
											_1: {ctor: '[]'}
										}
									})
							},
							_1: {ctor: '[]'}
						}
					})
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: 'scheme',
				_1: _elm_lang$core$Json_Encode$string(name)
			};
		}
	});
var _gicentre$elm_vega$VegaLite$scaleLabel = function (scType) {
	var _p12 = scType;
	switch (_p12.ctor) {
		case 'ScLinear':
			return 'linear';
		case 'ScPow':
			return 'pow';
		case 'ScSqrt':
			return 'sqrt';
		case 'ScLog':
			return 'log';
		case 'ScTime':
			return 'time';
		case 'ScUtc':
			return 'utc';
		case 'ScSequential':
			return 'sequential';
		case 'ScOrdinal':
			return 'ordinal';
		case 'ScBand':
			return 'band';
		case 'ScPoint':
			return 'point';
		case 'ScBinLinear':
			return 'bin-linear';
		default:
			return 'bin-ordinal';
	}
};
var _gicentre$elm_vega$VegaLite$scaleRangeProperty = function (srType) {
	var _p13 = srType;
	switch (_p13.ctor) {
		case 'RNumbers':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p13._0));
		case 'RStrings':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p13._0));
		default:
			return _elm_lang$core$Json_Encode$string(_p13._0);
	}
};
var _gicentre$elm_vega$VegaLite$scaleConfig = function (scaleCfg) {
	var _p14 = scaleCfg;
	switch (_p14.ctor) {
		case 'SCBandPaddingInner':
			return {
				ctor: '_Tuple2',
				_0: 'bandPaddingInner',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCBandPaddingOuter':
			return {
				ctor: '_Tuple2',
				_0: 'bandPaddingOuter',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCClamp':
			return {
				ctor: '_Tuple2',
				_0: 'clamp',
				_1: _elm_lang$core$Json_Encode$bool(_p14._0)
			};
		case 'SCMaxBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'maxBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCMinBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'minBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCMaxFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'maxFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCMinFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'minFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCMaxOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'maxOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCMinOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'minOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCMaxSize':
			return {
				ctor: '_Tuple2',
				_0: 'maxSize',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCMinSize':
			return {
				ctor: '_Tuple2',
				_0: 'minSize',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCMaxStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'maxStrokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCMinStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'minStrokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCPointPadding':
			return {
				ctor: '_Tuple2',
				_0: 'pointPadding',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SCRangeStep':
			var _p15 = _p14._0;
			if (_p15.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'rangeStep',
					_1: _elm_lang$core$Json_Encode$float(_p15._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'rangeStep', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'SCRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _elm_lang$core$Json_Encode$bool(_p14._0)
			};
		case 'SCTextXRangeStep':
			return {
				ctor: '_Tuple2',
				_0: 'textXRangeStep',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'useUnaggregatedDomain',
				_1: _elm_lang$core$Json_Encode$bool(_p14._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$selectionResolutionLabel = function (res) {
	var _p16 = res;
	switch (_p16.ctor) {
		case 'Global':
			return 'global';
		case 'Union':
			return 'union';
		default:
			return 'intersect';
	}
};
var _gicentre$elm_vega$VegaLite$resolutionLabel = function (res) {
	var _p17 = res;
	if (_p17.ctor === 'Shared') {
		return 'shared';
	} else {
		return 'independent';
	}
};
var _gicentre$elm_vega$VegaLite$repeatFields = function (fields) {
	var _p18 = fields;
	if (_p18.ctor === 'RowFields') {
		return {
			ctor: '_Tuple2',
			_0: 'row',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p18._0))
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'column',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p18._0))
		};
	}
};
var _gicentre$elm_vega$VegaLite$rangeConfig = function (rangeCfg) {
	var _p19 = rangeCfg;
	switch (_p19.ctor) {
		case 'RCategory':
			return {
				ctor: '_Tuple2',
				_0: 'category',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$scheme,
							_p19._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
		case 'RDiverging':
			return {
				ctor: '_Tuple2',
				_0: 'diverging',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$scheme,
							_p19._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
		case 'RHeatmap':
			return {
				ctor: '_Tuple2',
				_0: 'heatmap',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$scheme,
							_p19._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
		case 'ROrdinal':
			return {
				ctor: '_Tuple2',
				_0: 'ordinal',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$scheme,
							_p19._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
		case 'RRamp':
			return {
				ctor: '_Tuple2',
				_0: 'ramp',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$scheme,
							_p19._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'symbol',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$scheme,
							_p19._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
	}
};
var _gicentre$elm_vega$VegaLite$positionLabel = function (pChannel) {
	var _p20 = pChannel;
	switch (_p20.ctor) {
		case 'X':
			return 'x';
		case 'Y':
			return 'y';
		case 'X2':
			return 'x2';
		default:
			return 'y2';
	}
};
var _gicentre$elm_vega$VegaLite$paddingProperty = function (pad) {
	var _p21 = pad;
	if (_p21.ctor === 'PSize') {
		return _elm_lang$core$Json_Encode$float(_p21._0);
	} else {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'left',
					_1: _elm_lang$core$Json_Encode$float(_p21._0)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'top',
						_1: _elm_lang$core$Json_Encode$float(_p21._1)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'right',
							_1: _elm_lang$core$Json_Encode$float(_p21._2)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'bottom',
								_1: _elm_lang$core$Json_Encode$float(_p21._3)
							},
							_1: {ctor: '[]'}
						}
					}
				}
			});
	}
};
var _gicentre$elm_vega$VegaLite$overlapStrategyLabel = function (strat) {
	var _p22 = strat;
	switch (_p22.ctor) {
		case 'ONone':
			return 'false';
		case 'OParity':
			return 'parity';
		default:
			return 'greedy';
	}
};
var _gicentre$elm_vega$VegaLite$opLabel = function (op) {
	var _p23 = op;
	switch (_p23.ctor) {
		case 'ArgMax':
			return 'argmax';
		case 'ArgMin':
			return 'argmin';
		case 'Average':
			return 'average';
		case 'Count':
			return 'count';
		case 'CI0':
			return 'ci0';
		case 'CI1':
			return 'ci1';
		case 'Distinct':
			return 'distinct';
		case 'Max':
			return 'max';
		case 'Mean':
			return 'mean';
		case 'Median':
			return 'median';
		case 'Min':
			return 'min';
		case 'Missing':
			return 'missing';
		case 'Q1':
			return 'q1';
		case 'Q3':
			return 'q3';
		case 'Stdev':
			return 'stdev';
		case 'StdevP':
			return 'stdevp';
		case 'Sum':
			return 'sum';
		case 'Stderr':
			return 'stderr';
		case 'Valid':
			return 'valid';
		case 'Variance':
			return 'variance';
		default:
			return 'variancep';
	}
};
var _gicentre$elm_vega$VegaLite$nice = function (ni) {
	var _p24 = ni;
	switch (_p24.ctor) {
		case 'NMillisecond':
			return _elm_lang$core$Json_Encode$string('millisecond');
		case 'NSecond':
			return _elm_lang$core$Json_Encode$string('second');
		case 'NMinute':
			return _elm_lang$core$Json_Encode$string('minute');
		case 'NHour':
			return _elm_lang$core$Json_Encode$string('hour');
		case 'NDay':
			return _elm_lang$core$Json_Encode$string('day');
		case 'NWeek':
			return _elm_lang$core$Json_Encode$string('week');
		case 'NMonth':
			return _elm_lang$core$Json_Encode$string('month');
		case 'NYear':
			return _elm_lang$core$Json_Encode$string('year');
		case 'NInterval':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'interval',
						_1: _elm_lang$core$Json_Encode$string(
							_gicentre$elm_vega$VegaLite$timeUnitLabel(_p24._0))
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'step',
							_1: _elm_lang$core$Json_Encode$int(_p24._1)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'IsNice':
			return _elm_lang$core$Json_Encode$bool(_p24._0);
		default:
			return _elm_lang$core$Json_Encode$int(_p24._0);
	}
};
var _gicentre$elm_vega$VegaLite$monthLabel = function (mon) {
	var _p25 = mon;
	switch (_p25.ctor) {
		case 'Jan':
			return 'Jan';
		case 'Feb':
			return 'Feb';
		case 'Mar':
			return 'Mar';
		case 'Apr':
			return 'Apr';
		case 'May':
			return 'May';
		case 'Jun':
			return 'Jun';
		case 'Jul':
			return 'Jul';
		case 'Aug':
			return 'Aug';
		case 'Sep':
			return 'Sep';
		case 'Oct':
			return 'Oct';
		case 'Nov':
			return 'Nov';
		default:
			return 'Dec';
	}
};
var _gicentre$elm_vega$VegaLite$measurementLabel = function (mType) {
	var _p26 = mType;
	switch (_p26.ctor) {
		case 'Nominal':
			return 'nominal';
		case 'Ordinal':
			return 'ordinal';
		case 'Quantitative':
			return 'quantitative';
		default:
			return 'temporal';
	}
};
var _gicentre$elm_vega$VegaLite$markOrientLabel = function (orient) {
	var _p27 = orient;
	if (_p27.ctor === 'Horizontal') {
		return 'horizontal';
	} else {
		return 'vertical';
	}
};
var _gicentre$elm_vega$VegaLite$markLabel = function (mark) {
	var _p28 = mark;
	switch (_p28.ctor) {
		case 'Area':
			return 'area';
		case 'Bar':
			return 'bar';
		case 'Circle':
			return 'circle';
		case 'Line':
			return 'line';
		case 'Point':
			return 'point';
		case 'Rect':
			return 'rect';
		case 'Rule':
			return 'rule';
		case 'Square':
			return 'square';
		case 'Text':
			return 'text';
		default:
			return 'tick';
	}
};
var _gicentre$elm_vega$VegaLite$markInterpolationLabel = function (interp) {
	var _p29 = interp;
	switch (_p29.ctor) {
		case 'Linear':
			return 'linear';
		case 'LinearClosed':
			return 'linear-closed';
		case 'Stepwise':
			return 'step';
		case 'StepBefore':
			return 'step-before';
		case 'StepAfter':
			return 'step-after';
		case 'Basis':
			return 'basis';
		case 'BasisOpen':
			return 'basis-open';
		case 'BasisClosed':
			return 'basis-closed';
		case 'Cardinal':
			return 'cardinal';
		case 'CardinalOpen':
			return 'cardinal-open';
		case 'CardinalClosed':
			return 'cardinal-closed';
		case 'Bundle':
			return 'bundle';
		default:
			return 'monotone';
	}
};
var _gicentre$elm_vega$VegaLite$legendOrientLabel = function (orient) {
	var _p30 = orient;
	switch (_p30.ctor) {
		case 'Left':
			return 'left';
		case 'BottomLeft':
			return 'bottom-left';
		case 'BottomRight':
			return 'bottom-right';
		case 'Right':
			return 'right';
		case 'TopLeft':
			return 'top-left';
		case 'TopRight':
			return 'top-right';
		default:
			return 'none';
	}
};
var _gicentre$elm_vega$VegaLite$interpolateProperty = function (iType) {
	var _p31 = iType;
	switch (_p31.ctor) {
		case 'Rgb':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('rgb')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'gamma',
							_1: _elm_lang$core$Json_Encode$float(_p31._0)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'Hsl':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('hsl')
					},
					_1: {ctor: '[]'}
				});
		case 'HslLong':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('hsl-long')
					},
					_1: {ctor: '[]'}
				});
		case 'Lab':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('lab')
					},
					_1: {ctor: '[]'}
				});
		case 'Hcl':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('hcl')
					},
					_1: {ctor: '[]'}
				});
		case 'HclLong':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('hcl-long')
					},
					_1: {ctor: '[]'}
				});
		case 'CubeHelix':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('cubehelix')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'gamma',
							_1: _elm_lang$core$Json_Encode$float(_p31._0)
						},
						_1: {ctor: '[]'}
					}
				});
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('cubehelix-long')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'gamma',
							_1: _elm_lang$core$Json_Encode$float(_p31._0)
						},
						_1: {ctor: '[]'}
					}
				});
	}
};
var _gicentre$elm_vega$VegaLite$inputProperty = function (prop) {
	var _p32 = prop;
	switch (_p32.ctor) {
		case 'InMin':
			return {
				ctor: '_Tuple2',
				_0: 'min',
				_1: _elm_lang$core$Json_Encode$float(_p32._0)
			};
		case 'InMax':
			return {
				ctor: '_Tuple2',
				_0: 'max',
				_1: _elm_lang$core$Json_Encode$float(_p32._0)
			};
		case 'InStep':
			return {
				ctor: '_Tuple2',
				_0: 'step',
				_1: _elm_lang$core$Json_Encode$float(_p32._0)
			};
		case 'Debounce':
			return {
				ctor: '_Tuple2',
				_0: 'debounce',
				_1: _elm_lang$core$Json_Encode$float(_p32._0)
			};
		case 'InName':
			return {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(_p32._0)
			};
		case 'InOptions':
			return {
				ctor: '_Tuple2',
				_0: 'options',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p32._0))
			};
		case 'InPlaceholder':
			return {
				ctor: '_Tuple2',
				_0: 'placeholder',
				_1: _elm_lang$core$Json_Encode$string(_p32._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'element',
				_1: _elm_lang$core$Json_Encode$string(_p32._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$hAlignLabel = function (align) {
	var _p33 = align;
	switch (_p33.ctor) {
		case 'AlignLeft':
			return 'left';
		case 'AlignCenter':
			return 'center';
		default:
			return 'right';
	}
};
var _gicentre$elm_vega$VegaLite$foDataType = function (dType) {
	var _p34 = dType;
	switch (_p34.ctor) {
		case 'FoNumber':
			return _elm_lang$core$Json_Encode$string('number');
		case 'FoBoolean':
			return _elm_lang$core$Json_Encode$string('boolean');
		case 'FoDate':
			var _p35 = _p34._0;
			return _elm_lang$core$Native_Utils.eq(_p35, '') ? _elm_lang$core$Json_Encode$string('date') : _elm_lang$core$Json_Encode$string(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'date:\'',
					A2(_elm_lang$core$Basics_ops['++'], _p35, '\'')));
		default:
			var _p36 = _p34._0;
			return _elm_lang$core$Native_Utils.eq(_p36, '') ? _elm_lang$core$Json_Encode$string('utc') : _elm_lang$core$Json_Encode$string(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'utc:\'',
					A2(_elm_lang$core$Basics_ops['++'], _p36, '\'')));
	}
};
var _gicentre$elm_vega$VegaLite$format = function (fmt) {
	var _p37 = fmt;
	switch (_p37.ctor) {
		case 'JSON':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('json')
				},
				_1: {ctor: '[]'}
			};
		case 'CSV':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('csv')
				},
				_1: {ctor: '[]'}
			};
		case 'TSV':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('tsv')
				},
				_1: {ctor: '[]'}
			};
		case 'TopojsonFeature':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('json')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'feature',
						_1: _elm_lang$core$Json_Encode$string(_p37._0)
					},
					_1: {ctor: '[]'}
				}
			};
		case 'TopojsonMesh':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('json')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'mesh',
						_1: _elm_lang$core$Json_Encode$string(_p37._0)
					},
					_1: {ctor: '[]'}
				}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'parse',
					_1: _elm_lang$core$Json_Encode$object(
						A2(
							_elm_lang$core$List$map,
							function (_p38) {
								var _p39 = _p38;
								return {
									ctor: '_Tuple2',
									_0: _p39._0,
									_1: _gicentre$elm_vega$VegaLite$foDataType(_p39._1)
								};
							},
							_p37._0))
				},
				_1: {ctor: '[]'}
			};
	}
};
var _gicentre$elm_vega$VegaLite$fontWeight = function (w) {
	var _p40 = w;
	switch (_p40.ctor) {
		case 'Normal':
			return _elm_lang$core$Json_Encode$string('normal');
		case 'Bold':
			return _elm_lang$core$Json_Encode$string('bold');
		case 'Bolder':
			return _elm_lang$core$Json_Encode$string('bolder');
		case 'Lighter':
			return _elm_lang$core$Json_Encode$string('lighter');
		case 'W100':
			return _elm_lang$core$Json_Encode$float(100);
		case 'W200':
			return _elm_lang$core$Json_Encode$float(200);
		case 'W300':
			return _elm_lang$core$Json_Encode$float(300);
		case 'W400':
			return _elm_lang$core$Json_Encode$float(400);
		case 'W500':
			return _elm_lang$core$Json_Encode$float(500);
		case 'W600':
			return _elm_lang$core$Json_Encode$float(600);
		case 'W700':
			return _elm_lang$core$Json_Encode$float(700);
		case 'W800':
			return _elm_lang$core$Json_Encode$float(800);
		default:
			return _elm_lang$core$Json_Encode$float(900);
	}
};
var _gicentre$elm_vega$VegaLite$legendConfig = function (legendConfig) {
	var _p41 = legendConfig;
	switch (_p41.ctor) {
		case 'CornerRadius':
			return {
				ctor: '_Tuple2',
				_0: 'cornerRadius',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'FillColor':
			return {
				ctor: '_Tuple2',
				_0: 'fillColor',
				_1: _elm_lang$core$Json_Encode$string(_p41._0)
			};
		case 'Orient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$legendOrientLabel(_p41._0))
			};
		case 'Offset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'StrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'strokeColor',
				_1: _elm_lang$core$Json_Encode$string(_p41._0)
			};
		case 'LeStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p41._0))
			};
		case 'LeStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'LePadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'GradientLabelBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'gradientLabelBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p41._0))
			};
		case 'GradientLabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'gradientLabelLimit',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'GradientLabelOffset':
			return {
				ctor: '_Tuple2',
				_0: 'gradientLabelOffset',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'GradientStrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'gradientStrokeColor',
				_1: _elm_lang$core$Json_Encode$string(_p41._0)
			};
		case 'GradientStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'gradientStrokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'GradientHeight':
			return {
				ctor: '_Tuple2',
				_0: 'gradientHeight',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'GradientWidth':
			return {
				ctor: '_Tuple2',
				_0: 'gradientWidth',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'LeLabelAlign':
			return {
				ctor: '_Tuple2',
				_0: 'labelAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$hAlignLabel(_p41._0))
			};
		case 'LeLabelBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'labelBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p41._0))
			};
		case 'LeLabelColor':
			return {
				ctor: '_Tuple2',
				_0: 'labelColor',
				_1: _elm_lang$core$Json_Encode$string(_p41._0)
			};
		case 'LeLabelFont':
			return {
				ctor: '_Tuple2',
				_0: 'labelFont',
				_1: _elm_lang$core$Json_Encode$string(_p41._0)
			};
		case 'LeLabelFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'LeLabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'labelLimit',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'LeLabelOffset':
			return {
				ctor: '_Tuple2',
				_0: 'labelOffset',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'LeShortTimeLabels':
			return {
				ctor: '_Tuple2',
				_0: 'shortTimeLabels',
				_1: _elm_lang$core$Json_Encode$bool(_p41._0)
			};
		case 'EntryPadding':
			return {
				ctor: '_Tuple2',
				_0: 'entryPadding',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'SymbolColor':
			return {
				ctor: '_Tuple2',
				_0: 'symbolColor',
				_1: _elm_lang$core$Json_Encode$string(_p41._0)
			};
		case 'SymbolType':
			return {
				ctor: '_Tuple2',
				_0: 'symbolType',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$symbolLabel(_p41._0))
			};
		case 'SymbolSize':
			return {
				ctor: '_Tuple2',
				_0: 'symbolSize',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'SymbolStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'symbolStrokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'LeTitleAlign':
			return {
				ctor: '_Tuple2',
				_0: 'titleAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$hAlignLabel(_p41._0))
			};
		case 'LeTitleBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'titleBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p41._0))
			};
		case 'LeTitleColor':
			return {
				ctor: '_Tuple2',
				_0: 'titleColor',
				_1: _elm_lang$core$Json_Encode$string(_p41._0)
			};
		case 'LeTitleFont':
			return {
				ctor: '_Tuple2',
				_0: 'titleFont',
				_1: _elm_lang$core$Json_Encode$string(_p41._0)
			};
		case 'LeTitleFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		case 'LeTitleFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontWeight',
				_1: _gicentre$elm_vega$VegaLite$fontWeight(_p41._0)
			};
		case 'LeTitleLimit':
			return {
				ctor: '_Tuple2',
				_0: 'titleLimit',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _elm_lang$core$Json_Encode$float(_p41._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$markProperty = function (mProp) {
	var _p42 = mProp;
	switch (_p42.ctor) {
		case 'MFilled':
			return {
				ctor: '_Tuple2',
				_0: 'filled',
				_1: _elm_lang$core$Json_Encode$bool(_p42._0)
			};
		case 'MClip':
			return {
				ctor: '_Tuple2',
				_0: 'clip',
				_1: _elm_lang$core$Json_Encode$bool(_p42._0)
			};
		case 'MColor':
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _elm_lang$core$Json_Encode$string(_p42._0)
			};
		case 'MFill':
			return {
				ctor: '_Tuple2',
				_0: 'fill',
				_1: _elm_lang$core$Json_Encode$string(_p42._0)
			};
		case 'MStroke':
			return {
				ctor: '_Tuple2',
				_0: 'stroke',
				_1: _elm_lang$core$Json_Encode$string(_p42._0)
			};
		case 'MOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'opacity',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MFillOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'fillOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MStrokeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'strokeOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p42._0))
			};
		case 'MStrokeDashOffset':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDashOffset',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MStyle':
			return {
				ctor: '_Tuple2',
				_0: 'style',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p42._0))
			};
		case 'MInterpolate':
			return {
				ctor: '_Tuple2',
				_0: 'interpolate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$markInterpolationLabel(_p42._0))
			};
		case 'MTension':
			return {
				ctor: '_Tuple2',
				_0: 'tension',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$markOrientLabel(_p42._0))
			};
		case 'MShape':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$symbolLabel(_p42._0))
			};
		case 'MSize':
			return {
				ctor: '_Tuple2',
				_0: 'size',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MAngle':
			return {
				ctor: '_Tuple2',
				_0: 'angle',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MAlign':
			return {
				ctor: '_Tuple2',
				_0: 'align',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$hAlignLabel(_p42._0))
			};
		case 'MBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'baseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p42._0))
			};
		case 'MdX':
			return {
				ctor: '_Tuple2',
				_0: 'dx',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MdY':
			return {
				ctor: '_Tuple2',
				_0: 'dy',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MFont':
			return {
				ctor: '_Tuple2',
				_0: 'font',
				_1: _elm_lang$core$Json_Encode$string(_p42._0)
			};
		case 'MFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'fontSize',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MFontStyle':
			return {
				ctor: '_Tuple2',
				_0: 'fontStyle',
				_1: _elm_lang$core$Json_Encode$string(_p42._0)
			};
		case 'MFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'fontWeight',
				_1: _gicentre$elm_vega$VegaLite$fontWeight(_p42._0)
			};
		case 'MRadius':
			return {
				ctor: '_Tuple2',
				_0: 'radius',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MText':
			return {
				ctor: '_Tuple2',
				_0: 'text',
				_1: _elm_lang$core$Json_Encode$string(_p42._0)
			};
		case 'MTheta':
			return {
				ctor: '_Tuple2',
				_0: 'theta',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MBinSpacing':
			return {
				ctor: '_Tuple2',
				_0: 'binSpacing',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MContinuousBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'continuousBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MDiscreteBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'discreteBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		case 'MShortTimeLabels':
			return {
				ctor: '_Tuple2',
				_0: 'shortTimeLabels',
				_1: _elm_lang$core$Json_Encode$bool(_p42._0)
			};
		case 'MBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'bandSize',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'thickness',
				_1: _elm_lang$core$Json_Encode$float(_p42._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$headerProperty = function (hProp) {
	var _p43 = hProp;
	if (_p43.ctor === 'HFormat') {
		return {
			ctor: '_Tuple2',
			_0: 'format',
			_1: _elm_lang$core$Json_Encode$string(_p43._0)
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'title',
			_1: _elm_lang$core$Json_Encode$string(_p43._0)
		};
	}
};
var _gicentre$elm_vega$VegaLite$fieldTitleLabel = function (ftp) {
	var _p44 = ftp;
	switch (_p44.ctor) {
		case 'Verbal':
			return 'verbal';
		case 'Function':
			return 'function';
		default:
			return 'plain';
	}
};
var _gicentre$elm_vega$VegaLite$dayLabel = function (day) {
	var _p45 = day;
	switch (_p45.ctor) {
		case 'Mon':
			return 'Mon';
		case 'Tue':
			return 'Tue';
		case 'Wed':
			return 'Wed';
		case 'Thu':
			return 'Thu';
		case 'Fri':
			return 'Fri';
		case 'Sat':
			return 'Sat';
		default:
			return 'Sun';
	}
};
var _gicentre$elm_vega$VegaLite$dateTimeProperty = function (dt) {
	var _p46 = dt;
	switch (_p46.ctor) {
		case 'DTYear':
			return {
				ctor: '_Tuple2',
				_0: 'year',
				_1: _elm_lang$core$Json_Encode$int(_p46._0)
			};
		case 'DTQuarter':
			return {
				ctor: '_Tuple2',
				_0: 'quarter',
				_1: _elm_lang$core$Json_Encode$int(_p46._0)
			};
		case 'DTMonth':
			return {
				ctor: '_Tuple2',
				_0: 'month',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$monthLabel(_p46._0))
			};
		case 'DTDate':
			return {
				ctor: '_Tuple2',
				_0: 'date',
				_1: _elm_lang$core$Json_Encode$int(_p46._0)
			};
		case 'DTDay':
			return {
				ctor: '_Tuple2',
				_0: 'day',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$dayLabel(_p46._0))
			};
		case 'DTHours':
			return {
				ctor: '_Tuple2',
				_0: 'hours',
				_1: _elm_lang$core$Json_Encode$int(_p46._0)
			};
		case 'DTMinutes':
			return {
				ctor: '_Tuple2',
				_0: 'minutes',
				_1: _elm_lang$core$Json_Encode$int(_p46._0)
			};
		case 'DTSeconds':
			return {
				ctor: '_Tuple2',
				_0: 'seconds',
				_1: _elm_lang$core$Json_Encode$int(_p46._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'milliseconds',
				_1: _elm_lang$core$Json_Encode$int(_p46._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$datavalue = function (val) {
	var _p47 = val;
	switch (_p47.ctor) {
		case 'Number':
			return _elm_lang$core$Json_Encode$float(_p47._0);
		case 'Str':
			return _elm_lang$core$Json_Encode$string(_p47._0);
		case 'Boolean':
			return _elm_lang$core$Json_Encode$bool(_p47._0);
		default:
			return _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, _p47._0));
	}
};
var _gicentre$elm_vega$VegaLite$legendProperty = function (legendProp) {
	var _p48 = legendProp;
	switch (_p48.ctor) {
		case 'LType':
			var _p49 = _p48._0;
			if (_p49.ctor === 'Gradient') {
				return {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('gradient')
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('symbol')
				};
			}
		case 'LEntryPadding':
			return {
				ctor: '_Tuple2',
				_0: 'entryPadding',
				_1: _elm_lang$core$Json_Encode$float(_p48._0)
			};
		case 'LFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$string(_p48._0)
			};
		case 'LOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p48._0)
			};
		case 'LOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$legendOrientLabel(_p48._0))
			};
		case 'LPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _elm_lang$core$Json_Encode$float(_p48._0)
			};
		case 'LTickCount':
			return {
				ctor: '_Tuple2',
				_0: 'tickCount',
				_1: _elm_lang$core$Json_Encode$float(_p48._0)
			};
		case 'LTitle':
			var _p50 = _p48._0;
			return _elm_lang$core$Native_Utils.eq(_p50, '') ? {ctor: '_Tuple2', _0: 'title', _1: _elm_lang$core$Json_Encode$null} : {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$string(_p50)
			};
		case 'LValues':
			var list = function () {
				var _p51 = _p48._0;
				switch (_p51.ctor) {
					case 'LNumbers':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p51._0));
					case 'LDateTimes':
						return _elm_lang$core$Json_Encode$list(
							A2(
								_elm_lang$core$List$map,
								function (dt) {
									return _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, dt));
								},
								_p51._0));
					default:
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p51._0));
				}
			}();
			return {ctor: '_Tuple2', _0: 'values', _1: list};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _elm_lang$core$Json_Encode$int(_p48._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$scaleDomainProperty = function (sdType) {
	var _p52 = sdType;
	switch (_p52.ctor) {
		case 'DNumbers':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p52._0));
		case 'DDateTimes':
			return _elm_lang$core$Json_Encode$list(
				A2(
					_elm_lang$core$List$map,
					function (dt) {
						return _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, dt));
					},
					_p52._0));
		case 'DStrings':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p52._0));
		case 'DSelection':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'selection',
						_1: _elm_lang$core$Json_Encode$string(_p52._0)
					},
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$string('unaggregated');
	}
};
var _gicentre$elm_vega$VegaLite$scaleProperty = function (scaleProp) {
	var _p53 = scaleProp;
	switch (_p53.ctor) {
		case 'SType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$scaleLabel(_p53._0))
			};
		case 'SDomain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _gicentre$elm_vega$VegaLite$scaleDomainProperty(_p53._0)
			};
		case 'SRange':
			var _p54 = _p53._0;
			switch (_p54.ctor) {
				case 'RNumbers':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p54._0))
					};
				case 'RStrings':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p54._0))
					};
				default:
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string(_p54._0)
					};
			}
		case 'SScheme':
			return A2(_gicentre$elm_vega$VegaLite$scheme, _p53._0, _p53._1);
		case 'SPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _elm_lang$core$Json_Encode$float(_p53._0)
			};
		case 'SPaddingInner':
			return {
				ctor: '_Tuple2',
				_0: 'paddingInner',
				_1: _elm_lang$core$Json_Encode$float(_p53._0)
			};
		case 'SPaddingOuter':
			return {
				ctor: '_Tuple2',
				_0: 'paddingOuter',
				_1: _elm_lang$core$Json_Encode$float(_p53._0)
			};
		case 'SRangeStep':
			var _p55 = _p53._0;
			if (_p55.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'rangeStep',
					_1: _elm_lang$core$Json_Encode$float(_p55._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'rangeStep', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'SRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _elm_lang$core$Json_Encode$bool(_p53._0)
			};
		case 'SClamp':
			return {
				ctor: '_Tuple2',
				_0: 'clamp',
				_1: _elm_lang$core$Json_Encode$bool(_p53._0)
			};
		case 'SInterpolate':
			return {
				ctor: '_Tuple2',
				_0: 'interpolate',
				_1: _gicentre$elm_vega$VegaLite$interpolateProperty(_p53._0)
			};
		case 'SNice':
			return {
				ctor: '_Tuple2',
				_0: 'nice',
				_1: _gicentre$elm_vega$VegaLite$nice(_p53._0)
			};
		case 'SZero':
			return {
				ctor: '_Tuple2',
				_0: 'zero',
				_1: _elm_lang$core$Json_Encode$bool(_p53._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'reverse',
				_1: _elm_lang$core$Json_Encode$bool(_p53._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$channelLabel = function (ch) {
	var _p56 = ch;
	switch (_p56.ctor) {
		case 'ChX':
			return 'x';
		case 'ChY':
			return 'y';
		case 'ChX2':
			return 'x2';
		case 'ChY2':
			return 'y2';
		case 'ChColor':
			return 'color';
		case 'ChOpacity':
			return 'opacity';
		case 'ChShape':
			return 'shape';
		default:
			return 'size';
	}
};
var _gicentre$elm_vega$VegaLite$resolveProperty = function (res) {
	var _p57 = res;
	switch (_p57.ctor) {
		case 'RAxis':
			return {
				ctor: '_Tuple2',
				_0: 'axis',
				_1: _elm_lang$core$Json_Encode$object(
					A2(
						_elm_lang$core$List$map,
						function (_p58) {
							var _p59 = _p58;
							return {
								ctor: '_Tuple2',
								_0: _gicentre$elm_vega$VegaLite$channelLabel(_p59._0),
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$elm_vega$VegaLite$resolutionLabel(_p59._1))
							};
						},
						_p57._0))
			};
		case 'RLegend':
			return {
				ctor: '_Tuple2',
				_0: 'legend',
				_1: _elm_lang$core$Json_Encode$object(
					A2(
						_elm_lang$core$List$map,
						function (_p60) {
							var _p61 = _p60;
							return {
								ctor: '_Tuple2',
								_0: _gicentre$elm_vega$VegaLite$channelLabel(_p61._0),
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$elm_vega$VegaLite$resolutionLabel(_p61._1))
							};
						},
						_p57._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$object(
					A2(
						_elm_lang$core$List$map,
						function (_p62) {
							var _p63 = _p62;
							return {
								ctor: '_Tuple2',
								_0: _gicentre$elm_vega$VegaLite$channelLabel(_p63._0),
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$elm_vega$VegaLite$resolutionLabel(_p63._1))
							};
						},
						_p57._0))
			};
	}
};
var _gicentre$elm_vega$VegaLite$binding = function (bnd) {
	var _p64 = bnd;
	switch (_p64.ctor) {
		case 'IRange':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('range')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'ICheckbox':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('checkbox')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'IRadio':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('radio')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'ISelect':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('select')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'IText':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('text')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'INumber':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('number')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'IDate':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('date')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'ITime':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('time')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'IMonth':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('month')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'IWeek':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('week')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'IDateTimeLocal':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('datetimelocal')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		case 'ITel':
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('tel')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: _p64._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('color')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p64._1)
					})
			};
	}
};
var _gicentre$elm_vega$VegaLite$selectionProperty = function (selProp) {
	var _p65 = selProp;
	switch (_p65.ctor) {
		case 'Fields':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p65._0))
			};
		case 'Encodings':
			return {
				ctor: '_Tuple2',
				_0: 'encodings',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						function (_p66) {
							return _elm_lang$core$Json_Encode$string(
								_gicentre$elm_vega$VegaLite$channelLabel(_p66));
						},
						_p65._0))
			};
		case 'On':
			return {
				ctor: '_Tuple2',
				_0: 'on',
				_1: _elm_lang$core$Json_Encode$string(_p65._0)
			};
		case 'Empty':
			return {
				ctor: '_Tuple2',
				_0: 'empty',
				_1: _elm_lang$core$Json_Encode$string('none')
			};
		case 'ResolveSelections':
			return {
				ctor: '_Tuple2',
				_0: 'resolve',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$selectionResolutionLabel(_p65._0))
			};
		case 'SelectionMark':
			return {
				ctor: '_Tuple2',
				_0: 'mark',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$selectionMarkProperty, _p65._0))
			};
		case 'BindScales':
			return {
				ctor: '_Tuple2',
				_0: 'bind',
				_1: _elm_lang$core$Json_Encode$string('scales')
			};
		case 'Bind':
			return {
				ctor: '_Tuple2',
				_0: 'bind',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$binding, _p65._0))
			};
		case 'Nearest':
			return {
				ctor: '_Tuple2',
				_0: 'nearest',
				_1: _elm_lang$core$Json_Encode$bool(_p65._0)
			};
		case 'Toggle':
			return {
				ctor: '_Tuple2',
				_0: 'toggle',
				_1: _elm_lang$core$Json_Encode$string(_p65._0)
			};
		case 'Translate':
			var _p67 = _p65._0;
			return _elm_lang$core$Native_Utils.eq(_p67, '') ? {
				ctor: '_Tuple2',
				_0: 'translate',
				_1: _elm_lang$core$Json_Encode$bool(false)
			} : {
				ctor: '_Tuple2',
				_0: 'translate',
				_1: _elm_lang$core$Json_Encode$string(_p67)
			};
		default:
			var _p68 = _p65._0;
			return _elm_lang$core$Native_Utils.eq(_p68, '') ? {
				ctor: '_Tuple2',
				_0: 'zoom',
				_1: _elm_lang$core$Json_Encode$bool(false)
			} : {
				ctor: '_Tuple2',
				_0: 'zoom',
				_1: _elm_lang$core$Json_Encode$string(_p68)
			};
	}
};
var _gicentre$elm_vega$VegaLite$binProperty = function (binProp) {
	var _p69 = binProp;
	switch (_p69.ctor) {
		case 'MaxBins':
			return {
				ctor: '_Tuple2',
				_0: 'maxbins',
				_1: _elm_lang$core$Json_Encode$int(_p69._0)
			};
		case 'Base':
			return {
				ctor: '_Tuple2',
				_0: 'base',
				_1: _elm_lang$core$Json_Encode$float(_p69._0)
			};
		case 'Step':
			return {
				ctor: '_Tuple2',
				_0: 'step',
				_1: _elm_lang$core$Json_Encode$float(_p69._0)
			};
		case 'Steps':
			return {
				ctor: '_Tuple2',
				_0: 'steps',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p69._0))
			};
		case 'MinStep':
			return {
				ctor: '_Tuple2',
				_0: 'minstep',
				_1: _elm_lang$core$Json_Encode$float(_p69._0)
			};
		case 'Divide':
			return {
				ctor: '_Tuple2',
				_0: 'divide',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$float(_p69._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$float(_p69._1),
							_1: {ctor: '[]'}
						}
					})
			};
		case 'Extent':
			return {
				ctor: '_Tuple2',
				_0: 'extent',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$float(_p69._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$float(_p69._1),
							_1: {ctor: '[]'}
						}
					})
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'nice',
				_1: _elm_lang$core$Json_Encode$bool(_p69._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$axisProperty = function (axisProp) {
	var _p70 = axisProp;
	switch (_p70.ctor) {
		case 'AxFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$string(_p70._0)
			};
		case 'AxLabels':
			return {
				ctor: '_Tuple2',
				_0: 'labels',
				_1: _elm_lang$core$Json_Encode$bool(_p70._0)
			};
		case 'AxLabelAngle':
			return {
				ctor: '_Tuple2',
				_0: 'labelAngle',
				_1: _elm_lang$core$Json_Encode$float(_p70._0)
			};
		case 'AxLabelOverlap':
			return {
				ctor: '_Tuple2',
				_0: 'labelOverlap',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$overlapStrategyLabel(_p70._0))
			};
		case 'AxLabelPadding':
			return {
				ctor: '_Tuple2',
				_0: 'labelPadding',
				_1: _elm_lang$core$Json_Encode$float(_p70._0)
			};
		case 'AxDomain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _elm_lang$core$Json_Encode$bool(_p70._0)
			};
		case 'AxGrid':
			return {
				ctor: '_Tuple2',
				_0: 'grid',
				_1: _elm_lang$core$Json_Encode$bool(_p70._0)
			};
		case 'AxMaxExtent':
			return {
				ctor: '_Tuple2',
				_0: 'maxExtent',
				_1: _elm_lang$core$Json_Encode$float(_p70._0)
			};
		case 'AxMinExtent':
			return {
				ctor: '_Tuple2',
				_0: 'minExtent',
				_1: _elm_lang$core$Json_Encode$float(_p70._0)
			};
		case 'AxOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$sideLabel(_p70._0))
			};
		case 'AxOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p70._0)
			};
		case 'AxPosition':
			return {
				ctor: '_Tuple2',
				_0: 'position',
				_1: _elm_lang$core$Json_Encode$float(_p70._0)
			};
		case 'AxZIndex':
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _elm_lang$core$Json_Encode$int(_p70._0)
			};
		case 'AxTicks':
			return {
				ctor: '_Tuple2',
				_0: 'ticks',
				_1: _elm_lang$core$Json_Encode$bool(_p70._0)
			};
		case 'AxTickCount':
			return {
				ctor: '_Tuple2',
				_0: 'tickCount',
				_1: _elm_lang$core$Json_Encode$int(_p70._0)
			};
		case 'AxTickSize':
			return {
				ctor: '_Tuple2',
				_0: 'tickSize',
				_1: _elm_lang$core$Json_Encode$float(_p70._0)
			};
		case 'AxValues':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p70._0))
			};
		case 'AxTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$string(_p70._0)
			};
		case 'AxTitleAlign':
			return {
				ctor: '_Tuple2',
				_0: 'titleAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$hAlignLabel(_p70._0))
			};
		case 'AxTitleAngle':
			return {
				ctor: '_Tuple2',
				_0: 'titleAngle',
				_1: _elm_lang$core$Json_Encode$float(_p70._0)
			};
		case 'AxTitleMaxLength':
			return {
				ctor: '_Tuple2',
				_0: 'titleMaxLength',
				_1: _elm_lang$core$Json_Encode$float(_p70._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _elm_lang$core$Json_Encode$float(_p70._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$axisConfig = function (axisCfg) {
	var _p71 = axisCfg;
	switch (_p71.ctor) {
		case 'BandPosition':
			return {
				ctor: '_Tuple2',
				_0: 'bandPosition',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'Domain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _elm_lang$core$Json_Encode$bool(_p71._0)
			};
		case 'DomainColor':
			return {
				ctor: '_Tuple2',
				_0: 'domainColor',
				_1: _elm_lang$core$Json_Encode$string(_p71._0)
			};
		case 'DomainWidth':
			return {
				ctor: '_Tuple2',
				_0: 'domainWidth',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'MaxExtent':
			return {
				ctor: '_Tuple2',
				_0: 'maxExtent',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'MinExtent':
			return {
				ctor: '_Tuple2',
				_0: 'minExtent',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'Grid':
			return {
				ctor: '_Tuple2',
				_0: 'grid',
				_1: _elm_lang$core$Json_Encode$bool(_p71._0)
			};
		case 'GridColor':
			return {
				ctor: '_Tuple2',
				_0: 'gridColor',
				_1: _elm_lang$core$Json_Encode$string(_p71._0)
			};
		case 'GridDash':
			return {
				ctor: '_Tuple2',
				_0: 'gridDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p71._0))
			};
		case 'GridOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'gridOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'GridWidth':
			return {
				ctor: '_Tuple2',
				_0: 'gridWidth',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'Labels':
			return {
				ctor: '_Tuple2',
				_0: 'labels',
				_1: _elm_lang$core$Json_Encode$bool(_p71._0)
			};
		case 'LabelAngle':
			return {
				ctor: '_Tuple2',
				_0: 'labelAngle',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'LabelColor':
			return {
				ctor: '_Tuple2',
				_0: 'labelColor',
				_1: _elm_lang$core$Json_Encode$string(_p71._0)
			};
		case 'LabelFont':
			return {
				ctor: '_Tuple2',
				_0: 'labelFont',
				_1: _elm_lang$core$Json_Encode$string(_p71._0)
			};
		case 'LabelFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'LabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'labelLimit',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'LabelOverlap':
			return {
				ctor: '_Tuple2',
				_0: 'labelOverlap',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$overlapStrategyLabel(_p71._0))
			};
		case 'LabelPadding':
			return {
				ctor: '_Tuple2',
				_0: 'labelPadding',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'ShortTimeLabels':
			return {
				ctor: '_Tuple2',
				_0: 'shortTimeLabels',
				_1: _elm_lang$core$Json_Encode$bool(_p71._0)
			};
		case 'Ticks':
			return {
				ctor: '_Tuple2',
				_0: 'ticks',
				_1: _elm_lang$core$Json_Encode$bool(_p71._0)
			};
		case 'TickColor':
			return {
				ctor: '_Tuple2',
				_0: 'tickColor',
				_1: _elm_lang$core$Json_Encode$string(_p71._0)
			};
		case 'TickRound':
			return {
				ctor: '_Tuple2',
				_0: 'tickRound',
				_1: _elm_lang$core$Json_Encode$bool(_p71._0)
			};
		case 'TickSize':
			return {
				ctor: '_Tuple2',
				_0: 'tickSize',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'TickWidth':
			return {
				ctor: '_Tuple2',
				_0: 'tickWidth',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'TitleAlign':
			return {
				ctor: '_Tuple2',
				_0: 'titleAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$hAlignLabel(_p71._0))
			};
		case 'TitleAngle':
			return {
				ctor: '_Tuple2',
				_0: 'titleAngle',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'TitleBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'titleBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p71._0))
			};
		case 'TitleColor':
			return {
				ctor: '_Tuple2',
				_0: 'titleColor',
				_1: _elm_lang$core$Json_Encode$string(_p71._0)
			};
		case 'TitleFont':
			return {
				ctor: '_Tuple2',
				_0: 'titleFont',
				_1: _elm_lang$core$Json_Encode$string(_p71._0)
			};
		case 'TitleFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontWeight',
				_1: _gicentre$elm_vega$VegaLite$fontWeight(_p71._0)
			};
		case 'TitleFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'TitleLimit':
			return {
				ctor: '_Tuple2',
				_0: 'titleLimit',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'TitleMaxLength':
			return {
				ctor: '_Tuple2',
				_0: 'titleMaxLength',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'TitlePadding':
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		case 'TitleX':
			return {
				ctor: '_Tuple2',
				_0: 'titleX',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'titleY',
				_1: _elm_lang$core$Json_Encode$float(_p71._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$autosizeProperty = function (asCfg) {
	var _p72 = asCfg;
	switch (_p72.ctor) {
		case 'APad':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string('pad')
			};
		case 'AFit':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string('fit')
			};
		case 'ANone':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string('none')
			};
		case 'AResize':
			return {
				ctor: '_Tuple2',
				_0: 'resize',
				_1: _elm_lang$core$Json_Encode$bool(true)
			};
		case 'AContent':
			return {
				ctor: '_Tuple2',
				_0: 'contains',
				_1: _elm_lang$core$Json_Encode$string('content')
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'contains',
				_1: _elm_lang$core$Json_Encode$string('padding')
			};
	}
};
var _gicentre$elm_vega$VegaLite$arrangementLabel = function (arrng) {
	var _p73 = arrng;
	if (_p73.ctor === 'Row') {
		return 'row';
	} else {
		return 'column';
	}
};
var _gicentre$elm_vega$VegaLite$sortProperty = function (sp) {
	var _p74 = sp;
	switch (_p74.ctor) {
		case 'Ascending':
			return {
				ctor: '_Tuple2',
				_0: 'order',
				_1: _elm_lang$core$Json_Encode$string('ascending')
			};
		case 'Descending':
			return {
				ctor: '_Tuple2',
				_0: 'order',
				_1: _elm_lang$core$Json_Encode$string('descending')
			};
		case 'ByField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p74._0)
			};
		case 'Op':
			return {
				ctor: '_Tuple2',
				_0: 'op',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$opLabel(_p74._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'repeat',
							_1: _elm_lang$core$Json_Encode$string(
								_gicentre$elm_vega$VegaLite$arrangementLabel(_p74._0))
						},
						_1: {ctor: '[]'}
					})
			};
	}
};
var _gicentre$elm_vega$VegaLite$anchorLabel = function (an) {
	var _p75 = an;
	switch (_p75.ctor) {
		case 'AStart':
			return 'start';
		case 'AMiddle':
			return 'middle';
		default:
			return 'end';
	}
};
var _gicentre$elm_vega$VegaLite$titleConfig = function (titleCfg) {
	var _p76 = titleCfg;
	switch (_p76.ctor) {
		case 'TAnchor':
			return {
				ctor: '_Tuple2',
				_0: 'anchor',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$anchorLabel(_p76._0))
			};
		case 'TAngle':
			return {
				ctor: '_Tuple2',
				_0: 'angle',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'TBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'baseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p76._0))
			};
		case 'TColor':
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _elm_lang$core$Json_Encode$string(_p76._0)
			};
		case 'TFont':
			return {
				ctor: '_Tuple2',
				_0: 'font',
				_1: _elm_lang$core$Json_Encode$string(_p76._0)
			};
		case 'TFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'fontSize',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'TFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'fontWeight',
				_1: _gicentre$elm_vega$VegaLite$fontWeight(_p76._0)
			};
		case 'TLimit':
			return {
				ctor: '_Tuple2',
				_0: 'limit',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'TOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$sideLabel(_p76._0))
			};
	}
};
var _gicentre$elm_vega$VegaLite$configProperty = function (configProp) {
	var _p77 = configProp;
	switch (_p77.ctor) {
		case 'Background':
			return {
				ctor: '_Tuple2',
				_0: 'background',
				_1: _elm_lang$core$Json_Encode$string(_p77._0)
			};
		case 'CountTitle':
			return {
				ctor: '_Tuple2',
				_0: 'countTitle',
				_1: _elm_lang$core$Json_Encode$string(_p77._0)
			};
		case 'FieldTitle':
			return {
				ctor: '_Tuple2',
				_0: 'fieldTitle',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$fieldTitleLabel(_p77._0))
			};
		case 'RemoveInvalid':
			return _p77._0 ? {
				ctor: '_Tuple2',
				_0: 'invalidValues',
				_1: _elm_lang$core$Json_Encode$string('filter')
			} : {ctor: '_Tuple2', _0: 'invalidValues', _1: _elm_lang$core$Json_Encode$null};
		case 'NumberFormat':
			return {
				ctor: '_Tuple2',
				_0: 'numberFormat',
				_1: _elm_lang$core$Json_Encode$string(_p77._0)
			};
		case 'Padding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$VegaLite$paddingProperty(_p77._0)
			};
		case 'TimeFormat':
			return {
				ctor: '_Tuple2',
				_0: 'timeFormat',
				_1: _elm_lang$core$Json_Encode$string(_p77._0)
			};
		case 'Axis':
			return {
				ctor: '_Tuple2',
				_0: 'axis',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfig, _p77._0))
			};
		case 'AxisX':
			return {
				ctor: '_Tuple2',
				_0: 'axisX',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfig, _p77._0))
			};
		case 'AxisY':
			return {
				ctor: '_Tuple2',
				_0: 'axisY',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfig, _p77._0))
			};
		case 'AxisLeft':
			return {
				ctor: '_Tuple2',
				_0: 'axisLeft',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfig, _p77._0))
			};
		case 'AxisRight':
			return {
				ctor: '_Tuple2',
				_0: 'axisRight',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfig, _p77._0))
			};
		case 'AxisTop':
			return {
				ctor: '_Tuple2',
				_0: 'axisTop',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfig, _p77._0))
			};
		case 'AxisBottom':
			return {
				ctor: '_Tuple2',
				_0: 'axisBottom',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfig, _p77._0))
			};
		case 'AxisBand':
			return {
				ctor: '_Tuple2',
				_0: 'axisBand',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfig, _p77._0))
			};
		case 'Legend':
			return {
				ctor: '_Tuple2',
				_0: 'legend',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$legendConfig, _p77._0))
			};
		case 'MarkStyle':
			return {
				ctor: '_Tuple2',
				_0: 'mark',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'AreaStyle':
			return {
				ctor: '_Tuple2',
				_0: 'area',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'BarStyle':
			return {
				ctor: '_Tuple2',
				_0: 'bar',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'CircleStyle':
			return {
				ctor: '_Tuple2',
				_0: 'circle',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'LineStyle':
			return {
				ctor: '_Tuple2',
				_0: 'line',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'PointStyle':
			return {
				ctor: '_Tuple2',
				_0: 'point',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'RectStyle':
			return {
				ctor: '_Tuple2',
				_0: 'rect',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'RuleStyle':
			return {
				ctor: '_Tuple2',
				_0: 'rule',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'SquareStyle':
			return {
				ctor: '_Tuple2',
				_0: 'square',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'TextStyle':
			return {
				ctor: '_Tuple2',
				_0: 'text',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'TickStyle':
			return {
				ctor: '_Tuple2',
				_0: 'tick',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._0))
			};
		case 'TitleStyle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$titleConfig, _p77._0))
			};
		case 'NamedStyle':
			return {
				ctor: '_Tuple2',
				_0: 'style',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _p77._0,
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p77._1))
						},
						_1: {ctor: '[]'}
					})
			};
		case 'Scale':
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$scaleConfig, _p77._0))
			};
		case 'Stack':
			return _gicentre$elm_vega$VegaLite$stackProperty(_p77._0);
		case 'Range':
			return {
				ctor: '_Tuple2',
				_0: 'range',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$rangeConfig, _p77._0))
			};
		case 'SelectionStyle':
			var selProp = function (_p78) {
				var _p79 = _p78;
				return {
					ctor: '_Tuple2',
					_0: _gicentre$elm_vega$VegaLite$selectionLabel(_p79._0),
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$selectionProperty, _p79._1))
				};
			};
			return {
				ctor: '_Tuple2',
				_0: 'selection',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, selProp, _p77._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'view',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$viewConfig, _p77._0))
			};
	}
};
var _gicentre$elm_vega$VegaLite$transpose = function (ll) {
	transpose:
	while (true) {
		var _p80 = ll;
		if (_p80.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p80._0.ctor === '[]') {
				var _v70 = _p80._1;
				ll = _v70;
				continue transpose;
			} else {
				var _p81 = _p80._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p81);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p81);
				return {
					ctor: '::',
					_0: {ctor: '::', _0: _p80._0._0, _1: heads},
					_1: _gicentre$elm_vega$VegaLite$transpose(
						{ctor: '::', _0: _p80._0._1, _1: tails})
				};
			}
		}
	}
};
var _gicentre$elm_vega$VegaLite$toVegaLite = function (spec) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: '$schema',
				_1: _elm_lang$core$Json_Encode$string('https://vega.github.io/schema/vega-lite/v2.json')
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p82) {
					var _p83 = _p82;
					return {
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$VegaLite$vlPropertyLabel(_p83._0),
						_1: _p83._1
					};
				},
				spec)
		});
};
var _gicentre$elm_vega$VegaLite$timeUnitAs = F3(
	function (tu, field, label) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(
							_gicentre$elm_vega$VegaLite$timeUnitLabel(tu)),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(field),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(label),
								_1: {ctor: '[]'}
							}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$select = F3(
	function (name, sType, options) {
		var selProps = {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$selectionLabel(sType))
			},
			_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$selectionProperty, options)
		};
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: name,
				_1: _elm_lang$core$Json_Encode$object(selProps)
			});
	});
var _gicentre$elm_vega$VegaLite$resolution = function (res) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_gicentre$elm_vega$VegaLite$resolveProperty(res));
};
var _gicentre$elm_vega$VegaLite$opAs = F3(
	function (op, field, label) {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'op',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$opLabel(op))
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'field',
						_1: _elm_lang$core$Json_Encode$string(field)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'as',
							_1: _elm_lang$core$Json_Encode$string(label)
						},
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _gicentre$elm_vega$VegaLite$lookupAs = F4(
	function (key1, _p84, key2, fields) {
		var _p85 = _p84;
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'lookup',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(key1),
						_1: {
							ctor: '::',
							_0: _p85._1,
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(key2),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$list(
										A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, fields)),
									_1: {ctor: '[]'}
								}
							}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$filter = function (f) {
	var _p86 = f;
	switch (_p86.ctor) {
		case 'FExpr':
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$string(_p86._0)
				});
		case 'FEqual':
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'field',
								_1: _elm_lang$core$Json_Encode$string(_p86._0)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'equal',
									_1: _gicentre$elm_vega$VegaLite$datavalue(_p86._1)
								},
								_1: {ctor: '[]'}
							}
						})
				});
		case 'FSelection':
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'selection',
								_1: _elm_lang$core$Json_Encode$string(_p86._0)
							},
							_1: {ctor: '[]'}
						})
				});
		case 'FRange':
			var values = function () {
				var _p87 = _p86._1;
				if (_p87.ctor === 'NumberRange') {
					return _elm_lang$core$Json_Encode$list(
						{
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$float(_p87._0),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$float(_p87._1),
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$list(
						{
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, _p87._0)),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, _p87._1)),
								_1: {ctor: '[]'}
							}
						});
				}
			}();
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'field',
								_1: _elm_lang$core$Json_Encode$string(_p86._0)
							},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'range', _1: values},
								_1: {ctor: '[]'}
							}
						})
				});
		default:
			var values = function () {
				var _p88 = _p86._1;
				switch (_p88.ctor) {
					case 'Numbers':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p88._0));
					case 'DateTimes':
						return _elm_lang$core$Json_Encode$list(
							A2(
								_elm_lang$core$List$map,
								function (dt) {
									return _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, dt));
								},
								_p88._0));
					case 'Strings':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p88._0));
					default:
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$bool, _p88._0));
				}
			}();
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'field',
								_1: _elm_lang$core$Json_Encode$string(_p86._0)
							},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'oneOf', _1: values},
								_1: {ctor: '[]'}
							}
						})
				});
	}
};
var _gicentre$elm_vega$VegaLite$dataRow = function (row) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$List$map,
				function (_p89) {
					var _p90 = _p89;
					return {
						ctor: '_Tuple2',
						_0: _p90._0,
						_1: _gicentre$elm_vega$VegaLite$datavalue(_p90._1)
					};
				},
				row)));
};
var _gicentre$elm_vega$VegaLite$dataColumn = F2(
	function (colName, data) {
		var _p91 = data;
		switch (_p91.ctor) {
			case 'Numbers':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					A2(
						_elm_lang$core$List$map,
						function (x) {
							return {
								ctor: '_Tuple2',
								_0: colName,
								_1: _elm_lang$core$Json_Encode$float(x)
							};
						},
						_p91._0));
			case 'Strings':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					A2(
						_elm_lang$core$List$map,
						function (s) {
							return {
								ctor: '_Tuple2',
								_0: colName,
								_1: _elm_lang$core$Json_Encode$string(s)
							};
						},
						_p91._0));
			case 'DateTimes':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					A2(
						_elm_lang$core$List$map,
						function (dts) {
							return {
								ctor: '_Tuple2',
								_0: colName,
								_1: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, dts))
							};
						},
						_p91._0));
			default:
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					A2(
						_elm_lang$core$List$map,
						function (b) {
							return {
								ctor: '_Tuple2',
								_0: colName,
								_1: _elm_lang$core$Json_Encode$bool(b)
							};
						},
						_p91._0));
		}
	});
var _gicentre$elm_vega$VegaLite$configuration = function (cfg) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_gicentre$elm_vega$VegaLite$configProperty(cfg));
};
var _gicentre$elm_vega$VegaLite$combineSpecs = function (specs) {
	return _elm_lang$core$Json_Encode$object(specs);
};
var _gicentre$elm_vega$VegaLite$calculateAs = F2(
	function (expr, label) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'calculate',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(expr),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(label),
							_1: {ctor: '[]'}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$binAs = F3(
	function (bProps, field, label) {
		return _elm_lang$core$Native_Utils.eq(
			bProps,
			{ctor: '[]'}) ? F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'bin',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$bool(true),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(field),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(label),
								_1: {ctor: '[]'}
							}
						}
					})
			}) : F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'bin',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$binProperty, bProps)),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(field),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(label),
								_1: {ctor: '[]'}
							}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$bin = function (bProps) {
	return _elm_lang$core$Native_Utils.eq(
		bProps,
		{ctor: '[]'}) ? {
		ctor: '_Tuple2',
		_0: 'bin',
		_1: _elm_lang$core$Json_Encode$bool(true)
	} : {
		ctor: '_Tuple2',
		_0: 'bin',
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$binProperty, bProps))
	};
};
var _gicentre$elm_vega$VegaLite$detailChannelProperty = function (field) {
	var _p92 = field;
	switch (_p92.ctor) {
		case 'DName':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p92._0)
			};
		case 'DmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$measurementLabel(_p92._0))
			};
		case 'DBin':
			return _gicentre$elm_vega$VegaLite$bin(_p92._0);
		case 'DTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$timeUnitLabel(_p92._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$opLabel(_p92._0))
			};
	}
};
var _gicentre$elm_vega$VegaLite$detail = function (detailProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'detail',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$detailChannelProperty, detailProps))
		});
};
var _gicentre$elm_vega$VegaLite$facetChannelProperty = function (fMap) {
	var _p93 = fMap;
	switch (_p93.ctor) {
		case 'FName':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p93._0)
			};
		case 'FmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$measurementLabel(_p93._0))
			};
		case 'FBin':
			return _gicentre$elm_vega$VegaLite$bin(_p93._0);
		case 'FAggregate':
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$opLabel(_p93._0))
			};
		case 'FTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$timeUnitLabel(_p93._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'header',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$headerProperty, _p93._0))
			};
	}
};
var _gicentre$elm_vega$VegaLite$column = function (fFields) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'column',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$facetChannelProperty, fFields))
		});
};
var _gicentre$elm_vega$VegaLite$row = function (fFields) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'row',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$facetChannelProperty, fFields))
		});
};
var _gicentre$elm_vega$VegaLite$facetMappingProperty = function (fMap) {
	var _p94 = fMap;
	if (_p94.ctor === 'RowBy') {
		return {
			ctor: '_Tuple2',
			_0: 'row',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$facetChannelProperty, _p94._0))
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'column',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$facetChannelProperty, _p94._0))
		};
	}
};
var _gicentre$elm_vega$VegaLite$markChannelProperty = function (field) {
	var _p95 = field;
	switch (_p95.ctor) {
		case 'MName':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$string(_p95._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MRepeat':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'repeat',
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$elm_vega$VegaLite$arrangementLabel(_p95._0))
							},
							_1: {ctor: '[]'}
						})
				},
				_1: {ctor: '[]'}
			};
		case 'MmType':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$measurementLabel(_p95._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MScale':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'scale',
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$scaleProperty, _p95._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MLegend':
			var _p96 = _p95._0;
			return _elm_lang$core$Native_Utils.eq(
				_p96,
				{ctor: '[]'}) ? {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'legend', _1: _elm_lang$core$Json_Encode$null},
				_1: {ctor: '[]'}
			} : {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'legend',
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$legendProperty, _p96))
				},
				_1: {ctor: '[]'}
			};
		case 'MBin':
			return {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bin(_p95._0),
				_1: {ctor: '[]'}
			};
		case 'MCondition':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'condition',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'selection',
								_1: _elm_lang$core$Json_Encode$string(_p95._0)
							},
							_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, _p95._1)
						})
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, _p95._2)
			};
		case 'MTimeUnit':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'timeUnit',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$timeUnitLabel(_p95._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MAggregate':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'aggregate',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$opLabel(_p95._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MPath':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$string(_p95._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MNumber':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$float(_p95._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MString':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$string(_p95._0)
				},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$bool(_p95._0)
				},
				_1: {ctor: '[]'}
			};
	}
};
var _gicentre$elm_vega$VegaLite$color = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'color',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, markProps))
		});
};
var _gicentre$elm_vega$VegaLite$opacity = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'opacity',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, markProps))
		});
};
var _gicentre$elm_vega$VegaLite$shape = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'shape',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, markProps))
		});
};
var _gicentre$elm_vega$VegaLite$size = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'size',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, markProps))
		});
};
var _gicentre$elm_vega$VegaLite$orderChannelProperty = function (oDef) {
	var _p97 = oDef;
	switch (_p97.ctor) {
		case 'OName':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p97._0)
			};
		case 'ORepeat':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'repeat',
							_1: _elm_lang$core$Json_Encode$string(
								_gicentre$elm_vega$VegaLite$arrangementLabel(_p97._0))
						},
						_1: {ctor: '[]'}
					})
			};
		case 'OmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$measurementLabel(_p97._0))
			};
		case 'OBin':
			return _gicentre$elm_vega$VegaLite$bin(_p97._0);
		case 'OAggregate':
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$opLabel(_p97._0))
			};
		case 'OTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$timeUnitLabel(_p97._0))
			};
		default:
			var _p99 = _p97._0;
			var _p98 = _p99;
			_v83_3:
			do {
				if (_p98.ctor === '[]') {
					return {ctor: '_Tuple2', _0: 'sort', _1: _elm_lang$core$Json_Encode$null};
				} else {
					if (_p98._1.ctor === '[]') {
						switch (_p98._0.ctor) {
							case 'Ascending':
								return {
									ctor: '_Tuple2',
									_0: 'sort',
									_1: _elm_lang$core$Json_Encode$string('ascending')
								};
							case 'Descending':
								return {
									ctor: '_Tuple2',
									_0: 'sort',
									_1: _elm_lang$core$Json_Encode$string('descending')
								};
							default:
								break _v83_3;
						}
					} else {
						break _v83_3;
					}
				}
			} while(false);
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$sortProperty, _p99))
			};
	}
};
var _gicentre$elm_vega$VegaLite$order = function (oDefs) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'order',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$orderChannelProperty, oDefs))
		});
};
var _gicentre$elm_vega$VegaLite$positionChannelProperty = function (pDef) {
	var _p100 = pDef;
	switch (_p100.ctor) {
		case 'PName':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p100._0)
			};
		case 'PmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$measurementLabel(_p100._0))
			};
		case 'PBin':
			return _gicentre$elm_vega$VegaLite$bin(_p100._0);
		case 'PAggregate':
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$opLabel(_p100._0))
			};
		case 'PTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$timeUnitLabel(_p100._0))
			};
		case 'PSort':
			var _p102 = _p100._0;
			var _p101 = _p102;
			_v85_3:
			do {
				if (_p101.ctor === '[]') {
					return {ctor: '_Tuple2', _0: 'sort', _1: _elm_lang$core$Json_Encode$null};
				} else {
					if (_p101._1.ctor === '[]') {
						switch (_p101._0.ctor) {
							case 'Ascending':
								return {
									ctor: '_Tuple2',
									_0: 'sort',
									_1: _elm_lang$core$Json_Encode$string('ascending')
								};
							case 'Descending':
								return {
									ctor: '_Tuple2',
									_0: 'sort',
									_1: _elm_lang$core$Json_Encode$string('descending')
								};
							default:
								break _v85_3;
						}
					} else {
						break _v85_3;
					}
				}
			} while(false);
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$sortProperty, _p102))
			};
		case 'PScale':
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$scaleProperty, _p100._0))
			};
		case 'PAxis':
			var _p103 = _p100._0;
			return _elm_lang$core$Native_Utils.eq(
				_p103,
				{ctor: '[]'}) ? {ctor: '_Tuple2', _0: 'axis', _1: _elm_lang$core$Json_Encode$null} : {
				ctor: '_Tuple2',
				_0: 'axis',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisProperty, _p103))
			};
		case 'PStack':
			return _gicentre$elm_vega$VegaLite$stackProperty(_p100._0);
		default:
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'repeat',
							_1: _elm_lang$core$Json_Encode$string(
								_gicentre$elm_vega$VegaLite$arrangementLabel(_p100._0))
						},
						_1: {ctor: '[]'}
					})
			};
	}
};
var _gicentre$elm_vega$VegaLite$position = F2(
	function (pos, pDefs) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: _gicentre$elm_vega$VegaLite$positionLabel(pos),
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$positionChannelProperty, pDefs))
			});
	});
var _gicentre$elm_vega$VegaLite$textChannelProperty = function (tDef) {
	var _p104 = tDef;
	switch (_p104.ctor) {
		case 'TName':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$string(_p104._0)
				},
				_1: {ctor: '[]'}
			};
		case 'TRepeat':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'repeat',
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$elm_vega$VegaLite$arrangementLabel(_p104._0))
							},
							_1: {ctor: '[]'}
						})
				},
				_1: {ctor: '[]'}
			};
		case 'TmType':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$measurementLabel(_p104._0))
				},
				_1: {ctor: '[]'}
			};
		case 'TBin':
			return {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bin(_p104._0),
				_1: {ctor: '[]'}
			};
		case 'TAggregate':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'aggregate',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$opLabel(_p104._0))
				},
				_1: {ctor: '[]'}
			};
		case 'TTimeUnit':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'timeUnit',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$timeUnitLabel(_p104._0))
				},
				_1: {ctor: '[]'}
			};
		case 'TFormat':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'format',
					_1: _elm_lang$core$Json_Encode$string(_p104._0)
				},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'condition',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'selection',
								_1: _elm_lang$core$Json_Encode$string(_p104._0)
							},
							_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, _p104._1)
						})
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, _p104._2)
			};
	}
};
var _gicentre$elm_vega$VegaLite$text = function (tDefs) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'text',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, tDefs))
		});
};
var _gicentre$elm_vega$VegaLite$tooltip = function (tDefs) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'tooltip',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, tDefs))
		});
};
var _gicentre$elm_vega$VegaLite$asSpec = function (specs) {
	return _elm_lang$core$Json_Encode$object(
		A2(
			_elm_lang$core$List$map,
			function (_p105) {
				var _p106 = _p105;
				return {
					ctor: '_Tuple2',
					_0: _gicentre$elm_vega$VegaLite$vlPropertyLabel(_p106._0),
					_1: _p106._1
				};
			},
			specs));
};
var _gicentre$elm_vega$VegaLite$aggregate = F2(
	function (ops, groups) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$list(ops),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, groups)),
							_1: {ctor: '[]'}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$AEnd = {ctor: 'AEnd'};
var _gicentre$elm_vega$VegaLite$AMiddle = {ctor: 'AMiddle'};
var _gicentre$elm_vega$VegaLite$AStart = {ctor: 'AStart'};
var _gicentre$elm_vega$VegaLite$Row = {ctor: 'Row'};
var _gicentre$elm_vega$VegaLite$Column = {ctor: 'Column'};
var _gicentre$elm_vega$VegaLite$AResize = {ctor: 'AResize'};
var _gicentre$elm_vega$VegaLite$APadding = {ctor: 'APadding'};
var _gicentre$elm_vega$VegaLite$APad = {ctor: 'APad'};
var _gicentre$elm_vega$VegaLite$ANone = {ctor: 'ANone'};
var _gicentre$elm_vega$VegaLite$AFit = {ctor: 'AFit'};
var _gicentre$elm_vega$VegaLite$AContent = {ctor: 'AContent'};
var _gicentre$elm_vega$VegaLite$TitleY = function (a) {
	return {ctor: 'TitleY', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleX = function (a) {
	return {ctor: 'TitleX', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitlePadding = function (a) {
	return {ctor: 'TitlePadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleMaxLength = function (a) {
	return {ctor: 'TitleMaxLength', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleLimit = function (a) {
	return {ctor: 'TitleLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleFontSize = function (a) {
	return {ctor: 'TitleFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleFontWeight = function (a) {
	return {ctor: 'TitleFontWeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleFont = function (a) {
	return {ctor: 'TitleFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleColor = function (a) {
	return {ctor: 'TitleColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleBaseline = function (a) {
	return {ctor: 'TitleBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleAngle = function (a) {
	return {ctor: 'TitleAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleAlign = function (a) {
	return {ctor: 'TitleAlign', _0: a};
};
var _gicentre$elm_vega$VegaLite$TickWidth = function (a) {
	return {ctor: 'TickWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$TickSize = function (a) {
	return {ctor: 'TickSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$TickRound = function (a) {
	return {ctor: 'TickRound', _0: a};
};
var _gicentre$elm_vega$VegaLite$TickColor = function (a) {
	return {ctor: 'TickColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$Ticks = function (a) {
	return {ctor: 'Ticks', _0: a};
};
var _gicentre$elm_vega$VegaLite$ShortTimeLabels = function (a) {
	return {ctor: 'ShortTimeLabels', _0: a};
};
var _gicentre$elm_vega$VegaLite$LabelPadding = function (a) {
	return {ctor: 'LabelPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$LabelOverlap = function (a) {
	return {ctor: 'LabelOverlap', _0: a};
};
var _gicentre$elm_vega$VegaLite$LabelLimit = function (a) {
	return {ctor: 'LabelLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$LabelFontSize = function (a) {
	return {ctor: 'LabelFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$LabelFont = function (a) {
	return {ctor: 'LabelFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$LabelColor = function (a) {
	return {ctor: 'LabelColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$LabelAngle = function (a) {
	return {ctor: 'LabelAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$Labels = function (a) {
	return {ctor: 'Labels', _0: a};
};
var _gicentre$elm_vega$VegaLite$GridWidth = function (a) {
	return {ctor: 'GridWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$GridOpacity = function (a) {
	return {ctor: 'GridOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$GridDash = function (a) {
	return {ctor: 'GridDash', _0: a};
};
var _gicentre$elm_vega$VegaLite$GridColor = function (a) {
	return {ctor: 'GridColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$Grid = function (a) {
	return {ctor: 'Grid', _0: a};
};
var _gicentre$elm_vega$VegaLite$MinExtent = function (a) {
	return {ctor: 'MinExtent', _0: a};
};
var _gicentre$elm_vega$VegaLite$MaxExtent = function (a) {
	return {ctor: 'MaxExtent', _0: a};
};
var _gicentre$elm_vega$VegaLite$DomainWidth = function (a) {
	return {ctor: 'DomainWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$DomainColor = function (a) {
	return {ctor: 'DomainColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$Domain = function (a) {
	return {ctor: 'Domain', _0: a};
};
var _gicentre$elm_vega$VegaLite$BandPosition = function (a) {
	return {ctor: 'BandPosition', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxZIndex = function (a) {
	return {ctor: 'AxZIndex', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxValues = function (a) {
	return {ctor: 'AxValues', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxTitlePadding = function (a) {
	return {ctor: 'AxTitlePadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxTitleMaxLength = function (a) {
	return {ctor: 'AxTitleMaxLength', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxTitleAngle = function (a) {
	return {ctor: 'AxTitleAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxTitleAlign = function (a) {
	return {ctor: 'AxTitleAlign', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxTitle = function (a) {
	return {ctor: 'AxTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxTickSize = function (a) {
	return {ctor: 'AxTickSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxTickCount = function (a) {
	return {ctor: 'AxTickCount', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxTicks = function (a) {
	return {ctor: 'AxTicks', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxPosition = function (a) {
	return {ctor: 'AxPosition', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxOrient = function (a) {
	return {ctor: 'AxOrient', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxOffset = function (a) {
	return {ctor: 'AxOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxMinExtent = function (a) {
	return {ctor: 'AxMinExtent', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxMaxExtent = function (a) {
	return {ctor: 'AxMaxExtent', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxLabels = function (a) {
	return {ctor: 'AxLabels', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxLabelPadding = function (a) {
	return {ctor: 'AxLabelPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxLabelOverlap = function (a) {
	return {ctor: 'AxLabelOverlap', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxLabelAngle = function (a) {
	return {ctor: 'AxLabelAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxGrid = function (a) {
	return {ctor: 'AxGrid', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxFormat = function (a) {
	return {ctor: 'AxFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxDomain = function (a) {
	return {ctor: 'AxDomain', _0: a};
};
var _gicentre$elm_vega$VegaLite$Steps = function (a) {
	return {ctor: 'Steps', _0: a};
};
var _gicentre$elm_vega$VegaLite$Step = function (a) {
	return {ctor: 'Step', _0: a};
};
var _gicentre$elm_vega$VegaLite$Nice = function (a) {
	return {ctor: 'Nice', _0: a};
};
var _gicentre$elm_vega$VegaLite$MinStep = function (a) {
	return {ctor: 'MinStep', _0: a};
};
var _gicentre$elm_vega$VegaLite$MaxBins = function (a) {
	return {ctor: 'MaxBins', _0: a};
};
var _gicentre$elm_vega$VegaLite$Extent = F2(
	function (a, b) {
		return {ctor: 'Extent', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$Divide = F2(
	function (a, b) {
		return {ctor: 'Divide', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$Base = function (a) {
	return {ctor: 'Base', _0: a};
};
var _gicentre$elm_vega$VegaLite$IColor = F2(
	function (a, b) {
		return {ctor: 'IColor', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$ITel = F2(
	function (a, b) {
		return {ctor: 'ITel', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$IDateTimeLocal = F2(
	function (a, b) {
		return {ctor: 'IDateTimeLocal', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$IWeek = F2(
	function (a, b) {
		return {ctor: 'IWeek', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$IMonth = F2(
	function (a, b) {
		return {ctor: 'IMonth', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$ITime = F2(
	function (a, b) {
		return {ctor: 'ITime', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$IDate = F2(
	function (a, b) {
		return {ctor: 'IDate', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$INumber = F2(
	function (a, b) {
		return {ctor: 'INumber', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$IText = F2(
	function (a, b) {
		return {ctor: 'IText', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$ISelect = F2(
	function (a, b) {
		return {ctor: 'ISelect', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$IRadio = F2(
	function (a, b) {
		return {ctor: 'IRadio', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$ICheckbox = F2(
	function (a, b) {
		return {ctor: 'ICheckbox', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$IRange = F2(
	function (a, b) {
		return {ctor: 'IRange', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$ChSize = {ctor: 'ChSize'};
var _gicentre$elm_vega$VegaLite$ChShape = {ctor: 'ChShape'};
var _gicentre$elm_vega$VegaLite$ChOpacity = {ctor: 'ChOpacity'};
var _gicentre$elm_vega$VegaLite$ChColor = {ctor: 'ChColor'};
var _gicentre$elm_vega$VegaLite$ChY2 = {ctor: 'ChY2'};
var _gicentre$elm_vega$VegaLite$ChX2 = {ctor: 'ChX2'};
var _gicentre$elm_vega$VegaLite$ChY = {ctor: 'ChY'};
var _gicentre$elm_vega$VegaLite$ChX = {ctor: 'ChX'};
var _gicentre$elm_vega$VegaLite$Rgb = function (a) {
	return {ctor: 'Rgb', _0: a};
};
var _gicentre$elm_vega$VegaLite$Lab = {ctor: 'Lab'};
var _gicentre$elm_vega$VegaLite$HslLong = {ctor: 'HslLong'};
var _gicentre$elm_vega$VegaLite$Hsl = {ctor: 'Hsl'};
var _gicentre$elm_vega$VegaLite$HclLong = {ctor: 'HclLong'};
var _gicentre$elm_vega$VegaLite$Hcl = {ctor: 'Hcl'};
var _gicentre$elm_vega$VegaLite$CubeHelixLong = function (a) {
	return {ctor: 'CubeHelixLong', _0: a};
};
var _gicentre$elm_vega$VegaLite$CubeHelix = function (a) {
	return {ctor: 'CubeHelix', _0: a};
};
var _gicentre$elm_vega$VegaLite$View = function (a) {
	return {ctor: 'View', _0: a};
};
var _gicentre$elm_vega$VegaLite$TimeFormat = function (a) {
	return {ctor: 'TimeFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$TitleStyle = function (a) {
	return {ctor: 'TitleStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$TickStyle = function (a) {
	return {ctor: 'TickStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$TextStyle = function (a) {
	return {ctor: 'TextStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$Stack = function (a) {
	return {ctor: 'Stack', _0: a};
};
var _gicentre$elm_vega$VegaLite$SquareStyle = function (a) {
	return {ctor: 'SquareStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$SelectionStyle = function (a) {
	return {ctor: 'SelectionStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$Scale = function (a) {
	return {ctor: 'Scale', _0: a};
};
var _gicentre$elm_vega$VegaLite$RuleStyle = function (a) {
	return {ctor: 'RuleStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$RemoveInvalid = function (a) {
	return {ctor: 'RemoveInvalid', _0: a};
};
var _gicentre$elm_vega$VegaLite$RectStyle = function (a) {
	return {ctor: 'RectStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$Range = function (a) {
	return {ctor: 'Range', _0: a};
};
var _gicentre$elm_vega$VegaLite$PointStyle = function (a) {
	return {ctor: 'PointStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$Padding = function (a) {
	return {ctor: 'Padding', _0: a};
};
var _gicentre$elm_vega$VegaLite$NumberFormat = function (a) {
	return {ctor: 'NumberFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$NamedStyle = F2(
	function (a, b) {
		return {ctor: 'NamedStyle', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$MarkStyle = function (a) {
	return {ctor: 'MarkStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$LineStyle = function (a) {
	return {ctor: 'LineStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$Legend = function (a) {
	return {ctor: 'Legend', _0: a};
};
var _gicentre$elm_vega$VegaLite$FieldTitle = function (a) {
	return {ctor: 'FieldTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$CountTitle = function (a) {
	return {ctor: 'CountTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$CircleStyle = function (a) {
	return {ctor: 'CircleStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$BarStyle = function (a) {
	return {ctor: 'BarStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$Background = function (a) {
	return {ctor: 'Background', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxisBand = function (a) {
	return {ctor: 'AxisBand', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxisBottom = function (a) {
	return {ctor: 'AxisBottom', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxisTop = function (a) {
	return {ctor: 'AxisTop', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxisRight = function (a) {
	return {ctor: 'AxisRight', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxisLeft = function (a) {
	return {ctor: 'AxisLeft', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxisY = function (a) {
	return {ctor: 'AxisY', _0: a};
};
var _gicentre$elm_vega$VegaLite$AxisX = function (a) {
	return {ctor: 'AxisX', _0: a};
};
var _gicentre$elm_vega$VegaLite$Axis = function (a) {
	return {ctor: 'Axis', _0: a};
};
var _gicentre$elm_vega$VegaLite$AreaStyle = function (a) {
	return {ctor: 'AreaStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$Str = function (a) {
	return {ctor: 'Str', _0: a};
};
var _gicentre$elm_vega$VegaLite$Number = function (a) {
	return {ctor: 'Number', _0: a};
};
var _gicentre$elm_vega$VegaLite$DateTime = function (a) {
	return {ctor: 'DateTime', _0: a};
};
var _gicentre$elm_vega$VegaLite$Boolean = function (a) {
	return {ctor: 'Boolean', _0: a};
};
var _gicentre$elm_vega$VegaLite$Strings = function (a) {
	return {ctor: 'Strings', _0: a};
};
var _gicentre$elm_vega$VegaLite$Numbers = function (a) {
	return {ctor: 'Numbers', _0: a};
};
var _gicentre$elm_vega$VegaLite$DateTimes = function (a) {
	return {ctor: 'DateTimes', _0: a};
};
var _gicentre$elm_vega$VegaLite$Booleans = function (a) {
	return {ctor: 'Booleans', _0: a};
};
var _gicentre$elm_vega$VegaLite$DTMilliseconds = function (a) {
	return {ctor: 'DTMilliseconds', _0: a};
};
var _gicentre$elm_vega$VegaLite$DTSeconds = function (a) {
	return {ctor: 'DTSeconds', _0: a};
};
var _gicentre$elm_vega$VegaLite$DTMinutes = function (a) {
	return {ctor: 'DTMinutes', _0: a};
};
var _gicentre$elm_vega$VegaLite$DTHours = function (a) {
	return {ctor: 'DTHours', _0: a};
};
var _gicentre$elm_vega$VegaLite$DTDay = function (a) {
	return {ctor: 'DTDay', _0: a};
};
var _gicentre$elm_vega$VegaLite$DTDate = function (a) {
	return {ctor: 'DTDate', _0: a};
};
var _gicentre$elm_vega$VegaLite$DTMonth = function (a) {
	return {ctor: 'DTMonth', _0: a};
};
var _gicentre$elm_vega$VegaLite$DTQuarter = function (a) {
	return {ctor: 'DTQuarter', _0: a};
};
var _gicentre$elm_vega$VegaLite$DTYear = function (a) {
	return {ctor: 'DTYear', _0: a};
};
var _gicentre$elm_vega$VegaLite$Sun = {ctor: 'Sun'};
var _gicentre$elm_vega$VegaLite$Sat = {ctor: 'Sat'};
var _gicentre$elm_vega$VegaLite$Fri = {ctor: 'Fri'};
var _gicentre$elm_vega$VegaLite$Thu = {ctor: 'Thu'};
var _gicentre$elm_vega$VegaLite$Wed = {ctor: 'Wed'};
var _gicentre$elm_vega$VegaLite$Tue = {ctor: 'Tue'};
var _gicentre$elm_vega$VegaLite$Mon = {ctor: 'Mon'};
var _gicentre$elm_vega$VegaLite$DAggregate = function (a) {
	return {ctor: 'DAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$DTimeUnit = function (a) {
	return {ctor: 'DTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$DBin = function (a) {
	return {ctor: 'DBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$DmType = function (a) {
	return {ctor: 'DmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$DName = function (a) {
	return {ctor: 'DName', _0: a};
};
var _gicentre$elm_vega$VegaLite$FHeader = function (a) {
	return {ctor: 'FHeader', _0: a};
};
var _gicentre$elm_vega$VegaLite$FTimeUnit = function (a) {
	return {ctor: 'FTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$FAggregate = function (a) {
	return {ctor: 'FAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$FBin = function (a) {
	return {ctor: 'FBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$FmType = function (a) {
	return {ctor: 'FmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$FName = function (a) {
	return {ctor: 'FName', _0: a};
};
var _gicentre$elm_vega$VegaLite$RowBy = function (a) {
	return {ctor: 'RowBy', _0: a};
};
var _gicentre$elm_vega$VegaLite$ColumnBy = function (a) {
	return {ctor: 'ColumnBy', _0: a};
};
var _gicentre$elm_vega$VegaLite$FoUtc = function (a) {
	return {ctor: 'FoUtc', _0: a};
};
var _gicentre$elm_vega$VegaLite$FoDate = function (a) {
	return {ctor: 'FoDate', _0: a};
};
var _gicentre$elm_vega$VegaLite$FoBoolean = {ctor: 'FoBoolean'};
var _gicentre$elm_vega$VegaLite$FoNumber = {ctor: 'FoNumber'};
var _gicentre$elm_vega$VegaLite$FRange = F2(
	function (a, b) {
		return {ctor: 'FRange', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$FOneOf = F2(
	function (a, b) {
		return {ctor: 'FOneOf', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$FSelection = function (a) {
	return {ctor: 'FSelection', _0: a};
};
var _gicentre$elm_vega$VegaLite$FExpr = function (a) {
	return {ctor: 'FExpr', _0: a};
};
var _gicentre$elm_vega$VegaLite$FEqual = F2(
	function (a, b) {
		return {ctor: 'FEqual', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$DateRange = F2(
	function (a, b) {
		return {ctor: 'DateRange', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$NumberRange = F2(
	function (a, b) {
		return {ctor: 'NumberRange', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$Parse = function (a) {
	return {ctor: 'Parse', _0: a};
};
var _gicentre$elm_vega$VegaLite$TopojsonMesh = function (a) {
	return {ctor: 'TopojsonMesh', _0: a};
};
var _gicentre$elm_vega$VegaLite$TopojsonFeature = function (a) {
	return {ctor: 'TopojsonFeature', _0: a};
};
var _gicentre$elm_vega$VegaLite$TSV = {ctor: 'TSV'};
var _gicentre$elm_vega$VegaLite$CSV = {ctor: 'CSV'};
var _gicentre$elm_vega$VegaLite$JSON = {ctor: 'JSON'};
var _gicentre$elm_vega$VegaLite$W900 = {ctor: 'W900'};
var _gicentre$elm_vega$VegaLite$W800 = {ctor: 'W800'};
var _gicentre$elm_vega$VegaLite$W700 = {ctor: 'W700'};
var _gicentre$elm_vega$VegaLite$W600 = {ctor: 'W600'};
var _gicentre$elm_vega$VegaLite$W500 = {ctor: 'W500'};
var _gicentre$elm_vega$VegaLite$W400 = {ctor: 'W400'};
var _gicentre$elm_vega$VegaLite$W300 = {ctor: 'W300'};
var _gicentre$elm_vega$VegaLite$W200 = {ctor: 'W200'};
var _gicentre$elm_vega$VegaLite$W100 = {ctor: 'W100'};
var _gicentre$elm_vega$VegaLite$Normal = {ctor: 'Normal'};
var _gicentre$elm_vega$VegaLite$Lighter = {ctor: 'Lighter'};
var _gicentre$elm_vega$VegaLite$Bolder = {ctor: 'Bolder'};
var _gicentre$elm_vega$VegaLite$Bold = {ctor: 'Bold'};
var _gicentre$elm_vega$VegaLite$AlignRight = {ctor: 'AlignRight'};
var _gicentre$elm_vega$VegaLite$AlignLeft = {ctor: 'AlignLeft'};
var _gicentre$elm_vega$VegaLite$AlignCenter = {ctor: 'AlignCenter'};
var _gicentre$elm_vega$VegaLite$HTitle = function (a) {
	return {ctor: 'HTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$HFormat = function (a) {
	return {ctor: 'HFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$InPlaceholder = function (a) {
	return {ctor: 'InPlaceholder', _0: a};
};
var _gicentre$elm_vega$VegaLite$InStep = function (a) {
	return {ctor: 'InStep', _0: a};
};
var _gicentre$elm_vega$VegaLite$InName = function (a) {
	return {ctor: 'InName', _0: a};
};
var _gicentre$elm_vega$VegaLite$InMax = function (a) {
	return {ctor: 'InMax', _0: a};
};
var _gicentre$elm_vega$VegaLite$InMin = function (a) {
	return {ctor: 'InMin', _0: a};
};
var _gicentre$elm_vega$VegaLite$InOptions = function (a) {
	return {ctor: 'InOptions', _0: a};
};
var _gicentre$elm_vega$VegaLite$Element = function (a) {
	return {ctor: 'Element', _0: a};
};
var _gicentre$elm_vega$VegaLite$Debounce = function (a) {
	return {ctor: 'Debounce', _0: a};
};
var _gicentre$elm_vega$VegaLite$Symbol = {ctor: 'Symbol'};
var _gicentre$elm_vega$VegaLite$Gradient = {ctor: 'Gradient'};
var _gicentre$elm_vega$VegaLite$LeTitlePadding = function (a) {
	return {ctor: 'LeTitlePadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeTitleLimit = function (a) {
	return {ctor: 'LeTitleLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeTitleFontWeight = function (a) {
	return {ctor: 'LeTitleFontWeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeTitleFontSize = function (a) {
	return {ctor: 'LeTitleFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeTitleFont = function (a) {
	return {ctor: 'LeTitleFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeTitleColor = function (a) {
	return {ctor: 'LeTitleColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeTitleBaseline = function (a) {
	return {ctor: 'LeTitleBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeTitleAlign = function (a) {
	return {ctor: 'LeTitleAlign', _0: a};
};
var _gicentre$elm_vega$VegaLite$SymbolStrokeWidth = function (a) {
	return {ctor: 'SymbolStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$SymbolSize = function (a) {
	return {ctor: 'SymbolSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$SymbolType = function (a) {
	return {ctor: 'SymbolType', _0: a};
};
var _gicentre$elm_vega$VegaLite$SymbolColor = function (a) {
	return {ctor: 'SymbolColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$EntryPadding = function (a) {
	return {ctor: 'EntryPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeShortTimeLabels = function (a) {
	return {ctor: 'LeShortTimeLabels', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeLabelOffset = function (a) {
	return {ctor: 'LeLabelOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeLabelLimit = function (a) {
	return {ctor: 'LeLabelLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeLabelFontSize = function (a) {
	return {ctor: 'LeLabelFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeLabelFont = function (a) {
	return {ctor: 'LeLabelFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeLabelColor = function (a) {
	return {ctor: 'LeLabelColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeLabelBaseline = function (a) {
	return {ctor: 'LeLabelBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeLabelAlign = function (a) {
	return {ctor: 'LeLabelAlign', _0: a};
};
var _gicentre$elm_vega$VegaLite$GradientWidth = function (a) {
	return {ctor: 'GradientWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$GradientHeight = function (a) {
	return {ctor: 'GradientHeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$GradientStrokeWidth = function (a) {
	return {ctor: 'GradientStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$GradientStrokeColor = function (a) {
	return {ctor: 'GradientStrokeColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$GradientLabelOffset = function (a) {
	return {ctor: 'GradientLabelOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$GradientLabelLimit = function (a) {
	return {ctor: 'GradientLabelLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$GradientLabelBaseline = function (a) {
	return {ctor: 'GradientLabelBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$LePadding = function (a) {
	return {ctor: 'LePadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeStrokeWidth = function (a) {
	return {ctor: 'LeStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$LeStrokeDash = function (a) {
	return {ctor: 'LeStrokeDash', _0: a};
};
var _gicentre$elm_vega$VegaLite$StrokeColor = function (a) {
	return {ctor: 'StrokeColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$Offset = function (a) {
	return {ctor: 'Offset', _0: a};
};
var _gicentre$elm_vega$VegaLite$Orient = function (a) {
	return {ctor: 'Orient', _0: a};
};
var _gicentre$elm_vega$VegaLite$FillColor = function (a) {
	return {ctor: 'FillColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$CornerRadius = function (a) {
	return {ctor: 'CornerRadius', _0: a};
};
var _gicentre$elm_vega$VegaLite$TopRight = {ctor: 'TopRight'};
var _gicentre$elm_vega$VegaLite$TopLeft = {ctor: 'TopLeft'};
var _gicentre$elm_vega$VegaLite$Right = {ctor: 'Right'};
var _gicentre$elm_vega$VegaLite$None = {ctor: 'None'};
var _gicentre$elm_vega$VegaLite$Left = {ctor: 'Left'};
var _gicentre$elm_vega$VegaLite$BottomRight = {ctor: 'BottomRight'};
var _gicentre$elm_vega$VegaLite$BottomLeft = {ctor: 'BottomLeft'};
var _gicentre$elm_vega$VegaLite$LZIndex = function (a) {
	return {ctor: 'LZIndex', _0: a};
};
var _gicentre$elm_vega$VegaLite$LValues = function (a) {
	return {ctor: 'LValues', _0: a};
};
var _gicentre$elm_vega$VegaLite$LType = function (a) {
	return {ctor: 'LType', _0: a};
};
var _gicentre$elm_vega$VegaLite$LTitle = function (a) {
	return {ctor: 'LTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$LTickCount = function (a) {
	return {ctor: 'LTickCount', _0: a};
};
var _gicentre$elm_vega$VegaLite$LPadding = function (a) {
	return {ctor: 'LPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$LOrient = function (a) {
	return {ctor: 'LOrient', _0: a};
};
var _gicentre$elm_vega$VegaLite$LOffset = function (a) {
	return {ctor: 'LOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$LFormat = function (a) {
	return {ctor: 'LFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$LEntryPadding = function (a) {
	return {ctor: 'LEntryPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$LStrings = function (a) {
	return {ctor: 'LStrings', _0: a};
};
var _gicentre$elm_vega$VegaLite$LNumbers = function (a) {
	return {ctor: 'LNumbers', _0: a};
};
var _gicentre$elm_vega$VegaLite$LDateTimes = function (a) {
	return {ctor: 'LDateTimes', _0: a};
};
var _gicentre$elm_vega$VegaLite$Tick = {ctor: 'Tick'};
var _gicentre$elm_vega$VegaLite$Text = {ctor: 'Text'};
var _gicentre$elm_vega$VegaLite$Square = {ctor: 'Square'};
var _gicentre$elm_vega$VegaLite$Rule = {ctor: 'Rule'};
var _gicentre$elm_vega$VegaLite$Rect = {ctor: 'Rect'};
var _gicentre$elm_vega$VegaLite$Point = {ctor: 'Point'};
var _gicentre$elm_vega$VegaLite$Line = {ctor: 'Line'};
var _gicentre$elm_vega$VegaLite$Circle = {ctor: 'Circle'};
var _gicentre$elm_vega$VegaLite$Bar = {ctor: 'Bar'};
var _gicentre$elm_vega$VegaLite$Area = {ctor: 'Area'};
var _gicentre$elm_vega$VegaLite$MBoolean = function (a) {
	return {ctor: 'MBoolean', _0: a};
};
var _gicentre$elm_vega$VegaLite$MString = function (a) {
	return {ctor: 'MString', _0: a};
};
var _gicentre$elm_vega$VegaLite$MNumber = function (a) {
	return {ctor: 'MNumber', _0: a};
};
var _gicentre$elm_vega$VegaLite$MPath = function (a) {
	return {ctor: 'MPath', _0: a};
};
var _gicentre$elm_vega$VegaLite$MCondition = F3(
	function (a, b, c) {
		return {ctor: 'MCondition', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$VegaLite$MLegend = function (a) {
	return {ctor: 'MLegend', _0: a};
};
var _gicentre$elm_vega$VegaLite$MAggregate = function (a) {
	return {ctor: 'MAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$MTimeUnit = function (a) {
	return {ctor: 'MTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$MBin = function (a) {
	return {ctor: 'MBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$MScale = function (a) {
	return {ctor: 'MScale', _0: a};
};
var _gicentre$elm_vega$VegaLite$MmType = function (a) {
	return {ctor: 'MmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$MRepeat = function (a) {
	return {ctor: 'MRepeat', _0: a};
};
var _gicentre$elm_vega$VegaLite$MName = function (a) {
	return {ctor: 'MName', _0: a};
};
var _gicentre$elm_vega$VegaLite$Stepwise = {ctor: 'Stepwise'};
var _gicentre$elm_vega$VegaLite$StepBefore = {ctor: 'StepBefore'};
var _gicentre$elm_vega$VegaLite$StepAfter = {ctor: 'StepAfter'};
var _gicentre$elm_vega$VegaLite$Monotone = {ctor: 'Monotone'};
var _gicentre$elm_vega$VegaLite$LinearClosed = {ctor: 'LinearClosed'};
var _gicentre$elm_vega$VegaLite$Linear = {ctor: 'Linear'};
var _gicentre$elm_vega$VegaLite$CardinalOpen = {ctor: 'CardinalOpen'};
var _gicentre$elm_vega$VegaLite$CardinalClosed = {ctor: 'CardinalClosed'};
var _gicentre$elm_vega$VegaLite$Cardinal = {ctor: 'Cardinal'};
var _gicentre$elm_vega$VegaLite$Bundle = {ctor: 'Bundle'};
var _gicentre$elm_vega$VegaLite$BasisOpen = {ctor: 'BasisOpen'};
var _gicentre$elm_vega$VegaLite$BasisClosed = {ctor: 'BasisClosed'};
var _gicentre$elm_vega$VegaLite$Basis = {ctor: 'Basis'};
var _gicentre$elm_vega$VegaLite$Vertical = {ctor: 'Vertical'};
var _gicentre$elm_vega$VegaLite$Horizontal = {ctor: 'Horizontal'};
var _gicentre$elm_vega$VegaLite$MThickness = function (a) {
	return {ctor: 'MThickness', _0: a};
};
var _gicentre$elm_vega$VegaLite$MTheta = function (a) {
	return {ctor: 'MTheta', _0: a};
};
var _gicentre$elm_vega$VegaLite$MText = function (a) {
	return {ctor: 'MText', _0: a};
};
var _gicentre$elm_vega$VegaLite$MTension = function (a) {
	return {ctor: 'MTension', _0: a};
};
var _gicentre$elm_vega$VegaLite$MStyle = function (a) {
	return {ctor: 'MStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$MStrokeWidth = function (a) {
	return {ctor: 'MStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$MStrokeOpacity = function (a) {
	return {ctor: 'MStrokeOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$MStrokeDashOffset = function (a) {
	return {ctor: 'MStrokeDashOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$MStrokeDash = function (a) {
	return {ctor: 'MStrokeDash', _0: a};
};
var _gicentre$elm_vega$VegaLite$MStroke = function (a) {
	return {ctor: 'MStroke', _0: a};
};
var _gicentre$elm_vega$VegaLite$MSize = function (a) {
	return {ctor: 'MSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$MShortTimeLabels = function (a) {
	return {ctor: 'MShortTimeLabels', _0: a};
};
var _gicentre$elm_vega$VegaLite$MShape = function (a) {
	return {ctor: 'MShape', _0: a};
};
var _gicentre$elm_vega$VegaLite$MRadius = function (a) {
	return {ctor: 'MRadius', _0: a};
};
var _gicentre$elm_vega$VegaLite$MOrient = function (a) {
	return {ctor: 'MOrient', _0: a};
};
var _gicentre$elm_vega$VegaLite$MOpacity = function (a) {
	return {ctor: 'MOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$MInterpolate = function (a) {
	return {ctor: 'MInterpolate', _0: a};
};
var _gicentre$elm_vega$VegaLite$MFontWeight = function (a) {
	return {ctor: 'MFontWeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$MFontStyle = function (a) {
	return {ctor: 'MFontStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$MFontSize = function (a) {
	return {ctor: 'MFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$MFont = function (a) {
	return {ctor: 'MFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$MFillOpacity = function (a) {
	return {ctor: 'MFillOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$MFilled = function (a) {
	return {ctor: 'MFilled', _0: a};
};
var _gicentre$elm_vega$VegaLite$MFill = function (a) {
	return {ctor: 'MFill', _0: a};
};
var _gicentre$elm_vega$VegaLite$MdY = function (a) {
	return {ctor: 'MdY', _0: a};
};
var _gicentre$elm_vega$VegaLite$MdX = function (a) {
	return {ctor: 'MdX', _0: a};
};
var _gicentre$elm_vega$VegaLite$MDiscreteBandSize = function (a) {
	return {ctor: 'MDiscreteBandSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$MContinuousBandSize = function (a) {
	return {ctor: 'MContinuousBandSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$MColor = function (a) {
	return {ctor: 'MColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$MClip = function (a) {
	return {ctor: 'MClip', _0: a};
};
var _gicentre$elm_vega$VegaLite$MBinSpacing = function (a) {
	return {ctor: 'MBinSpacing', _0: a};
};
var _gicentre$elm_vega$VegaLite$MBaseline = function (a) {
	return {ctor: 'MBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$MBandSize = function (a) {
	return {ctor: 'MBandSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$MAngle = function (a) {
	return {ctor: 'MAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$MAlign = function (a) {
	return {ctor: 'MAlign', _0: a};
};
var _gicentre$elm_vega$VegaLite$Temporal = {ctor: 'Temporal'};
var _gicentre$elm_vega$VegaLite$Quantitative = {ctor: 'Quantitative'};
var _gicentre$elm_vega$VegaLite$Ordinal = {ctor: 'Ordinal'};
var _gicentre$elm_vega$VegaLite$Nominal = {ctor: 'Nominal'};
var _gicentre$elm_vega$VegaLite$Dec = {ctor: 'Dec'};
var _gicentre$elm_vega$VegaLite$Nov = {ctor: 'Nov'};
var _gicentre$elm_vega$VegaLite$Oct = {ctor: 'Oct'};
var _gicentre$elm_vega$VegaLite$Sep = {ctor: 'Sep'};
var _gicentre$elm_vega$VegaLite$Aug = {ctor: 'Aug'};
var _gicentre$elm_vega$VegaLite$Jul = {ctor: 'Jul'};
var _gicentre$elm_vega$VegaLite$Jun = {ctor: 'Jun'};
var _gicentre$elm_vega$VegaLite$May = {ctor: 'May'};
var _gicentre$elm_vega$VegaLite$Apr = {ctor: 'Apr'};
var _gicentre$elm_vega$VegaLite$Mar = {ctor: 'Mar'};
var _gicentre$elm_vega$VegaLite$Feb = {ctor: 'Feb'};
var _gicentre$elm_vega$VegaLite$Jan = {ctor: 'Jan'};
var _gicentre$elm_vega$VegaLite$VarianceP = {ctor: 'VarianceP'};
var _gicentre$elm_vega$VegaLite$Variance = {ctor: 'Variance'};
var _gicentre$elm_vega$VegaLite$Valid = {ctor: 'Valid'};
var _gicentre$elm_vega$VegaLite$Sum = {ctor: 'Sum'};
var _gicentre$elm_vega$VegaLite$StdevP = {ctor: 'StdevP'};
var _gicentre$elm_vega$VegaLite$Stdev = {ctor: 'Stdev'};
var _gicentre$elm_vega$VegaLite$Stderr = {ctor: 'Stderr'};
var _gicentre$elm_vega$VegaLite$Q3 = {ctor: 'Q3'};
var _gicentre$elm_vega$VegaLite$Q1 = {ctor: 'Q1'};
var _gicentre$elm_vega$VegaLite$Missing = {ctor: 'Missing'};
var _gicentre$elm_vega$VegaLite$Min = {ctor: 'Min'};
var _gicentre$elm_vega$VegaLite$Median = {ctor: 'Median'};
var _gicentre$elm_vega$VegaLite$Mean = {ctor: 'Mean'};
var _gicentre$elm_vega$VegaLite$Max = {ctor: 'Max'};
var _gicentre$elm_vega$VegaLite$Distinct = {ctor: 'Distinct'};
var _gicentre$elm_vega$VegaLite$Count = {ctor: 'Count'};
var _gicentre$elm_vega$VegaLite$CI1 = {ctor: 'CI1'};
var _gicentre$elm_vega$VegaLite$CI0 = {ctor: 'CI0'};
var _gicentre$elm_vega$VegaLite$Average = {ctor: 'Average'};
var _gicentre$elm_vega$VegaLite$ArgMin = {ctor: 'ArgMin'};
var _gicentre$elm_vega$VegaLite$ArgMax = {ctor: 'ArgMax'};
var _gicentre$elm_vega$VegaLite$OSort = function (a) {
	return {ctor: 'OSort', _0: a};
};
var _gicentre$elm_vega$VegaLite$OTimeUnit = function (a) {
	return {ctor: 'OTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$OAggregate = function (a) {
	return {ctor: 'OAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$OBin = function (a) {
	return {ctor: 'OBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$OmType = function (a) {
	return {ctor: 'OmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$ORepeat = function (a) {
	return {ctor: 'ORepeat', _0: a};
};
var _gicentre$elm_vega$VegaLite$OName = function (a) {
	return {ctor: 'OName', _0: a};
};
var _gicentre$elm_vega$VegaLite$OGreedy = {ctor: 'OGreedy'};
var _gicentre$elm_vega$VegaLite$OParity = {ctor: 'OParity'};
var _gicentre$elm_vega$VegaLite$ONone = {ctor: 'ONone'};
var _gicentre$elm_vega$VegaLite$PEdges = F4(
	function (a, b, c, d) {
		return {ctor: 'PEdges', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$VegaLite$PSize = function (a) {
	return {ctor: 'PSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$Y2 = {ctor: 'Y2'};
var _gicentre$elm_vega$VegaLite$X2 = {ctor: 'X2'};
var _gicentre$elm_vega$VegaLite$Y = {ctor: 'Y'};
var _gicentre$elm_vega$VegaLite$X = {ctor: 'X'};
var _gicentre$elm_vega$VegaLite$PStack = function (a) {
	return {ctor: 'PStack', _0: a};
};
var _gicentre$elm_vega$VegaLite$PSort = function (a) {
	return {ctor: 'PSort', _0: a};
};
var _gicentre$elm_vega$VegaLite$PAxis = function (a) {
	return {ctor: 'PAxis', _0: a};
};
var _gicentre$elm_vega$VegaLite$PScale = function (a) {
	return {ctor: 'PScale', _0: a};
};
var _gicentre$elm_vega$VegaLite$PAggregate = function (a) {
	return {ctor: 'PAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$PTimeUnit = function (a) {
	return {ctor: 'PTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$PBin = function (a) {
	return {ctor: 'PBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$PmType = function (a) {
	return {ctor: 'PmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$PRepeat = function (a) {
	return {ctor: 'PRepeat', _0: a};
};
var _gicentre$elm_vega$VegaLite$PName = function (a) {
	return {ctor: 'PName', _0: a};
};
var _gicentre$elm_vega$VegaLite$VLSelection = {ctor: 'VLSelection'};
var _gicentre$elm_vega$VegaLite$selection = function (sels) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLSelection,
		_1: _elm_lang$core$Json_Encode$object(sels)
	};
};
var _gicentre$elm_vega$VegaLite$VLConfig = {ctor: 'VLConfig'};
var _gicentre$elm_vega$VegaLite$configure = function (configs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLConfig,
		_1: _elm_lang$core$Json_Encode$object(configs)
	};
};
var _gicentre$elm_vega$VegaLite$VLResolve = {ctor: 'VLResolve'};
var _gicentre$elm_vega$VegaLite$resolve = function (res) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLResolve,
		_1: _elm_lang$core$Json_Encode$object(res)
	};
};
var _gicentre$elm_vega$VegaLite$VLSpec = {ctor: 'VLSpec'};
var _gicentre$elm_vega$VegaLite$specification = function (spec) {
	return {ctor: '_Tuple2', _0: _gicentre$elm_vega$VegaLite$VLSpec, _1: spec};
};
var _gicentre$elm_vega$VegaLite$VLFacet = {ctor: 'VLFacet'};
var _gicentre$elm_vega$VegaLite$facet = function (fMaps) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLFacet,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$facetMappingProperty, fMaps))
	};
};
var _gicentre$elm_vega$VegaLite$VLRepeat = {ctor: 'VLRepeat'};
var _gicentre$elm_vega$VegaLite$repeat = function (fields) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLRepeat,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$repeatFields, fields))
	};
};
var _gicentre$elm_vega$VegaLite$VLVConcat = {ctor: 'VLVConcat'};
var _gicentre$elm_vega$VegaLite$vConcat = function (specs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLVConcat,
		_1: _elm_lang$core$Json_Encode$list(specs)
	};
};
var _gicentre$elm_vega$VegaLite$VLHConcat = {ctor: 'VLHConcat'};
var _gicentre$elm_vega$VegaLite$hConcat = function (specs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLHConcat,
		_1: _elm_lang$core$Json_Encode$list(specs)
	};
};
var _gicentre$elm_vega$VegaLite$VLLayer = {ctor: 'VLLayer'};
var _gicentre$elm_vega$VegaLite$layer = function (specs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLLayer,
		_1: _elm_lang$core$Json_Encode$list(specs)
	};
};
var _gicentre$elm_vega$VegaLite$VLEncoding = {ctor: 'VLEncoding'};
var _gicentre$elm_vega$VegaLite$encoding = function (channels) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLEncoding,
		_1: _elm_lang$core$Json_Encode$object(channels)
	};
};
var _gicentre$elm_vega$VegaLite$VLTransform = {ctor: 'VLTransform'};
var _gicentre$elm_vega$VegaLite$transform = function (transforms) {
	var assemble = function (_p107) {
		var _p108 = _p107;
		var _p116 = _p108._1;
		var _p115 = _p108._0;
		var _p109 = _p115;
		switch (_p109) {
			case 'aggregate':
				var _p110 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p116));
				if ((((_p110.ctor === 'Ok') && (_p110._0.ctor === '::')) && (_p110._0._1.ctor === '::')) && (_p110._0._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'aggregate', _1: _p110._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'groupby', _1: _p110._0._1._0},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'bin':
				var _p111 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p116));
				if (((((_p111.ctor === 'Ok') && (_p111._0.ctor === '::')) && (_p111._0._1.ctor === '::')) && (_p111._0._1._1.ctor === '::')) && (_p111._0._1._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'bin', _1: _p111._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'field', _1: _p111._0._1._0},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'as', _1: _p111._0._1._1._0},
									_1: {ctor: '[]'}
								}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'calculate':
				var _p112 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p116));
				if ((((_p112.ctor === 'Ok') && (_p112._0.ctor === '::')) && (_p112._0._1.ctor === '::')) && (_p112._0._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'calculate', _1: _p112._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'as', _1: _p112._0._1._0},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'lookup':
				var _p113 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p116));
				if ((((((_p113.ctor === 'Ok') && (_p113._0.ctor === '::')) && (_p113._0._1.ctor === '::')) && (_p113._0._1._1.ctor === '::')) && (_p113._0._1._1._1.ctor === '::')) && (_p113._0._1._1._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'lookup', _1: _p113._0._0},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'from',
									_1: _elm_lang$core$Json_Encode$object(
										{
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'data', _1: _p113._0._1._0},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'key', _1: _p113._0._1._1._0},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'fields', _1: _p113._0._1._1._1._0},
													_1: {ctor: '[]'}
												}
											}
										})
								},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'timeUnit':
				var _p114 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p116));
				if (((((_p114.ctor === 'Ok') && (_p114._0.ctor === '::')) && (_p114._0._1.ctor === '::')) && (_p114._0._1._1.ctor === '::')) && (_p114._0._1._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'timeUnit', _1: _p114._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'field', _1: _p114._0._1._0},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'as', _1: _p114._0._1._1._0},
									_1: {ctor: '[]'}
								}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			default:
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p115, _1: _p116},
						_1: {ctor: '[]'}
					});
		}
	};
	return _elm_lang$core$List$isEmpty(transforms) ? {ctor: '_Tuple2', _0: _gicentre$elm_vega$VegaLite$VLTransform, _1: _elm_lang$core$Json_Encode$null} : {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLTransform,
		_1: _elm_lang$core$Json_Encode$list(
			A2(_elm_lang$core$List$map, assemble, transforms))
	};
};
var _gicentre$elm_vega$VegaLite$VLMark = {ctor: 'VLMark'};
var _gicentre$elm_vega$VegaLite$mark = F2(
	function (mark, mProps) {
		var _p117 = mProps;
		if (_p117.ctor === '[]') {
			return {
				ctor: '_Tuple2',
				_0: _gicentre$elm_vega$VegaLite$VLMark,
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$markLabel(mark))
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: _gicentre$elm_vega$VegaLite$VLMark,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string(
								_gicentre$elm_vega$VegaLite$markLabel(mark))
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, mProps)
					})
			};
		}
	});
var _gicentre$elm_vega$VegaLite$VLData = {ctor: 'VLData'};
var _gicentre$elm_vega$VegaLite$dataFromColumns = F2(
	function (fmts, cols) {
		var dataArray = _elm_lang$core$Json_Encode$list(
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Json_Encode$object,
				_gicentre$elm_vega$VegaLite$transpose(cols)));
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'values', _1: dataArray},
					_1: {ctor: '[]'}
				})
		} : {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'values', _1: dataArray},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'format',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$format, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$dataFromRows = F2(
	function (fmts, rows) {
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'values',
						_1: _elm_lang$core$Json_Encode$list(rows)
					},
					_1: {ctor: '[]'}
				})
		} : {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'values',
						_1: _elm_lang$core$Json_Encode$list(rows)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'format',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$format, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$dataFromUrl = F2(
	function (url, fmts) {
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'url',
						_1: _elm_lang$core$Json_Encode$string(url)
					},
					_1: {ctor: '[]'}
				})
		} : {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'url',
						_1: _elm_lang$core$Json_Encode$string(url)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'format',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$format, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$VLBackground = {ctor: 'VLBackground'};
var _gicentre$elm_vega$VegaLite$background = function (colour) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLBackground,
		_1: _elm_lang$core$Json_Encode$string(colour)
	};
};
var _gicentre$elm_vega$VegaLite$VLPadding = {ctor: 'VLPadding'};
var _gicentre$elm_vega$VegaLite$padding = function (pad) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLPadding,
		_1: _gicentre$elm_vega$VegaLite$paddingProperty(pad)
	};
};
var _gicentre$elm_vega$VegaLite$VLAutosize = {ctor: 'VLAutosize'};
var _gicentre$elm_vega$VegaLite$autosize = function (aus) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLAutosize,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$autosizeProperty, aus))
	};
};
var _gicentre$elm_vega$VegaLite$VLHeight = {ctor: 'VLHeight'};
var _gicentre$elm_vega$VegaLite$height = function (h) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLHeight,
		_1: _elm_lang$core$Json_Encode$float(h)
	};
};
var _gicentre$elm_vega$VegaLite$VLWidth = {ctor: 'VLWidth'};
var _gicentre$elm_vega$VegaLite$width = function (w) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLWidth,
		_1: _elm_lang$core$Json_Encode$float(w)
	};
};
var _gicentre$elm_vega$VegaLite$VLTitle = {ctor: 'VLTitle'};
var _gicentre$elm_vega$VegaLite$title = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLTitle,
		_1: _elm_lang$core$Json_Encode$string(s)
	};
};
var _gicentre$elm_vega$VegaLite$VLDescription = {ctor: 'VLDescription'};
var _gicentre$elm_vega$VegaLite$description = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLDescription,
		_1: _elm_lang$core$Json_Encode$string(s)
	};
};
var _gicentre$elm_vega$VegaLite$VLName = {ctor: 'VLName'};
var _gicentre$elm_vega$VegaLite$name = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLName,
		_1: _elm_lang$core$Json_Encode$string(s)
	};
};
var _gicentre$elm_vega$VegaLite$RSymbol = function (a) {
	return {ctor: 'RSymbol', _0: a};
};
var _gicentre$elm_vega$VegaLite$RRamp = function (a) {
	return {ctor: 'RRamp', _0: a};
};
var _gicentre$elm_vega$VegaLite$ROrdinal = function (a) {
	return {ctor: 'ROrdinal', _0: a};
};
var _gicentre$elm_vega$VegaLite$RHeatmap = function (a) {
	return {ctor: 'RHeatmap', _0: a};
};
var _gicentre$elm_vega$VegaLite$RDiverging = function (a) {
	return {ctor: 'RDiverging', _0: a};
};
var _gicentre$elm_vega$VegaLite$RCategory = function (a) {
	return {ctor: 'RCategory', _0: a};
};
var _gicentre$elm_vega$VegaLite$ColumnFields = function (a) {
	return {ctor: 'ColumnFields', _0: a};
};
var _gicentre$elm_vega$VegaLite$RowFields = function (a) {
	return {ctor: 'RowFields', _0: a};
};
var _gicentre$elm_vega$VegaLite$Independent = {ctor: 'Independent'};
var _gicentre$elm_vega$VegaLite$Shared = {ctor: 'Shared'};
var _gicentre$elm_vega$VegaLite$RScale = function (a) {
	return {ctor: 'RScale', _0: a};
};
var _gicentre$elm_vega$VegaLite$RLegend = function (a) {
	return {ctor: 'RLegend', _0: a};
};
var _gicentre$elm_vega$VegaLite$RAxis = function (a) {
	return {ctor: 'RAxis', _0: a};
};
var _gicentre$elm_vega$VegaLite$ScBinOrdinal = {ctor: 'ScBinOrdinal'};
var _gicentre$elm_vega$VegaLite$ScBinLinear = {ctor: 'ScBinLinear'};
var _gicentre$elm_vega$VegaLite$ScPoint = {ctor: 'ScPoint'};
var _gicentre$elm_vega$VegaLite$ScBand = {ctor: 'ScBand'};
var _gicentre$elm_vega$VegaLite$ScOrdinal = {ctor: 'ScOrdinal'};
var _gicentre$elm_vega$VegaLite$ScSequential = {ctor: 'ScSequential'};
var _gicentre$elm_vega$VegaLite$ScUtc = {ctor: 'ScUtc'};
var _gicentre$elm_vega$VegaLite$ScTime = {ctor: 'ScTime'};
var _gicentre$elm_vega$VegaLite$ScLog = {ctor: 'ScLog'};
var _gicentre$elm_vega$VegaLite$ScSqrt = {ctor: 'ScSqrt'};
var _gicentre$elm_vega$VegaLite$ScPow = {ctor: 'ScPow'};
var _gicentre$elm_vega$VegaLite$ScLinear = {ctor: 'ScLinear'};
var _gicentre$elm_vega$VegaLite$SCUseUnaggregatedDomain = function (a) {
	return {ctor: 'SCUseUnaggregatedDomain', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCTextXRangeStep = function (a) {
	return {ctor: 'SCTextXRangeStep', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCRound = function (a) {
	return {ctor: 'SCRound', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCRangeStep = function (a) {
	return {ctor: 'SCRangeStep', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCPointPadding = function (a) {
	return {ctor: 'SCPointPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCMinStrokeWidth = function (a) {
	return {ctor: 'SCMinStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCMaxStrokeWidth = function (a) {
	return {ctor: 'SCMaxStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCMinSize = function (a) {
	return {ctor: 'SCMinSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCMaxSize = function (a) {
	return {ctor: 'SCMaxSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCMinOpacity = function (a) {
	return {ctor: 'SCMinOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCMaxOpacity = function (a) {
	return {ctor: 'SCMaxOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCMinFontSize = function (a) {
	return {ctor: 'SCMinFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCMaxFontSize = function (a) {
	return {ctor: 'SCMaxFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCMinBandSize = function (a) {
	return {ctor: 'SCMinBandSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCMaxBandSize = function (a) {
	return {ctor: 'SCMaxBandSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCClamp = function (a) {
	return {ctor: 'SCClamp', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCBandPaddingOuter = function (a) {
	return {ctor: 'SCBandPaddingOuter', _0: a};
};
var _gicentre$elm_vega$VegaLite$SCBandPaddingInner = function (a) {
	return {ctor: 'SCBandPaddingInner', _0: a};
};
var _gicentre$elm_vega$VegaLite$Unaggregated = {ctor: 'Unaggregated'};
var _gicentre$elm_vega$VegaLite$DSelection = function (a) {
	return {ctor: 'DSelection', _0: a};
};
var _gicentre$elm_vega$VegaLite$DDateTimes = function (a) {
	return {ctor: 'DDateTimes', _0: a};
};
var _gicentre$elm_vega$VegaLite$DStrings = function (a) {
	return {ctor: 'DStrings', _0: a};
};
var _gicentre$elm_vega$VegaLite$DNumbers = function (a) {
	return {ctor: 'DNumbers', _0: a};
};
var _gicentre$elm_vega$VegaLite$NTickCount = function (a) {
	return {ctor: 'NTickCount', _0: a};
};
var _gicentre$elm_vega$VegaLite$IsNice = function (a) {
	return {ctor: 'IsNice', _0: a};
};
var _gicentre$elm_vega$VegaLite$NInterval = F2(
	function (a, b) {
		return {ctor: 'NInterval', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$NYear = {ctor: 'NYear'};
var _gicentre$elm_vega$VegaLite$NMonth = {ctor: 'NMonth'};
var _gicentre$elm_vega$VegaLite$NWeek = {ctor: 'NWeek'};
var _gicentre$elm_vega$VegaLite$NDay = {ctor: 'NDay'};
var _gicentre$elm_vega$VegaLite$NHour = {ctor: 'NHour'};
var _gicentre$elm_vega$VegaLite$NMinute = {ctor: 'NMinute'};
var _gicentre$elm_vega$VegaLite$NSecond = {ctor: 'NSecond'};
var _gicentre$elm_vega$VegaLite$NMillisecond = {ctor: 'NMillisecond'};
var _gicentre$elm_vega$VegaLite$SReverse = function (a) {
	return {ctor: 'SReverse', _0: a};
};
var _gicentre$elm_vega$VegaLite$SZero = function (a) {
	return {ctor: 'SZero', _0: a};
};
var _gicentre$elm_vega$VegaLite$SNice = function (a) {
	return {ctor: 'SNice', _0: a};
};
var _gicentre$elm_vega$VegaLite$SInterpolate = function (a) {
	return {ctor: 'SInterpolate', _0: a};
};
var _gicentre$elm_vega$VegaLite$SClamp = function (a) {
	return {ctor: 'SClamp', _0: a};
};
var _gicentre$elm_vega$VegaLite$SRound = function (a) {
	return {ctor: 'SRound', _0: a};
};
var _gicentre$elm_vega$VegaLite$SRangeStep = function (a) {
	return {ctor: 'SRangeStep', _0: a};
};
var _gicentre$elm_vega$VegaLite$SPaddingOuter = function (a) {
	return {ctor: 'SPaddingOuter', _0: a};
};
var _gicentre$elm_vega$VegaLite$SPaddingInner = function (a) {
	return {ctor: 'SPaddingInner', _0: a};
};
var _gicentre$elm_vega$VegaLite$SPadding = function (a) {
	return {ctor: 'SPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$SScheme = F2(
	function (a, b) {
		return {ctor: 'SScheme', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$SRange = function (a) {
	return {ctor: 'SRange', _0: a};
};
var _gicentre$elm_vega$VegaLite$SDomain = function (a) {
	return {ctor: 'SDomain', _0: a};
};
var _gicentre$elm_vega$VegaLite$SType = function (a) {
	return {ctor: 'SType', _0: a};
};
var _gicentre$elm_vega$VegaLite$RName = function (a) {
	return {ctor: 'RName', _0: a};
};
var _gicentre$elm_vega$VegaLite$RStrings = function (a) {
	return {ctor: 'RStrings', _0: a};
};
var _gicentre$elm_vega$VegaLite$categoricalDomainMap = function (scaleDomainPairs) {
	var _p118 = _elm_lang$core$List$unzip(scaleDomainPairs);
	var domain = _p118._0;
	var range = _p118._1;
	return {
		ctor: '::',
		_0: _gicentre$elm_vega$VegaLite$SDomain(
			_gicentre$elm_vega$VegaLite$DStrings(domain)),
		_1: {
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$SRange(
				_gicentre$elm_vega$VegaLite$RStrings(range)),
			_1: {ctor: '[]'}
		}
	};
};
var _gicentre$elm_vega$VegaLite$domainRangeMap = F2(
	function (lowerMap, upperMap) {
		var _p119 = _elm_lang$core$List$unzip(
			{
				ctor: '::',
				_0: lowerMap,
				_1: {
					ctor: '::',
					_0: upperMap,
					_1: {ctor: '[]'}
				}
			});
		var domain = _p119._0;
		var range = _p119._1;
		return {
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$SDomain(
				_gicentre$elm_vega$VegaLite$DNumbers(domain)),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$SRange(
					_gicentre$elm_vega$VegaLite$RStrings(range)),
				_1: {ctor: '[]'}
			}
		};
	});
var _gicentre$elm_vega$VegaLite$RNumbers = function (a) {
	return {ctor: 'RNumbers', _0: a};
};
var _gicentre$elm_vega$VegaLite$Interval = {ctor: 'Interval'};
var _gicentre$elm_vega$VegaLite$Multi = {ctor: 'Multi'};
var _gicentre$elm_vega$VegaLite$Single = {ctor: 'Single'};
var _gicentre$elm_vega$VegaLite$SMStrokeDashOffset = function (a) {
	return {ctor: 'SMStrokeDashOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$SMStrokeDash = function (a) {
	return {ctor: 'SMStrokeDash', _0: a};
};
var _gicentre$elm_vega$VegaLite$SMStrokeWidth = function (a) {
	return {ctor: 'SMStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$SMStrokeOpacity = function (a) {
	return {ctor: 'SMStrokeOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$SMStroke = function (a) {
	return {ctor: 'SMStroke', _0: a};
};
var _gicentre$elm_vega$VegaLite$SMFillOpacity = function (a) {
	return {ctor: 'SMFillOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$SMFill = function (a) {
	return {ctor: 'SMFill', _0: a};
};
var _gicentre$elm_vega$VegaLite$Toggle = function (a) {
	return {ctor: 'Toggle', _0: a};
};
var _gicentre$elm_vega$VegaLite$Nearest = function (a) {
	return {ctor: 'Nearest', _0: a};
};
var _gicentre$elm_vega$VegaLite$Bind = function (a) {
	return {ctor: 'Bind', _0: a};
};
var _gicentre$elm_vega$VegaLite$BindScales = {ctor: 'BindScales'};
var _gicentre$elm_vega$VegaLite$SelectionMark = function (a) {
	return {ctor: 'SelectionMark', _0: a};
};
var _gicentre$elm_vega$VegaLite$ResolveSelections = function (a) {
	return {ctor: 'ResolveSelections', _0: a};
};
var _gicentre$elm_vega$VegaLite$Empty = {ctor: 'Empty'};
var _gicentre$elm_vega$VegaLite$Encodings = function (a) {
	return {ctor: 'Encodings', _0: a};
};
var _gicentre$elm_vega$VegaLite$Fields = function (a) {
	return {ctor: 'Fields', _0: a};
};
var _gicentre$elm_vega$VegaLite$Zoom = function (a) {
	return {ctor: 'Zoom', _0: a};
};
var _gicentre$elm_vega$VegaLite$Translate = function (a) {
	return {ctor: 'Translate', _0: a};
};
var _gicentre$elm_vega$VegaLite$On = function (a) {
	return {ctor: 'On', _0: a};
};
var _gicentre$elm_vega$VegaLite$Intersection = {ctor: 'Intersection'};
var _gicentre$elm_vega$VegaLite$Union = {ctor: 'Union'};
var _gicentre$elm_vega$VegaLite$Global = {ctor: 'Global'};
var _gicentre$elm_vega$VegaLite$SRight = {ctor: 'SRight'};
var _gicentre$elm_vega$VegaLite$SLeft = {ctor: 'SLeft'};
var _gicentre$elm_vega$VegaLite$SBottom = {ctor: 'SBottom'};
var _gicentre$elm_vega$VegaLite$STop = {ctor: 'STop'};
var _gicentre$elm_vega$VegaLite$ByRepeat = function (a) {
	return {ctor: 'ByRepeat', _0: a};
};
var _gicentre$elm_vega$VegaLite$ByField = function (a) {
	return {ctor: 'ByField', _0: a};
};
var _gicentre$elm_vega$VegaLite$Op = function (a) {
	return {ctor: 'Op', _0: a};
};
var _gicentre$elm_vega$VegaLite$Descending = {ctor: 'Descending'};
var _gicentre$elm_vega$VegaLite$Ascending = {ctor: 'Ascending'};
var _gicentre$elm_vega$VegaLite$NoStack = {ctor: 'NoStack'};
var _gicentre$elm_vega$VegaLite$StCenter = {ctor: 'StCenter'};
var _gicentre$elm_vega$VegaLite$StNormalize = {ctor: 'StNormalize'};
var _gicentre$elm_vega$VegaLite$StZero = {ctor: 'StZero'};
var _gicentre$elm_vega$VegaLite$Path = function (a) {
	return {ctor: 'Path', _0: a};
};
var _gicentre$elm_vega$VegaLite$TriangleDown = {ctor: 'TriangleDown'};
var _gicentre$elm_vega$VegaLite$TriangleUp = {ctor: 'TriangleUp'};
var _gicentre$elm_vega$VegaLite$Diamond = {ctor: 'Diamond'};
var _gicentre$elm_vega$VegaLite$Cross = {ctor: 'Cross'};
var _gicentre$elm_vega$VegaLite$SymSquare = {ctor: 'SymSquare'};
var _gicentre$elm_vega$VegaLite$SymCircle = {ctor: 'SymCircle'};
var _gicentre$elm_vega$VegaLite$TFormat = function (a) {
	return {ctor: 'TFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$TCondition = F3(
	function (a, b, c) {
		return {ctor: 'TCondition', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$VegaLite$TTimeUnit = function (a) {
	return {ctor: 'TTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$TAggregate = function (a) {
	return {ctor: 'TAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$TBin = function (a) {
	return {ctor: 'TBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$TmType = function (a) {
	return {ctor: 'TmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$TRepeat = function (a) {
	return {ctor: 'TRepeat', _0: a};
};
var _gicentre$elm_vega$VegaLite$TName = function (a) {
	return {ctor: 'TName', _0: a};
};
var _gicentre$elm_vega$VegaLite$Milliseconds = {ctor: 'Milliseconds'};
var _gicentre$elm_vega$VegaLite$SecondsMilliseconds = {ctor: 'SecondsMilliseconds'};
var _gicentre$elm_vega$VegaLite$Seconds = {ctor: 'Seconds'};
var _gicentre$elm_vega$VegaLite$MinutesSeconds = {ctor: 'MinutesSeconds'};
var _gicentre$elm_vega$VegaLite$Minutes = {ctor: 'Minutes'};
var _gicentre$elm_vega$VegaLite$HoursMinutesSeconds = {ctor: 'HoursMinutesSeconds'};
var _gicentre$elm_vega$VegaLite$HoursMinutes = {ctor: 'HoursMinutes'};
var _gicentre$elm_vega$VegaLite$Hours = {ctor: 'Hours'};
var _gicentre$elm_vega$VegaLite$Day = {ctor: 'Day'};
var _gicentre$elm_vega$VegaLite$Date = {ctor: 'Date'};
var _gicentre$elm_vega$VegaLite$MonthDate = {ctor: 'MonthDate'};
var _gicentre$elm_vega$VegaLite$Month = {ctor: 'Month'};
var _gicentre$elm_vega$VegaLite$QuarterMonth = {ctor: 'QuarterMonth'};
var _gicentre$elm_vega$VegaLite$Quarter = {ctor: 'Quarter'};
var _gicentre$elm_vega$VegaLite$YearMonthDateHoursMinutesSeconds = {ctor: 'YearMonthDateHoursMinutesSeconds'};
var _gicentre$elm_vega$VegaLite$YearMonthDateHoursMinutes = {ctor: 'YearMonthDateHoursMinutes'};
var _gicentre$elm_vega$VegaLite$YearMonthDateHours = {ctor: 'YearMonthDateHours'};
var _gicentre$elm_vega$VegaLite$YearMonthDate = {ctor: 'YearMonthDate'};
var _gicentre$elm_vega$VegaLite$YearMonth = {ctor: 'YearMonth'};
var _gicentre$elm_vega$VegaLite$YearQuarterMonth = {ctor: 'YearQuarterMonth'};
var _gicentre$elm_vega$VegaLite$YearQuarter = {ctor: 'YearQuarter'};
var _gicentre$elm_vega$VegaLite$Year = {ctor: 'Year'};
var _gicentre$elm_vega$VegaLite$TOrient = function (a) {
	return {ctor: 'TOrient', _0: a};
};
var _gicentre$elm_vega$VegaLite$TOffset = function (a) {
	return {ctor: 'TOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$TLimit = function (a) {
	return {ctor: 'TLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$TFontWeight = function (a) {
	return {ctor: 'TFontWeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$TFontSize = function (a) {
	return {ctor: 'TFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$TFont = function (a) {
	return {ctor: 'TFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$TColor = function (a) {
	return {ctor: 'TColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$TBaseline = function (a) {
	return {ctor: 'TBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$TAngle = function (a) {
	return {ctor: 'TAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$TAnchor = function (a) {
	return {ctor: 'TAnchor', _0: a};
};
var _gicentre$elm_vega$VegaLite$Plain = {ctor: 'Plain'};
var _gicentre$elm_vega$VegaLite$Function = {ctor: 'Function'};
var _gicentre$elm_vega$VegaLite$Verbal = {ctor: 'Verbal'};
var _gicentre$elm_vega$VegaLite$AlignBottom = {ctor: 'AlignBottom'};
var _gicentre$elm_vega$VegaLite$AlignMiddle = {ctor: 'AlignMiddle'};
var _gicentre$elm_vega$VegaLite$AlignTop = {ctor: 'AlignTop'};
var _gicentre$elm_vega$VegaLite$StrokeDashOffset = function (a) {
	return {ctor: 'StrokeDashOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$StrokeDash = function (a) {
	return {ctor: 'StrokeDash', _0: a};
};
var _gicentre$elm_vega$VegaLite$StrokeWidth = function (a) {
	return {ctor: 'StrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$StrokeOpacity = function (a) {
	return {ctor: 'StrokeOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$Stroke = function (a) {
	return {ctor: 'Stroke', _0: a};
};
var _gicentre$elm_vega$VegaLite$FillOpacity = function (a) {
	return {ctor: 'FillOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$Fill = function (a) {
	return {ctor: 'Fill', _0: a};
};
var _gicentre$elm_vega$VegaLite$Clip = function (a) {
	return {ctor: 'Clip', _0: a};
};
var _gicentre$elm_vega$VegaLite$ViewHeight = function (a) {
	return {ctor: 'ViewHeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$ViewWidth = function (a) {
	return {ctor: 'ViewWidth', _0: a};
};

var _gicentre$elm_vega$Gallery$interactive9 = function () {
	var res = function (_p0) {
		return _gicentre$elm_vega$VegaLite$resolve(
			A2(
				_gicentre$elm_vega$VegaLite$resolution,
				_gicentre$elm_vega$VegaLite$RLegend(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _gicentre$elm_vega$VegaLite$ChColor, _1: _gicentre$elm_vega$VegaLite$Independent},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _gicentre$elm_vega$VegaLite$ChSize, _1: _gicentre$elm_vega$VegaLite$Independent},
							_1: {ctor: '[]'}
						}
					}),
				_p0));
	};
	var config = function (_p1) {
		return _gicentre$elm_vega$VegaLite$configure(
			A2(
				_gicentre$elm_vega$VegaLite$configuration,
				_gicentre$elm_vega$VegaLite$Range(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$RHeatmap('greenblue'),
						_1: {ctor: '[]'}
					}),
				_p1));
	};
	var encBar = function (_p2) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Major_Genre'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Nominal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAxis(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$AxLabelAngle(-40),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: A3(
								_gicentre$elm_vega$VegaLite$MCondition,
								'myPts',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MString('steelblue'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MString('grey'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						_p2))));
	};
	var sel = function (_p3) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'myPts',
				_gicentre$elm_vega$VegaLite$Single,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$Encodings(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p3));
	};
	var barSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$width(420),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$height(120),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: sel(
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: encBar(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
	var enc2 = function (_p4) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('IMDB_Rating'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MaxBins(10),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Rotten_Tomatoes_Rating'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PBin(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MaxBins(10),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$size,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MAggregate(_gicentre$elm_vega$VegaLite$Count),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MLegend(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$LTitle('In Selected Category'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$color,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MString('#666'),
								_1: {ctor: '[]'}
							},
							_p4)))));
	};
	var enc1 = function (_p5) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('IMDB_Rating'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MaxBins(10),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Rotten_Tomatoes_Rating'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PBin(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MaxBins(10),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MAggregate(_gicentre$elm_vega$VegaLite$Count),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MLegend(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$LTitle(''),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						},
						_p5))));
	};
	var spec1 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$width(300),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Rect,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc1(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var selTrans = function (_p6) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FSelection('myPts'),
				_p6));
	};
	var spec2 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: selTrans(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Point,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc2(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var heatSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$layer(
				{
					ctor: '::',
					_0: spec1,
					_1: {
						ctor: '::',
						_0: spec2,
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		});
	var des = _gicentre$elm_vega$VegaLite$description('A dashboard with cross-highlighting. Select bars in lower chart to update view in upper chart.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/movies.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$vConcat(
						{
							ctor: '::',
							_0: heatSpec,
							_1: {
								ctor: '::',
								_0: barSpec,
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: res(
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: config(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$interactive8 = function () {
	var enc = function (_p7) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PRepeat(_gicentre$elm_vega$VegaLite$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PRepeat(_gicentre$elm_vega$VegaLite$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: A3(
								_gicentre$elm_vega$VegaLite$MCondition,
								'myBrush',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MName('Origin'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MString('grey'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						_p7))));
	};
	var sel = function (_p8) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'myBrush',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$On('[mousedown[event.shiftKey], window:mouseup] > window:mousemove!'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$Translate('[mousedown[event.shiftKey], window:mouseup] > window:mousemove!'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$Zoom('wheel![event.shiftKey]'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$ResolveSelections(_gicentre$elm_vega$VegaLite$Union),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A4(
					_gicentre$elm_vega$VegaLite$select,
					'',
					_gicentre$elm_vega$VegaLite$Interval,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$BindScales,
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$Translate('[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$Zoom('wheel![event.shiftKey]'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$ResolveSelections(_gicentre$elm_vega$VegaLite$Global),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					_p8)));
	};
	var spec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'data/cars.json',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Point,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: sel(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Scatterplot matrix. Drag/zoom in any scatterplot to update view of all scatterplots containing selected variables. Shift-select to highlight selected points.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$repeat(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$RowFields(
							{
								ctor: '::',
								_0: 'Horsepower',
								_1: {
									ctor: '::',
									_0: 'Acceleration',
									_1: {
										ctor: '::',
										_0: 'Miles_per_Gallon',
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$ColumnFields(
								{
									ctor: '::',
									_0: 'Miles_per_Gallon',
									_1: {
										ctor: '::',
										_0: 'Acceleration',
										_1: {
											ctor: '::',
											_0: 'Horsepower',
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$specification(spec),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$interactive7 = function () {
	var enc2 = function (_p9) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PRepeat(_gicentre$elm_vega$VegaLite$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MaxBins(20),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MString('goldenrod'),
							_1: {ctor: '[]'}
						},
						_p9))));
	};
	var enc1 = function (_p10) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PRepeat(_gicentre$elm_vega$VegaLite$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MaxBins(20),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p10)));
	};
	var selTrans = function (_p11) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FSelection('myBrush'),
				_p11));
	};
	var spec2 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: selTrans(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc2(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var sel = function (_p12) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'myBrush',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$Encodings(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p12));
	};
	var spec1 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc1(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var trans = function (_p13) {
		return _gicentre$elm_vega$VegaLite$transform(
			A3(_gicentre$elm_vega$VegaLite$calculateAs, 'hours(datum.date)', 'time', _p13));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Drag over any chart to cross-filter highlights in all charts.');
	var spec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/flights-2k.json',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$Parse(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'date',
									_1: _gicentre$elm_vega$VegaLite$FoDate('')
								},
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$layer(
							{
								ctor: '::',
								_0: spec1,
								_1: {
									ctor: '::',
									_0: spec2,
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$repeat(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$ColumnFields(
						{
							ctor: '::',
							_0: 'distance',
							_1: {
								ctor: '::',
								_0: 'delay',
								_1: {
									ctor: '::',
									_0: 'time',
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$specification(spec),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$elm_vega$Gallery$interactive6 = function () {
	var enc2 = function (_p14) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAxis(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$AxFormat('%Y'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('price'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTickCount(3),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxGrid(false),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					_p14)));
	};
	var enc1 = function (_p15) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SDomain(
										_gicentre$elm_vega$VegaLite$DSelection('myBrush')),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle(''),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('price'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p15)));
	};
	var spec1 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$width(500),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Area,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc1(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var sel = function (_p16) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'myBrush',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$Encodings(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p16));
	};
	var spec2 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$width(480),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$height(60),
				_1: {
					ctor: '::',
					_0: sel(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$mark,
							_gicentre$elm_vega$VegaLite$Area,
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: enc2(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Drag over lower chart to update detailed view in upper chart.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/sp500.csv',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$vConcat(
						{
							ctor: '::',
							_0: spec1,
							_1: {
								ctor: '::',
								_0: spec2,
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$interactive5 = function () {
	var enc2 = function (_p17) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$Y,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('precipitation'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
							_1: {ctor: '[]'}
						}
					}
				},
				A2(
					_gicentre$elm_vega$VegaLite$color,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$MString('firebrick'),
						_1: {ctor: '[]'}
					},
					A2(
						_gicentre$elm_vega$VegaLite$size,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MNumber(3),
							_1: {ctor: '[]'}
						},
						_p17))));
	};
	var trans = function (_p18) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FSelection('myBrush'),
				_p18));
	};
	var enc1 = function (_p19) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$opacity,
						{
							ctor: '::',
							_0: A3(
								_gicentre$elm_vega$VegaLite$MCondition,
								'myBrush',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MNumber(1),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MNumber(0.7),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						_p19))));
	};
	var sel = function (_p20) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'myBrush',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$Encodings(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p20));
	};
	var spec1 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc1(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Drag over bars to update selection average.');
	var spec2 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: trans(
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Rule,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc2(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$layer(
					{
						ctor: '::',
						_0: spec1,
						_1: {
							ctor: '::',
							_0: spec2,
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$elm_vega$Gallery$interactive4 = function () {
	var enc2 = function (_p21) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('Origin'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$size,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MNumber(100),
								_1: {ctor: '[]'}
							},
							_p21)))));
	};
	var trans2 = function (_p22) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FSelection('CylYr'),
				_p22));
	};
	var spec2 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: trans2(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Circle,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc2(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var enc1 = function (_p23) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: A3(
								_gicentre$elm_vega$VegaLite$MCondition,
								'CylYr',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MName('Origin'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MString('grey'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						_p23))));
	};
	var sel1 = function (_p24) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'CylYr',
				_gicentre$elm_vega$VegaLite$Single,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$Fields(
						{
							ctor: '::',
							_0: 'Cylinders',
							_1: {
								ctor: '::',
								_0: 'Year',
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$Bind(
							{
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$VegaLite$IRange,
									'Cylinders',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$InName('Cylinders '),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$InMin(3),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$InMax(8),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$VegaLite$InStep(1),
													_1: {ctor: '[]'}
												}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$VegaLite$IRange,
										'Year',
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$InName('Year '),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$InMin(1969),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$VegaLite$InMax(1981),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$VegaLite$InStep(1),
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				},
				_p24));
	};
	var spec1 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: sel1(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Circle,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc1(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var trans = function (_p25) {
		return _gicentre$elm_vega$VegaLite$transform(
			A3(_gicentre$elm_vega$VegaLite$calculateAs, 'year(datum.Year)', 'Year', _p25));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Drag the sliders to highlight points.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$layer(
							{
								ctor: '::',
								_0: spec1,
								_1: {
									ctor: '::',
									_0: spec2,
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$interactive3 = function () {
	var enc = function (_p26) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SDomain(
										_gicentre$elm_vega$VegaLite$DNumbers(
											{
												ctor: '::',
												_0: 75,
												_1: {
													ctor: '::',
													_0: 150,
													_1: {ctor: '[]'}
												}
											})),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SDomain(
											_gicentre$elm_vega$VegaLite$DNumbers(
												{
													ctor: '::',
													_0: 20,
													_1: {
														ctor: '::',
														_0: 40,
														_1: {ctor: '[]'}
													}
												})),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$size,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('Cylinders'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						_p26))));
	};
	var sel = function (_p27) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'myGrid',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$BindScales,
					_1: {ctor: '[]'}
				},
				_p27));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Drag to pan. Zoom in or out with mousewheel/zoom gesture.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Circle,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: sel(
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: enc(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$interactive2 = function () {
	var enc = function (_p28) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$size,
						{
							ctor: '::',
							_0: A3(
								_gicentre$elm_vega$VegaLite$MCondition,
								'myPaintbrush',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MNumber(300),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MNumber(50),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						_p28))));
	};
	var sel = function (_p29) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'myPaintbrush',
				_gicentre$elm_vega$VegaLite$Multi,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$On('mouseover'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$Nearest(true),
						_1: {ctor: '[]'}
					}
				},
				_p29));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Mouse over individual points or select multiple points with the shift key.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Point,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: sel(
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: enc(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$interactive1 = function () {
	var enc = function (_p30) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: A3(
								_gicentre$elm_vega$VegaLite$MCondition,
								'myBrush',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MName('Cylinders'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Ordinal),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MString('grey'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						_p30))));
	};
	var sel = function (_p31) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'myBrush',
				_gicentre$elm_vega$VegaLite$Interval,
				{ctor: '[]'},
				_p31));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Drag out a rectangular brush to highlight points.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Point,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: sel(
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: enc(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$comp3 = function () {
	var enc = function (_p32) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MaxBins(15),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('Origin'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MLegend(
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}
							}
						},
						_p32))));
	};
	var spec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Bar,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: enc(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'data/cars.json',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$facet(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$RowBy(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$FName('Origin'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$FmType(_gicentre$elm_vega$VegaLite$Nominal),
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$specification(spec),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$comp2 = function () {
	var enc = function (_p33) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PRepeat(_gicentre$elm_vega$VegaLite$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Count),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('Origin'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						_p33))));
	};
	var spec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'data/cars.json',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$repeat(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$ColumnFields(
						{
							ctor: '::',
							_0: 'Horsepower',
							_1: {
								ctor: '::',
								_0: 'Miles_per_Gallon',
								_1: {
									ctor: '::',
									_0: 'Acceleration',
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$specification(spec),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$elm_vega$Gallery$comp1 = function () {
	var enc2 = function (_p34) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PRepeat(_gicentre$elm_vega$VegaLite$Column),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('location'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						_p34))));
	};
	var spec2 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Line,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: enc2(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var enc1 = function (_p35) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PRepeat(_gicentre$elm_vega$VegaLite$Column),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$detail,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$DName('date'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$DmType(_gicentre$elm_vega$VegaLite$Temporal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$DTimeUnit(_gicentre$elm_vega$VegaLite$Year),
									_1: {ctor: '[]'}
								}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$color,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MName('location'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
									_1: {ctor: '[]'}
								}
							},
							A2(
								_gicentre$elm_vega$VegaLite$opacity,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MNumber(0.2),
									_1: {ctor: '[]'}
								},
								_p35))))));
	};
	var spec1 = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Line,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: enc1(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Monthly weather information for individual years and overall average for Seatle and New York.');
	var spec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$layer(
					{
						ctor: '::',
						_0: spec1,
						_1: {
							ctor: '::',
							_0: spec2,
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'data/weather.csv',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$Parse(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'date',
								_1: _gicentre$elm_vega$VegaLite$FoDate('%Y-%m-%d %H:%M')
							},
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$repeat(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$ColumnFields(
							{
								ctor: '::',
								_0: 'temp_max',
								_1: {
									ctor: '::',
									_0: 'precipitation',
									_1: {
										ctor: '::',
										_0: 'wind',
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$specification(spec),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer16 = function () {
	var enc = function (_p36) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('miles'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SZero(false),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('gas'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SZero(false),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$order,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$OName('year'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$OmType(_gicentre$elm_vega$VegaLite$Temporal),
								_1: {ctor: '[]'}
							}
						},
						_p36))));
	};
	var specLine = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: enc(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Line,
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var specPoint = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: enc(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Point,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$MFilled(true),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Connected scatterplot showing change over time.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/driving.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$layer(
						{
							ctor: '::',
							_0: specLine,
							_1: {
								ctor: '::',
								_0: specPoint,
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer15 = function () {
	var config = function (_p37) {
		return _gicentre$elm_vega$VegaLite$configure(
			A2(
				_gicentre$elm_vega$VegaLite$configuration,
				_gicentre$elm_vega$VegaLite$AreaStyle(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$MInterpolate(_gicentre$elm_vega$VegaLite$Monotone),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MOrient(_gicentre$elm_vega$VegaLite$Vertical),
							_1: {ctor: '[]'}
						}
					}),
				_p37));
	};
	var encUpper = function (_p38) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('x'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('ny'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SDomain(
											_gicentre$elm_vega$VegaLite$DNumbers(
												{
													ctor: '::',
													_0: 0,
													_1: {
														ctor: '::',
														_0: 50,
														_1: {ctor: '[]'}
													}
												})),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxTitle('y'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$opacity,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MNumber(0.3),
							_1: {ctor: '[]'}
						},
						_p38))));
	};
	var encLower = function (_p39) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('x'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SZero(false),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SNice(
											_gicentre$elm_vega$VegaLite$IsNice(false)),
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('y'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SDomain(
											_gicentre$elm_vega$VegaLite$DNumbers(
												{
													ctor: '::',
													_0: 0,
													_1: {
														ctor: '::',
														_0: 50,
														_1: {ctor: '[]'}
													}
												})),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$opacity,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MNumber(0.6),
							_1: {ctor: '[]'}
						},
						_p39))));
	};
	var specLower = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Area,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MClip(true),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encLower(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var trans = function (_p40) {
		return _gicentre$elm_vega$VegaLite$transform(
			A3(_gicentre$elm_vega$VegaLite$calculateAs, 'datum.y - 50', 'ny', _p40));
	};
	var specUpper = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: trans(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Area,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$MClip(true),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: encUpper(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var data = function (_p41) {
		return A2(
			_gicentre$elm_vega$VegaLite$dataFromColumns,
			{ctor: '[]'},
			A3(
				_gicentre$elm_vega$VegaLite$dataColumn,
				'x',
				_gicentre$elm_vega$VegaLite$Numbers(
					A2(
						_elm_lang$core$List$map,
						_elm_lang$core$Basics$toFloat,
						A2(_elm_lang$core$List$range, 1, 20))),
				A3(
					_gicentre$elm_vega$VegaLite$dataColumn,
					'y',
					_gicentre$elm_vega$VegaLite$Numbers(
						{
							ctor: '::',
							_0: 28,
							_1: {
								ctor: '::',
								_0: 55,
								_1: {
									ctor: '::',
									_0: 43,
									_1: {
										ctor: '::',
										_0: 91,
										_1: {
											ctor: '::',
											_0: 81,
											_1: {
												ctor: '::',
												_0: 53,
												_1: {
													ctor: '::',
													_0: 19,
													_1: {
														ctor: '::',
														_0: 87,
														_1: {
															ctor: '::',
															_0: 52,
															_1: {
																ctor: '::',
																_0: 48,
																_1: {
																	ctor: '::',
																	_0: 24,
																	_1: {
																		ctor: '::',
																		_0: 49,
																		_1: {
																			ctor: '::',
																			_0: 87,
																			_1: {
																				ctor: '::',
																				_0: 66,
																				_1: {
																					ctor: '::',
																					_0: 17,
																					_1: {
																						ctor: '::',
																						_0: 27,
																						_1: {
																							ctor: '::',
																							_0: 68,
																							_1: {
																								ctor: '::',
																								_0: 16,
																								_1: {
																									ctor: '::',
																									_0: 49,
																									_1: {
																										ctor: '::',
																										_0: 15,
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}),
					_p41)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Horizon chart with 2 layers. (See https://idl.cs.washington.edu/papers/horizon/ for more details on horizon charts.)');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$width(300),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$height(50),
					_1: {
						ctor: '::',
						_0: data(
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$layer(
								{
									ctor: '::',
									_0: specLower,
									_1: {
										ctor: '::',
										_0: specUpper,
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: config(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer14 = function () {
	var res = function (_p42) {
		return _gicentre$elm_vega$VegaLite$resolve(
			A2(
				_gicentre$elm_vega$VegaLite$resolution,
				_gicentre$elm_vega$VegaLite$RScale(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _gicentre$elm_vega$VegaLite$ChY, _1: _gicentre$elm_vega$VegaLite$Independent},
						_1: {ctor: '[]'}
					}),
				_p42));
	};
	var encLine = function (_p43) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('temp_max'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxGrid(false),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$PScale(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$SZero(false),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MString('firebrick'),
							_1: {ctor: '[]'}
						},
						_p43))));
	};
	var specLine = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Line,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encLine(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encBar = function (_p44) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxGrid(false),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					_p44)));
	};
	var specBar = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Bar,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encBar(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Layered bar/line chart with dual axes.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/seattle-weather.csv',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$layer(
						{
							ctor: '::',
							_0: specBar,
							_1: {
								ctor: '::',
								_0: specLine,
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: res(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer13 = function () {
	var encPoints = function (_p45) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('life_expect'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAxis(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$AxTitle('Life Expectanct (years)'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('country'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Nominal),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle('Country'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxOffset(5),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$AxTicks(false),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$VegaLite$AxMinExtent(70),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$VegaLite$AxDomain(false),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('year'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Ordinal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MScale(
										A2(
											_gicentre$elm_vega$VegaLite$domainRangeMap,
											{ctor: '_Tuple2', _0: 1955, _1: '#e6959c'},
											{ctor: '_Tuple2', _0: 2000, _1: '#911a24'})),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MLegend(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$LTitle('Year'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$size,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MNumber(100),
								_1: {ctor: '[]'}
							},
							A2(
								_gicentre$elm_vega$VegaLite$opacity,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MNumber(1),
									_1: {ctor: '[]'}
								},
								_p45))))));
	};
	var specPoints = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Point,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MFilled(true),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encPoints(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encLine = function (_p46) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('life_expect'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('country'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Nominal),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$detail,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$DName('country'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$DmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$color,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MString('#db646f'),
								_1: {ctor: '[]'}
							},
							_p46)))));
	};
	var specLine = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Line,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encLine(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var trans = function (_p47) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				A2(
					_gicentre$elm_vega$VegaLite$FOneOf,
					'country',
					_gicentre$elm_vega$VegaLite$Strings(
						{
							ctor: '::',
							_0: 'China',
							_1: {
								ctor: '::',
								_0: 'India',
								_1: {
									ctor: '::',
									_0: 'United States',
									_1: {
										ctor: '::',
										_0: 'Indonesia',
										_1: {
											ctor: '::',
											_0: 'Brazil',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						})),
				A2(
					_gicentre$elm_vega$VegaLite$filter,
					A2(
						_gicentre$elm_vega$VegaLite$FOneOf,
						'year',
						_gicentre$elm_vega$VegaLite$Numbers(
							{
								ctor: '::',
								_0: 1955,
								_1: {
									ctor: '::',
									_0: 2000,
									_1: {ctor: '[]'}
								}
							})),
					_p47)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A ranged dot plot that uses \'layer\' to convey changing life expectancy for the five most populous countries (between 1955 and 2000).');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/countries.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$layer(
							{
								ctor: '::',
								_0: specLine,
								_1: {
									ctor: '::',
									_0: specPoints,
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer12 = function () {
	var encPopulation = function (_p48) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('year'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Year),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle(''),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('population'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MString('#333'),
							_1: {ctor: '[]'}
						},
						_p48))));
	};
	var specLine = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Line,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encPopulation(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var specPoints = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Point,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encPopulation(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encRects = function (_p49) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('start'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Year),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$X2,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('end'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Year),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('event'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						_p49))));
	};
	var highlights = function (_p50) {
		return A2(
			_gicentre$elm_vega$VegaLite$dataFromColumns,
			{
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$Parse(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'start',
							_1: _gicentre$elm_vega$VegaLite$FoDate('%Y')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'end',
								_1: _gicentre$elm_vega$VegaLite$FoDate('%Y')
							},
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			},
			A3(
				_gicentre$elm_vega$VegaLite$dataColumn,
				'start',
				_gicentre$elm_vega$VegaLite$Strings(
					{
						ctor: '::',
						_0: '1933',
						_1: {
							ctor: '::',
							_0: '1948',
							_1: {ctor: '[]'}
						}
					}),
				A3(
					_gicentre$elm_vega$VegaLite$dataColumn,
					'end',
					_gicentre$elm_vega$VegaLite$Strings(
						{
							ctor: '::',
							_0: '1945',
							_1: {
								ctor: '::',
								_0: '1989',
								_1: {ctor: '[]'}
							}
						}),
					A3(
						_gicentre$elm_vega$VegaLite$dataColumn,
						'event',
						_gicentre$elm_vega$VegaLite$Strings(
							{
								ctor: '::',
								_0: 'Nazi Rule',
								_1: {
									ctor: '::',
									_0: 'GDR (East Germany)',
									_1: {ctor: '[]'}
								}
							}),
						_p50))));
	};
	var specRects = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: highlights(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$mark,
					_gicentre$elm_vega$VegaLite$Rect,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: encRects(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var data = function (_p51) {
		return A2(
			_gicentre$elm_vega$VegaLite$dataFromColumns,
			{
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$Parse(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'year',
							_1: _gicentre$elm_vega$VegaLite$FoDate('%Y')
						},
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			},
			A3(
				_gicentre$elm_vega$VegaLite$dataColumn,
				'year',
				_gicentre$elm_vega$VegaLite$Strings(
					{
						ctor: '::',
						_0: '1875',
						_1: {
							ctor: '::',
							_0: '1890',
							_1: {
								ctor: '::',
								_0: '1910',
								_1: {
									ctor: '::',
									_0: '1925',
									_1: {
										ctor: '::',
										_0: '1933',
										_1: {
											ctor: '::',
											_0: '1939',
											_1: {
												ctor: '::',
												_0: '1946',
												_1: {
													ctor: '::',
													_0: '1950',
													_1: {
														ctor: '::',
														_0: '1964',
														_1: {
															ctor: '::',
															_0: '1971',
															_1: {
																ctor: '::',
																_0: '1981',
																_1: {
																	ctor: '::',
																	_0: '1985',
																	_1: {
																		ctor: '::',
																		_0: '1989',
																		_1: {
																			ctor: '::',
																			_0: '1990',
																			_1: {
																				ctor: '::',
																				_0: '1991',
																				_1: {
																					ctor: '::',
																					_0: '1992',
																					_1: {
																						ctor: '::',
																						_0: '1993',
																						_1: {
																							ctor: '::',
																							_0: '1994',
																							_1: {
																								ctor: '::',
																								_0: '1995',
																								_1: {
																									ctor: '::',
																									_0: '1996',
																									_1: {
																										ctor: '::',
																										_0: '1997',
																										_1: {
																											ctor: '::',
																											_0: '1998',
																											_1: {
																												ctor: '::',
																												_0: '1999',
																												_1: {
																													ctor: '::',
																													_0: '2000',
																													_1: {
																														ctor: '::',
																														_0: '2001',
																														_1: {
																															ctor: '::',
																															_0: '2002',
																															_1: {
																																ctor: '::',
																																_0: '2003',
																																_1: {
																																	ctor: '::',
																																	_0: '2004',
																																	_1: {
																																		ctor: '::',
																																		_0: '2005',
																																		_1: {
																																			ctor: '::',
																																			_0: '2006',
																																			_1: {
																																				ctor: '::',
																																				_0: '2007',
																																				_1: {
																																					ctor: '::',
																																					_0: '2008',
																																					_1: {
																																						ctor: '::',
																																						_0: '2009',
																																						_1: {
																																							ctor: '::',
																																							_0: '2010',
																																							_1: {
																																								ctor: '::',
																																								_0: '2011',
																																								_1: {
																																									ctor: '::',
																																									_0: '2012',
																																									_1: {
																																										ctor: '::',
																																										_0: '2013',
																																										_1: {
																																											ctor: '::',
																																											_0: '2014',
																																											_1: {ctor: '[]'}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}),
				A3(
					_gicentre$elm_vega$VegaLite$dataColumn,
					'population',
					_gicentre$elm_vega$VegaLite$Numbers(
						{
							ctor: '::',
							_0: 1309,
							_1: {
								ctor: '::',
								_0: 1558,
								_1: {
									ctor: '::',
									_0: 4512,
									_1: {
										ctor: '::',
										_0: 8180,
										_1: {
											ctor: '::',
											_0: 15915,
											_1: {
												ctor: '::',
												_0: 24824,
												_1: {
													ctor: '::',
													_0: 28275,
													_1: {
														ctor: '::',
														_0: 29189,
														_1: {
															ctor: '::',
															_0: 29881,
															_1: {
																ctor: '::',
																_0: 26007,
																_1: {
																	ctor: '::',
																	_0: 24029,
																	_1: {
																		ctor: '::',
																		_0: 23340,
																		_1: {
																			ctor: '::',
																			_0: 22307,
																			_1: {
																				ctor: '::',
																				_0: 22087,
																				_1: {
																					ctor: '::',
																					_0: 22139,
																					_1: {
																						ctor: '::',
																						_0: 22105,
																						_1: {
																							ctor: '::',
																							_0: 22242,
																							_1: {
																								ctor: '::',
																								_0: 22801,
																								_1: {
																									ctor: '::',
																									_0: 24273,
																									_1: {
																										ctor: '::',
																										_0: 25640,
																										_1: {
																											ctor: '::',
																											_0: 27393,
																											_1: {
																												ctor: '::',
																												_0: 29505,
																												_1: {
																													ctor: '::',
																													_0: 32124,
																													_1: {
																														ctor: '::',
																														_0: 33791,
																														_1: {
																															ctor: '::',
																															_0: 35297,
																															_1: {
																																ctor: '::',
																																_0: 36179,
																																_1: {
																																	ctor: '::',
																																	_0: 36829,
																																	_1: {
																																		ctor: '::',
																																		_0: 37493,
																																		_1: {
																																			ctor: '::',
																																			_0: 38376,
																																			_1: {
																																				ctor: '::',
																																				_0: 39008,
																																				_1: {
																																					ctor: '::',
																																					_0: 39366,
																																					_1: {
																																						ctor: '::',
																																						_0: 39821,
																																						_1: {
																																							ctor: '::',
																																							_0: 40179,
																																							_1: {
																																								ctor: '::',
																																								_0: 40511,
																																								_1: {
																																									ctor: '::',
																																									_0: 40465,
																																									_1: {
																																										ctor: '::',
																																										_0: 40905,
																																										_1: {
																																											ctor: '::',
																																											_0: 41258,
																																											_1: {
																																												ctor: '::',
																																												_0: 41777,
																																												_1: {ctor: '[]'}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}),
					_p51)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('The population of the German city of Falkensee over time with annotated time periods highlighted.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$width(500),
				_1: {
					ctor: '::',
					_0: data(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$layer(
							{
								ctor: '::',
								_0: specRects,
								_1: {
									ctor: '::',
									_0: specLine,
									_1: {
										ctor: '::',
										_0: specPoints,
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer11 = function () {
	var encLine = function (_p52) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Year'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Year),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p52)));
	};
	var specLine = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Line,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encLine(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encBand = function (_p53) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Year'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Year),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$CI0),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxTitle('Miles/Gallon'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y2,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$CI1),
									_1: {ctor: '[]'}
								}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$opacity,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MNumber(0.3),
								_1: {ctor: '[]'}
							},
							_p53)))));
	};
	var specBand = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Area,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encBand(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Line chart with confidence interval band.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$layer(
						{
							ctor: '::',
							_0: specBand,
							_1: {
								ctor: '::',
								_0: specLine,
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer10 = function () {
	var encRect = function (_p54) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$Y,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('lower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y2,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('upper'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$opacity,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MNumber(0.2),
							_1: {ctor: '[]'}
						},
						_p54))));
	};
	var specRect = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rect,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encRect(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encMean = function (_p55) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$Y,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('mean_MPG'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				_p55));
	};
	var specMean = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rule,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encMean(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var trans = function (_p56) {
		return _gicentre$elm_vega$VegaLite$transform(
			A3(
				_gicentre$elm_vega$VegaLite$aggregate,
				{
					ctor: '::',
					_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Mean, 'Miles_per_Gallon', 'mean_MPG'),
					_1: {
						ctor: '::',
						_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Stdev, 'Miles_per_Gallon', 'dev_MPG'),
						_1: {ctor: '[]'}
					}
				},
				{ctor: '[]'},
				A3(
					_gicentre$elm_vega$VegaLite$calculateAs,
					'datum.mean_MPG+datum.dev_MPG',
					'upper',
					A3(_gicentre$elm_vega$VegaLite$calculateAs, 'datum.mean_MPG-datum.dev_MPG', 'lower', _p56))));
	};
	var specSpread = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: trans(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$layer(
					{
						ctor: '::',
						_0: specMean,
						_1: {
							ctor: '::',
							_0: specRect,
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
	var encPoints = function (_p57) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p57)));
	};
	var specPoints = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Point,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encPoints(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('A scatterplot showing horsepower and miles per gallon for various cars with a global mean and standard deviation overlay.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$layer(
						{
							ctor: '::',
							_0: specPoints,
							_1: {
								ctor: '::',
								_0: specSpread,
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer9 = function () {
	var encMean = function (_p58) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('IMDB_Rating'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
							_1: {ctor: '[]'}
						}
					}
				},
				A2(
					_gicentre$elm_vega$VegaLite$color,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$MString('red'),
						_1: {ctor: '[]'}
					},
					A2(
						_gicentre$elm_vega$VegaLite$size,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MNumber(5),
							_1: {ctor: '[]'}
						},
						_p58))));
	};
	var specMean = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rule,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encMean(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encBars = function (_p59) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('IMDB_Rating'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Count),
							_1: {ctor: '[]'}
						}
					},
					_p59)));
	};
	var specBars = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Bar,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encBars(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Histogram with global mean overlay.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/movies.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$layer(
						{
							ctor: '::',
							_0: specBars,
							_1: {
								ctor: '::',
								_0: specMean,
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer8 = function () {
	var encStdevs = function (_p60) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('upper'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$X2,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('lower'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('variety'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
								_1: {ctor: '[]'}
							}
						},
						_p60))));
	};
	var specStdevs = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rule,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encStdevs(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encMeans = function (_p61) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('mean'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SZero(false),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle('Barley Yield'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('variety'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MString('black'),
							_1: {ctor: '[]'}
						},
						_p61))));
	};
	var specMeans = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Point,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MFilled(true),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encMeans(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var trans = function (_p62) {
		return _gicentre$elm_vega$VegaLite$transform(
			A3(
				_gicentre$elm_vega$VegaLite$aggregate,
				{
					ctor: '::',
					_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Mean, 'yield', 'mean'),
					_1: {
						ctor: '::',
						_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Stdev, 'yield', 'stdev'),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: 'variety',
					_1: {ctor: '[]'}
				},
				A3(
					_gicentre$elm_vega$VegaLite$calculateAs,
					'datum.mean-datum.stdev',
					'lower',
					A3(_gicentre$elm_vega$VegaLite$calculateAs, 'datum.mean+datum.stdev', 'upper', _p62))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Error bars showing standard deviation.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/barley.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$layer(
							{
								ctor: '::',
								_0: specMeans,
								_1: {
									ctor: '::',
									_0: specStdevs,
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer7 = function () {
	var encCIs = function (_p63) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('yield'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$CI0),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$X2,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('yield'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$CI1),
								_1: {ctor: '[]'}
							}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('variety'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
								_1: {ctor: '[]'}
							}
						},
						_p63))));
	};
	var specCIs = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rule,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encCIs(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encPoints = function (_p64) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('yield'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SZero(false),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxTitle('Barley Yield'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('variety'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MString('black'),
							_1: {ctor: '[]'}
						},
						_p64))));
	};
	var specPoints = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Point,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MFilled(true),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encPoints(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Error bars showing confidence intervals');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/barley.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$layer(
						{
							ctor: '::',
							_0: specPoints,
							_1: {
								ctor: '::',
								_0: specCIs,
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer6 = function () {
	var encBar = function (_p65) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$YearMonthDate),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('open'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y2,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('close'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$size,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MNumber(5),
								_1: {ctor: '[]'}
							},
							A2(
								_gicentre$elm_vega$VegaLite$color,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MName('isIncrease'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$MLegend(
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}
									}
								},
								_p65))))));
	};
	var specBar = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Bar,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encBar(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encLine = function (_p66) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$YearMonthDate),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SDomain(
											_gicentre$elm_vega$VegaLite$DDateTimes(
												{
													ctor: '::',
													_0: {
														ctor: '::',
														_0: _gicentre$elm_vega$VegaLite$DTMonth(_gicentre$elm_vega$VegaLite$May),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$VegaLite$DTDate(31),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$VegaLite$DTYear(2009),
																_1: {ctor: '[]'}
															}
														}
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '::',
															_0: _gicentre$elm_vega$VegaLite$DTMonth(_gicentre$elm_vega$VegaLite$Jul),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$VegaLite$DTDate(1),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$VegaLite$DTYear(2009),
																	_1: {ctor: '[]'}
																}
															}
														},
														_1: {ctor: '[]'}
													}
												})),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxTitle('Date in 2009'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$AxFormat('%m/%d'),
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('low'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SZero(false),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y2,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('high'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$color,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MName('isIncrease'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MLegend(
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$MScale(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$VegaLite$SRange(
														_gicentre$elm_vega$VegaLite$RStrings(
															{
																ctor: '::',
																_0: '#ae1325',
																_1: {
																	ctor: '::',
																	_0: '#06982d',
																	_1: {ctor: '[]'}
																}
															})),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							},
							_p66)))));
	};
	var specLine = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rule,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encLine(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var trans = function (_p67) {
		return _gicentre$elm_vega$VegaLite$transform(
			A3(_gicentre$elm_vega$VegaLite$calculateAs, 'datum.open > datum.close', 'isIncrease', _p67));
	};
	var data = function (_p68) {
		return A2(
			_gicentre$elm_vega$VegaLite$dataFromColumns,
			{ctor: '[]'},
			A3(
				_gicentre$elm_vega$VegaLite$dataColumn,
				'date',
				_gicentre$elm_vega$VegaLite$Strings(
					{
						ctor: '::',
						_0: '01-Jun-2009',
						_1: {
							ctor: '::',
							_0: '02-Jun-2009',
							_1: {
								ctor: '::',
								_0: '03-Jun-2009',
								_1: {
									ctor: '::',
									_0: '04-Jun-2009',
									_1: {
										ctor: '::',
										_0: '05-Jun-2009',
										_1: {
											ctor: '::',
											_0: '08-Jun-2009',
											_1: {
												ctor: '::',
												_0: '09-Jun-2009',
												_1: {
													ctor: '::',
													_0: '10-Jun-2009',
													_1: {
														ctor: '::',
														_0: '11-Jun-2009',
														_1: {
															ctor: '::',
															_0: '12-Jun-2009',
															_1: {
																ctor: '::',
																_0: '15-Jun-2009',
																_1: {
																	ctor: '::',
																	_0: '16-Jun-2009',
																	_1: {
																		ctor: '::',
																		_0: '17-Jun-2009',
																		_1: {
																			ctor: '::',
																			_0: '18-Jun-2009',
																			_1: {
																				ctor: '::',
																				_0: '19-Jun-2009',
																				_1: {
																					ctor: '::',
																					_0: '22-Jun-2009',
																					_1: {
																						ctor: '::',
																						_0: '23-Jun-2009',
																						_1: {
																							ctor: '::',
																							_0: '24-Jun-2009',
																							_1: {
																								ctor: '::',
																								_0: '25-Jun-2009',
																								_1: {
																									ctor: '::',
																									_0: '26-Jun-2009',
																									_1: {
																										ctor: '::',
																										_0: '29-Jun-2009',
																										_1: {
																											ctor: '::',
																											_0: '30-Jun-2009',
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}),
				A3(
					_gicentre$elm_vega$VegaLite$dataColumn,
					'open',
					_gicentre$elm_vega$VegaLite$Numbers(
						{
							ctor: '::',
							_0: 28.7,
							_1: {
								ctor: '::',
								_0: 30.04,
								_1: {
									ctor: '::',
									_0: 29.62,
									_1: {
										ctor: '::',
										_0: 31.02,
										_1: {
											ctor: '::',
											_0: 29.39,
											_1: {
												ctor: '::',
												_0: 30.84,
												_1: {
													ctor: '::',
													_0: 29.77,
													_1: {
														ctor: '::',
														_0: 26.9,
														_1: {
															ctor: '::',
															_0: 27.36,
															_1: {
																ctor: '::',
																_0: 28.08,
																_1: {
																	ctor: '::',
																	_0: 29.7,
																	_1: {
																		ctor: '::',
																		_0: 30.81,
																		_1: {
																			ctor: '::',
																			_0: 31.19,
																			_1: {
																				ctor: '::',
																				_0: 31.54,
																				_1: {
																					ctor: '::',
																					_0: 29.16,
																					_1: {
																						ctor: '::',
																						_0: 30.4,
																						_1: {
																							ctor: '::',
																							_0: 31.3,
																							_1: {
																								ctor: '::',
																								_0: 30.58,
																								_1: {
																									ctor: '::',
																									_0: 29.45,
																									_1: {
																										ctor: '::',
																										_0: 27.09,
																										_1: {
																											ctor: '::',
																											_0: 25.93,
																											_1: {
																												ctor: '::',
																												_0: 25.36,
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}),
					A3(
						_gicentre$elm_vega$VegaLite$dataColumn,
						'high',
						_gicentre$elm_vega$VegaLite$Numbers(
							{
								ctor: '::',
								_0: 30.05,
								_1: {
									ctor: '::',
									_0: 30.13,
									_1: {
										ctor: '::',
										_0: 31.79,
										_1: {
											ctor: '::',
											_0: 31.02,
											_1: {
												ctor: '::',
												_0: 30.81,
												_1: {
													ctor: '::',
													_0: 31.82,
													_1: {
														ctor: '::',
														_0: 29.77,
														_1: {
															ctor: '::',
															_0: 29.74,
															_1: {
																ctor: '::',
																_0: 28.11,
																_1: {
																	ctor: '::',
																	_0: 28.5,
																	_1: {
																		ctor: '::',
																		_0: 31.09,
																		_1: {
																			ctor: '::',
																			_0: 32.75,
																			_1: {
																				ctor: '::',
																				_0: 32.77,
																				_1: {
																					ctor: '::',
																					_0: 31.54,
																					_1: {
																						ctor: '::',
																						_0: 29.32,
																						_1: {
																							ctor: '::',
																							_0: 32.05,
																							_1: {
																								ctor: '::',
																								_0: 31.54,
																								_1: {
																									ctor: '::',
																									_0: 30.58,
																									_1: {
																										ctor: '::',
																										_0: 29.56,
																										_1: {
																											ctor: '::',
																											_0: 27.22,
																											_1: {
																												ctor: '::',
																												_0: 27.18,
																												_1: {
																													ctor: '::',
																													_0: 27.38,
																													_1: {ctor: '[]'}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}),
						A3(
							_gicentre$elm_vega$VegaLite$dataColumn,
							'low',
							_gicentre$elm_vega$VegaLite$Numbers(
								{
									ctor: '::',
									_0: 28.45,
									_1: {
										ctor: '::',
										_0: 28.3,
										_1: {
											ctor: '::',
											_0: 29.62,
											_1: {
												ctor: '::',
												_0: 29.92,
												_1: {
													ctor: '::',
													_0: 28.85,
													_1: {
														ctor: '::',
														_0: 26.41,
														_1: {
															ctor: '::',
															_0: 27.79,
															_1: {
																ctor: '::',
																_0: 26.9,
																_1: {
																	ctor: '::',
																	_0: 26.81,
																	_1: {
																		ctor: '::',
																		_0: 27.73,
																		_1: {
																			ctor: '::',
																			_0: 29.64,
																			_1: {
																				ctor: '::',
																				_0: 30.07,
																				_1: {
																					ctor: '::',
																					_0: 30.64,
																					_1: {
																						ctor: '::',
																						_0: 29.6,
																						_1: {
																							ctor: '::',
																							_0: 27.56,
																							_1: {
																								ctor: '::',
																								_0: 30.3,
																								_1: {
																									ctor: '::',
																									_0: 27.83,
																									_1: {
																										ctor: '::',
																										_0: 28.79,
																										_1: {
																											ctor: '::',
																											_0: 26.3,
																											_1: {
																												ctor: '::',
																												_0: 25.76,
																												_1: {
																													ctor: '::',
																													_0: 25.29,
																													_1: {
																														ctor: '::',
																														_0: 25.02,
																														_1: {ctor: '[]'}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}),
							A3(
								_gicentre$elm_vega$VegaLite$dataColumn,
								'close',
								_gicentre$elm_vega$VegaLite$Numbers(
									{
										ctor: '::',
										_0: 30.04,
										_1: {
											ctor: '::',
											_0: 29.63,
											_1: {
												ctor: '::',
												_0: 31.02,
												_1: {
													ctor: '::',
													_0: 30.18,
													_1: {
														ctor: '::',
														_0: 29.62,
														_1: {
															ctor: '::',
															_0: 29.77,
															_1: {
																ctor: '::',
																_0: 28.27,
																_1: {
																	ctor: '::',
																	_0: 28.46,
																	_1: {
																		ctor: '::',
																		_0: 28.11,
																		_1: {
																			ctor: '::',
																			_0: 28.15,
																			_1: {
																				ctor: '::',
																				_0: 30.81,
																				_1: {
																					ctor: '::',
																					_0: 32.68,
																					_1: {
																						ctor: '::',
																						_0: 31.54,
																						_1: {
																							ctor: '::',
																							_0: 30.03,
																							_1: {
																								ctor: '::',
																								_0: 27.99,
																								_1: {
																									ctor: '::',
																									_0: 31.17,
																									_1: {
																										ctor: '::',
																										_0: 30.58,
																										_1: {
																											ctor: '::',
																											_0: 29.05,
																											_1: {
																												ctor: '::',
																												_0: 26.36,
																												_1: {
																													ctor: '::',
																													_0: 25.93,
																													_1: {
																														ctor: '::',
																														_0: 25.35,
																														_1: {
																															ctor: '::',
																															_0: 26.35,
																															_1: {ctor: '[]'}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}),
								A3(
									_gicentre$elm_vega$VegaLite$dataColumn,
									'signal',
									_gicentre$elm_vega$VegaLite$Strings(
										{
											ctor: '::',
											_0: 'short',
											_1: {
												ctor: '::',
												_0: 'short',
												_1: {
													ctor: '::',
													_0: 'short',
													_1: {
														ctor: '::',
														_0: 'short',
														_1: {
															ctor: '::',
															_0: 'short',
															_1: {
																ctor: '::',
																_0: 'short',
																_1: {
																	ctor: '::',
																	_0: 'short',
																	_1: {
																		ctor: '::',
																		_0: 'short',
																		_1: {
																			ctor: '::',
																			_0: 'short',
																			_1: {
																				ctor: '::',
																				_0: 'short',
																				_1: {
																					ctor: '::',
																					_0: 'long',
																					_1: {
																						ctor: '::',
																						_0: 'short',
																						_1: {
																							ctor: '::',
																							_0: 'short',
																							_1: {
																								ctor: '::',
																								_0: 'short',
																								_1: {
																									ctor: '::',
																									_0: 'short',
																									_1: {
																										ctor: '::',
																										_0: 'short',
																										_1: {
																											ctor: '::',
																											_0: 'short',
																											_1: {
																												ctor: '::',
																												_0: 'long',
																												_1: {
																													ctor: '::',
																													_0: 'long',
																													_1: {
																														ctor: '::',
																														_0: 'long',
																														_1: {
																															ctor: '::',
																															_0: 'long',
																															_1: {
																																ctor: '::',
																																_0: 'long',
																																_1: {ctor: '[]'}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}),
									A3(
										_gicentre$elm_vega$VegaLite$dataColumn,
										'ret',
										_gicentre$elm_vega$VegaLite$Numbers(
											{
												ctor: '::',
												_0: -4.89396411092985,
												_1: {
													ctor: '::',
													_0: -0.322580645161295,
													_1: {
														ctor: '::',
														_0: 3.68663594470045,
														_1: {
															ctor: '::',
															_0: 4.51010886469673,
															_1: {
																ctor: '::',
																_0: 6.08424336973478,
																_1: {
																	ctor: '::',
																	_0: 1.2539184952978,
																	_1: {
																		ctor: '::',
																		_0: -5.02431118314424,
																		_1: {
																			ctor: '::',
																			_0: -5.46623794212217,
																			_1: {
																				ctor: '::',
																				_0: -8.3743842364532,
																				_1: {
																					ctor: '::',
																					_0: -5.52763819095477,
																					_1: {
																						ctor: '::',
																						_0: 3.4920634920635,
																						_1: {
																							ctor: '::',
																							_0: 0.155038759689914,
																							_1: {
																								ctor: '::',
																								_0: 5.82822085889571,
																								_1: {
																									ctor: '::',
																									_0: 8.17610062893082,
																									_1: {
																										ctor: '::',
																										_0: 8.59872611464968,
																										_1: {
																											ctor: '::',
																											_0: 15.4907975460123,
																											_1: {
																												ctor: '::',
																												_0: 11.7370892018779,
																												_1: {
																													ctor: '::',
																													_0: -10.4234527687296,
																													_1: {
																														ctor: '::',
																														_0: 0,
																														_1: {
																															ctor: '::',
																															_0: 0,
																															_1: {
																																ctor: '::',
																																_0: 5.26315789473684,
																																_1: {
																																	ctor: '::',
																																	_0: 6.73758865248228,
																																	_1: {ctor: '[]'}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}),
										_p68))))))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A candlestick chart inspired by Protovis (http://mbostock.github.io/protovis/ex/candlestick.html)');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$width(320),
				_1: {
					ctor: '::',
					_0: data(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: trans(
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$layer(
								{
									ctor: '::',
									_0: specLine,
									_1: {
										ctor: '::',
										_0: specBar,
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer5 = function () {
	var encBoxMid = function (_p69) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('midBox'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MString('white'),
							_1: {ctor: '[]'}
						},
						A2(
							_gicentre$elm_vega$VegaLite$size,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MNumber(5),
								_1: {ctor: '[]'}
							},
							_p69)))));
	};
	var specBoxMid = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Tick,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MStyle(
						{
							ctor: '::',
							_0: 'boxMid',
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encBoxMid(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encBox = function (_p70) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('lowerBox'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y2,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('upperBox'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$size,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MNumber(5),
								_1: {ctor: '[]'}
							},
							_p70)))));
	};
	var specBox = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Bar,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MStyle(
						{
							ctor: '::',
							_0: 'box',
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encBox(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encUWhisker = function (_p71) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('upperBox'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y2,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('upperWhisker'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						_p71))));
	};
	var specUWhisker = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rule,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MStyle(
						{
							ctor: '::',
							_0: 'boxWhisker',
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encUWhisker(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encLWhisker = function (_p72) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('lowerWhisker'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle('Population'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y2,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('lowerBox'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						_p72))));
	};
	var specLWhisker = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rule,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MStyle(
						{
							ctor: '::',
							_0: 'boxWhisker',
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encLWhisker(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var trans = function (_p73) {
		return _gicentre$elm_vega$VegaLite$transform(
			A3(
				_gicentre$elm_vega$VegaLite$aggregate,
				{
					ctor: '::',
					_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Q1, 'people', 'lowerBox'),
					_1: {
						ctor: '::',
						_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Median, 'people', 'midBox'),
						_1: {
							ctor: '::',
							_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Q3, 'people', 'upperBox'),
							_1: {ctor: '[]'}
						}
					}
				},
				{
					ctor: '::',
					_0: 'age',
					_1: {ctor: '[]'}
				},
				A3(
					_gicentre$elm_vega$VegaLite$calculateAs,
					'datum.upperBox - datum.lowerBox',
					'IQR',
					A3(
						_gicentre$elm_vega$VegaLite$calculateAs,
						'datum.upperBox + datum.IQR * 1.5',
						'upperWhisker',
						A3(_gicentre$elm_vega$VegaLite$calculateAs, 'max(0,datum.lowerBox - datum.IQR *1.5)', 'lowerWhisker', _p73)))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A Tukey box plot showing median and interquartile range in the US population distribution of age groups in 2000. This isn\'t strictly a Tukey box plot as the IQR extends beyond the min/max values for some age cohorts.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/population.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$layer(
							{
								ctor: '::',
								_0: specLWhisker,
								_1: {
									ctor: '::',
									_0: specUWhisker,
									_1: {
										ctor: '::',
										_0: specBox,
										_1: {
											ctor: '::',
											_0: specBoxMid,
											_1: {ctor: '[]'}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer4 = function () {
	var encBoxMid = function (_p74) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('midBox'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MString('white'),
							_1: {ctor: '[]'}
						},
						A2(
							_gicentre$elm_vega$VegaLite$size,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MNumber(5),
								_1: {ctor: '[]'}
							},
							_p74)))));
	};
	var specBoxMid = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Tick,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MStyle(
						{
							ctor: '::',
							_0: 'boxMid',
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encBoxMid(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encBox = function (_p75) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('lowerBox'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y2,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('upperBox'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$size,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MNumber(5),
								_1: {ctor: '[]'}
							},
							_p75)))));
	};
	var specBox = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Bar,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MStyle(
						{
							ctor: '::',
							_0: 'box',
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encBox(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encUWhisker = function (_p76) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('upperBox'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y2,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('upperWhisker'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						_p76))));
	};
	var specUWhisker = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rule,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MStyle(
						{
							ctor: '::',
							_0: 'boxWhisker',
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encUWhisker(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encLWhisker = function (_p77) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('lowerWhisker'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle('Population'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y2,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('lowerBox'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						_p77))));
	};
	var specLWhisker = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rule,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MStyle(
						{
							ctor: '::',
							_0: 'boxWhisker',
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encLWhisker(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var trans = function (_p78) {
		return _gicentre$elm_vega$VegaLite$transform(
			A3(
				_gicentre$elm_vega$VegaLite$aggregate,
				{
					ctor: '::',
					_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Min, 'people', 'lowerWhisker'),
					_1: {
						ctor: '::',
						_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Q1, 'people', 'lowerBox'),
						_1: {
							ctor: '::',
							_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Median, 'people', 'midBox'),
							_1: {
								ctor: '::',
								_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Q3, 'people', 'upperBox'),
								_1: {
									ctor: '::',
									_0: A3(_gicentre$elm_vega$VegaLite$opAs, _gicentre$elm_vega$VegaLite$Max, 'people', 'upperWhisker'),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				},
				{
					ctor: '::',
					_0: 'age',
					_1: {ctor: '[]'}
				},
				_p78));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A vertical 2D box plot showing median, min, and max in the US population distribution of age groups in 2000.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/population.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$layer(
							{
								ctor: '::',
								_0: specLWhisker,
								_1: {
									ctor: '::',
									_0: specUWhisker,
									_1: {
										ctor: '::',
										_0: specBox,
										_1: {
											ctor: '::',
											_0: specBoxMid,
											_1: {ctor: '[]'}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer3 = function () {
	var config = function (_p79) {
		return _gicentre$elm_vega$VegaLite$configure(
			A2(
				_gicentre$elm_vega$VegaLite$configuration,
				_gicentre$elm_vega$VegaLite$Scale(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$SCBandPaddingInner(0),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$SCBandPaddingOuter(0),
							_1: {ctor: '[]'}
						}
					}),
				A2(
					_gicentre$elm_vega$VegaLite$configuration,
					_gicentre$elm_vega$VegaLite$TextStyle(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MBaseline(_gicentre$elm_vega$VegaLite$AlignMiddle),
							_1: {ctor: '[]'}
						}),
					_p79)));
	};
	var encText = function (_p80) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Cylinders'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Origin'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MString('white'),
							_1: {ctor: '[]'}
						},
						A2(
							_gicentre$elm_vega$VegaLite$text,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$TName('*'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$TmType(_gicentre$elm_vega$VegaLite$Quantitative),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$TAggregate(_gicentre$elm_vega$VegaLite$Count),
										_1: {ctor: '[]'}
									}
								}
							},
							_p80)))));
	};
	var specText = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Text,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encText(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encRect = function (_p81) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Cylinders'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Origin'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('*'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MAggregate(_gicentre$elm_vega$VegaLite$Count),
									_1: {ctor: '[]'}
								}
							}
						},
						_p81))));
	};
	var specRect = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rect,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encRect(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Layering text over \'heatmap\'.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$layer(
						{
							ctor: '::',
							_0: specRect,
							_1: {
								ctor: '::',
								_0: specText,
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: config(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer2 = function () {
	var encLine = function (_p82) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$Y,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('precipitation'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
							_1: {ctor: '[]'}
						}
					}
				},
				A2(
					_gicentre$elm_vega$VegaLite$color,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$MString('red'),
						_1: {ctor: '[]'}
					},
					A2(
						_gicentre$elm_vega$VegaLite$size,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MNumber(3),
							_1: {ctor: '[]'}
						},
						_p82))));
	};
	var specLine = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Rule,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encLine(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encBar = function (_p83) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p83)));
	};
	var specBar = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Bar,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encBar(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var des = _gicentre$elm_vega$VegaLite$description('Monthly precipitation with mean value overlay.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/seattle-weather.csv',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$layer(
						{
							ctor: '::',
							_0: specBar,
							_1: {
								ctor: '::',
								_0: specLine,
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$layer1 = function () {
	var config = function (_p84) {
		return _gicentre$elm_vega$VegaLite$configure(
			A2(
				_gicentre$elm_vega$VegaLite$configuration,
				A2(
					_gicentre$elm_vega$VegaLite$NamedStyle,
					'label',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$MAlign(_gicentre$elm_vega$VegaLite$AlignLeft),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MBaseline(_gicentre$elm_vega$VegaLite$AlignMiddle),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MdX(3),
								_1: {ctor: '[]'}
							}
						}
					}),
				_p84));
	};
	var encText = function (_p85) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('b'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('a'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$text,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$TName('b'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$TmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						_p85))));
	};
	var specText = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Text,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$MStyle(
						{
							ctor: '::',
							_0: 'label',
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: encText(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var encBar = function (_p86) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('b'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('a'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
							_1: {ctor: '[]'}
						}
					},
					_p86)));
	};
	var specBar = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$mark,
				_gicentre$elm_vega$VegaLite$Bar,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: encBar(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var data = function (_p87) {
		return A2(
			_gicentre$elm_vega$VegaLite$dataFromColumns,
			{ctor: '[]'},
			A3(
				_gicentre$elm_vega$VegaLite$dataColumn,
				'a',
				_gicentre$elm_vega$VegaLite$Strings(
					{
						ctor: '::',
						_0: 'A',
						_1: {
							ctor: '::',
							_0: 'B',
							_1: {
								ctor: '::',
								_0: 'C',
								_1: {ctor: '[]'}
							}
						}
					}),
				A3(
					_gicentre$elm_vega$VegaLite$dataColumn,
					'b',
					_gicentre$elm_vega$VegaLite$Numbers(
						{
							ctor: '::',
							_0: 28,
							_1: {
								ctor: '::',
								_0: 55,
								_1: {
									ctor: '::',
									_0: 43,
									_1: {ctor: '[]'}
								}
							}
						}),
					_p87)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A simple bar chart with embedded data labels.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: data(
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$layer(
						{
							ctor: '::',
							_0: specBar,
							_1: {
								ctor: '::',
								_0: specText,
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: config(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$trellis7 = function () {
	var enc = function (_p88) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAxis(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$AxFormat('%Y'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle('Time'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxGrid(false),
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('price'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle('Time'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxGrid(false),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('symbol'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MLegend(
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$row,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$FName('symbol'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$FmType(_gicentre$elm_vega$VegaLite$Nominal),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$FHeader(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$HTitle('Company'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}
							},
							_p88)))));
	};
	var trans = function (_p89) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FExpr('datum.symbol !== \'GOOG\''),
				_p89));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Stock prices of four large companies as a small multiples of area charts.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$width(300),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$height(40),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$dataFromUrl,
							'data/stocks.csv',
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: trans(
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$VegaLite$mark,
									_gicentre$elm_vega$VegaLite$Area,
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: enc(
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$trellis6 = function () {
	var enc = function (_p90) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('yield'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Median),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SZero(false),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('variety'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PSort(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$ByField('Horsepower'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$Op(_gicentre$elm_vega$VegaLite$Mean),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$Descending,
												_1: {ctor: '[]'}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PScale(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$SRangeStep(
												_elm_lang$core$Maybe$Just(12)),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('year'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$row,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$FName('site'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$FmType(_gicentre$elm_vega$VegaLite$Ordinal),
									_1: {ctor: '[]'}
								}
							},
							_p90)))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('The Trellis display by Becker et al. helped establish small multiples as a “powerful mechanism for understanding interactions in studies of how a response depends on explanatory variables”. Here we reproduce a trellis of Barley yields from the 1930s, complete with main-effects ordering to facilitate comparison.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/barley.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Point,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$trellis5 = function () {
	var enc = function (_p91) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MaxBins(15),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Count),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$row,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$FName('Origin'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$FmType(_gicentre$elm_vega$VegaLite$Ordinal),
								_1: {ctor: '[]'}
							}
						},
						_p91))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Disitributions of car engine power for different countries of origin.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$trellis4 = function () {
	var enc = function (_p92) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Worldwide_Gross'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('US_DVD_Sales'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$column,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$FName('MPAA_Rating'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$FmType(_gicentre$elm_vega$VegaLite$Ordinal),
								_1: {ctor: '[]'}
							}
						},
						_p92))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Scatterplots of movie takings vs profits for different MPAA ratings.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/movies.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Point,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$trellis3 = function () {
	var enc = function (_p93) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('yield'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('variety'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Nominal),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('site'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$column,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$FName('year'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$FmType(_gicentre$elm_vega$VegaLite$Ordinal),
									_1: {ctor: '[]'}
								}
							},
							_p93)))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Barley crop yields in 1931 and 1932 shown as stacked bar charts.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/barley.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$trellis2 = function () {
	var enc = function (_p94) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SRangeStep(
										_elm_lang$core$Maybe$Just(17)),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('people'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxTitle('Population'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('gender'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MScale(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$SRange(
												_gicentre$elm_vega$VegaLite$RStrings(
													{
														ctor: '::',
														_0: '#EA98D2',
														_1: {
															ctor: '::',
															_0: '#659CCA',
															_1: {ctor: '[]'}
														}
													})),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$row,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$FName('gender'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$FmType(_gicentre$elm_vega$VegaLite$Nominal),
									_1: {ctor: '[]'}
								}
							},
							_p94)))));
	};
	var trans = function (_p95) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FExpr('datum.year == 2000'),
				A3(_gicentre$elm_vega$VegaLite$calculateAs, 'datum.sex == 2 ? \'Female\' : \'Male\'', 'gender', _p95)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A trellis bar chart showing the US population distribution of age groups and gender in 2000.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/population.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$mark,
							_gicentre$elm_vega$VegaLite$Bar,
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: enc(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$trellis1 = function () {
	var enc = function (_p96) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('X'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SZero(false),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Y'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SZero(false),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$opacity,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MNumber(1),
							_1: {ctor: '[]'}
						},
						A2(
							_gicentre$elm_vega$VegaLite$column,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$FName('Series'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$FmType(_gicentre$elm_vega$VegaLite$Ordinal),
									_1: {ctor: '[]'}
								}
							},
							_p96)))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Anscombe\'s Quartet');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/anscombe.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Circle,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$stack8 = function () {
	var enc = function (_p97) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('percentage_start'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAxis(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$AxTitle('Percentage'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$X2,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('percentage_end'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$Y,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('question'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxTitle('Question'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$AxOffset(5),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$VegaLite$AxTicks(false),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$VegaLite$AxMinExtent(60),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$VegaLite$AxDomain(false),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$color,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MName('type'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MLegend(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$LTitle('Response'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$MScale(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$VegaLite$SType(_gicentre$elm_vega$VegaLite$ScOrdinal),
													_1: _gicentre$elm_vega$VegaLite$categoricalDomainMap(
														{
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: 'Strongly disagree', _1: '#c30d24'},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 'Disagree', _1: '#f3a583'},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: 'Neither agree nor disagree', _1: '#cccccc'},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: 'Agree', _1: '#94c6da'},
																		_1: {
																			ctor: '::',
																			_0: {ctor: '_Tuple2', _0: 'Strongly agree', _1: '#1770ab'},
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														})
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							},
							_p97)))));
	};
	var data = function (_p98) {
		return A2(
			_gicentre$elm_vega$VegaLite$dataFromColumns,
			{ctor: '[]'},
			A3(
				_gicentre$elm_vega$VegaLite$dataColumn,
				'question',
				_gicentre$elm_vega$VegaLite$Strings(
					{
						ctor: '::',
						_0: 'Q1',
						_1: {
							ctor: '::',
							_0: 'Q1',
							_1: {
								ctor: '::',
								_0: 'Q1',
								_1: {
									ctor: '::',
									_0: 'Q1',
									_1: {
										ctor: '::',
										_0: 'Q1',
										_1: {
											ctor: '::',
											_0: 'Q2',
											_1: {
												ctor: '::',
												_0: 'Q2',
												_1: {
													ctor: '::',
													_0: 'Q2',
													_1: {
														ctor: '::',
														_0: 'Q2',
														_1: {
															ctor: '::',
															_0: 'Q2',
															_1: {
																ctor: '::',
																_0: 'Q3',
																_1: {
																	ctor: '::',
																	_0: 'Q3',
																	_1: {
																		ctor: '::',
																		_0: 'Q3',
																		_1: {
																			ctor: '::',
																			_0: 'Q3',
																			_1: {
																				ctor: '::',
																				_0: 'Q3',
																				_1: {
																					ctor: '::',
																					_0: 'Q4',
																					_1: {
																						ctor: '::',
																						_0: 'Q4',
																						_1: {
																							ctor: '::',
																							_0: 'Q4',
																							_1: {
																								ctor: '::',
																								_0: 'Q4',
																								_1: {
																									ctor: '::',
																									_0: 'Q4',
																									_1: {
																										ctor: '::',
																										_0: 'Q5',
																										_1: {
																											ctor: '::',
																											_0: 'Q5',
																											_1: {
																												ctor: '::',
																												_0: 'Q5',
																												_1: {
																													ctor: '::',
																													_0: 'Q5',
																													_1: {
																														ctor: '::',
																														_0: 'Q5',
																														_1: {
																															ctor: '::',
																															_0: 'Q6',
																															_1: {
																																ctor: '::',
																																_0: 'Q6',
																																_1: {
																																	ctor: '::',
																																	_0: 'Q6',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Q6',
																																		_1: {
																																			ctor: '::',
																																			_0: 'Q6',
																																			_1: {
																																				ctor: '::',
																																				_0: 'Q7',
																																				_1: {
																																					ctor: '::',
																																					_0: 'Q7',
																																					_1: {
																																						ctor: '::',
																																						_0: 'Q7',
																																						_1: {
																																							ctor: '::',
																																							_0: 'Q7',
																																							_1: {
																																								ctor: '::',
																																								_0: 'Q7',
																																								_1: {
																																									ctor: '::',
																																									_0: 'Q8',
																																									_1: {
																																										ctor: '::',
																																										_0: 'Q8',
																																										_1: {
																																											ctor: '::',
																																											_0: 'Q8',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Q8',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Q8',
																																													_1: {ctor: '[]'}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}),
				A3(
					_gicentre$elm_vega$VegaLite$dataColumn,
					'type',
					_gicentre$elm_vega$VegaLite$Strings(
						{
							ctor: '::',
							_0: 'Strongly disagree',
							_1: {
								ctor: '::',
								_0: 'Disagree',
								_1: {
									ctor: '::',
									_0: 'Neither agree nor disagree',
									_1: {
										ctor: '::',
										_0: 'Agree',
										_1: {
											ctor: '::',
											_0: 'Strongly agree',
											_1: {
												ctor: '::',
												_0: 'Strongly disagree',
												_1: {
													ctor: '::',
													_0: 'Disagree',
													_1: {
														ctor: '::',
														_0: 'Neither agree nor disagree',
														_1: {
															ctor: '::',
															_0: 'Agree',
															_1: {
																ctor: '::',
																_0: 'Strongly agree',
																_1: {
																	ctor: '::',
																	_0: 'Strongly disagree',
																	_1: {
																		ctor: '::',
																		_0: 'Disagree',
																		_1: {
																			ctor: '::',
																			_0: 'Neither agree nor disagree',
																			_1: {
																				ctor: '::',
																				_0: 'Agree',
																				_1: {
																					ctor: '::',
																					_0: 'Strongly agree',
																					_1: {
																						ctor: '::',
																						_0: 'Strongly disagree',
																						_1: {
																							ctor: '::',
																							_0: 'Disagree',
																							_1: {
																								ctor: '::',
																								_0: 'Neither agree nor disagree',
																								_1: {
																									ctor: '::',
																									_0: 'Agree',
																									_1: {
																										ctor: '::',
																										_0: 'Strongly agree',
																										_1: {
																											ctor: '::',
																											_0: 'Strongly disagree',
																											_1: {
																												ctor: '::',
																												_0: 'Disagree',
																												_1: {
																													ctor: '::',
																													_0: 'Neither agree nor disagree',
																													_1: {
																														ctor: '::',
																														_0: 'Agree',
																														_1: {
																															ctor: '::',
																															_0: 'Strongly agree',
																															_1: {
																																ctor: '::',
																																_0: 'Strongly disagree',
																																_1: {
																																	ctor: '::',
																																	_0: 'Disagree',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Neither agree nor disagree',
																																		_1: {
																																			ctor: '::',
																																			_0: 'Agree',
																																			_1: {
																																				ctor: '::',
																																				_0: 'Strongly agree',
																																				_1: {
																																					ctor: '::',
																																					_0: 'Strongly disagree',
																																					_1: {
																																						ctor: '::',
																																						_0: 'Disagree',
																																						_1: {
																																							ctor: '::',
																																							_0: 'Neither agree nor disagree',
																																							_1: {
																																								ctor: '::',
																																								_0: 'Agree',
																																								_1: {
																																									ctor: '::',
																																									_0: 'Strongly agree',
																																									_1: {
																																										ctor: '::',
																																										_0: 'Strongly disagree',
																																										_1: {
																																											ctor: '::',
																																											_0: 'Disagree',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Neither agree nor disagree',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Agree',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Strongly agree',
																																														_1: {ctor: '[]'}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}),
					A3(
						_gicentre$elm_vega$VegaLite$dataColumn,
						'value',
						_gicentre$elm_vega$VegaLite$Numbers(
							{
								ctor: '::',
								_0: 24,
								_1: {
									ctor: '::',
									_0: 294,
									_1: {
										ctor: '::',
										_0: 594,
										_1: {
											ctor: '::',
											_0: 1927,
											_1: {
												ctor: '::',
												_0: 376,
												_1: {
													ctor: '::',
													_0: 2,
													_1: {
														ctor: '::',
														_0: 2,
														_1: {
															ctor: '::',
															_0: 0,
															_1: {
																ctor: '::',
																_0: 7,
																_1: {
																	ctor: '::',
																	_0: 11,
																	_1: {
																		ctor: '::',
																		_0: 2,
																		_1: {
																			ctor: '::',
																			_0: 0,
																			_1: {
																				ctor: '::',
																				_0: 2,
																				_1: {
																					ctor: '::',
																					_0: 4,
																					_1: {
																						ctor: '::',
																						_0: 2,
																						_1: {
																							ctor: '::',
																							_0: 0,
																							_1: {
																								ctor: '::',
																								_0: 2,
																								_1: {
																									ctor: '::',
																									_0: 1,
																									_1: {
																										ctor: '::',
																										_0: 7,
																										_1: {
																											ctor: '::',
																											_0: 6,
																											_1: {
																												ctor: '::',
																												_0: 0,
																												_1: {
																													ctor: '::',
																													_0: 1,
																													_1: {
																														ctor: '::',
																														_0: 3,
																														_1: {
																															ctor: '::',
																															_0: 16,
																															_1: {
																																ctor: '::',
																																_0: 4,
																																_1: {
																																	ctor: '::',
																																	_0: 1,
																																	_1: {
																																		ctor: '::',
																																		_0: 1,
																																		_1: {
																																			ctor: '::',
																																			_0: 2,
																																			_1: {
																																				ctor: '::',
																																				_0: 9,
																																				_1: {
																																					ctor: '::',
																																					_0: 3,
																																					_1: {
																																						ctor: '::',
																																						_0: 0,
																																						_1: {
																																							ctor: '::',
																																							_0: 0,
																																							_1: {
																																								ctor: '::',
																																								_0: 1,
																																								_1: {
																																									ctor: '::',
																																									_0: 4,
																																									_1: {
																																										ctor: '::',
																																										_0: 0,
																																										_1: {
																																											ctor: '::',
																																											_0: 0,
																																											_1: {
																																												ctor: '::',
																																												_0: 0,
																																												_1: {
																																													ctor: '::',
																																													_0: 0,
																																													_1: {
																																														ctor: '::',
																																														_0: 0,
																																														_1: {
																																															ctor: '::',
																																															_0: 2,
																																															_1: {ctor: '[]'}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}),
						A3(
							_gicentre$elm_vega$VegaLite$dataColumn,
							'percentage',
							_gicentre$elm_vega$VegaLite$Numbers(
								{
									ctor: '::',
									_0: 0.7,
									_1: {
										ctor: '::',
										_0: 9.1,
										_1: {
											ctor: '::',
											_0: 18.5,
											_1: {
												ctor: '::',
												_0: 59.9,
												_1: {
													ctor: '::',
													_0: 11.7,
													_1: {
														ctor: '::',
														_0: 18.2,
														_1: {
															ctor: '::',
															_0: 18.2,
															_1: {
																ctor: '::',
																_0: 0,
																_1: {
																	ctor: '::',
																	_0: 63.6,
																	_1: {
																		ctor: '::',
																		_0: 0,
																		_1: {
																			ctor: '::',
																			_0: 20,
																			_1: {
																				ctor: '::',
																				_0: 0,
																				_1: {
																					ctor: '::',
																					_0: 20,
																					_1: {
																						ctor: '::',
																						_0: 40,
																						_1: {
																							ctor: '::',
																							_0: 20,
																							_1: {
																								ctor: '::',
																								_0: 0,
																								_1: {
																									ctor: '::',
																									_0: 12.5,
																									_1: {
																										ctor: '::',
																										_0: 6.3,
																										_1: {
																											ctor: '::',
																											_0: 43.8,
																											_1: {
																												ctor: '::',
																												_0: 37.5,
																												_1: {
																													ctor: '::',
																													_0: 0,
																													_1: {
																														ctor: '::',
																														_0: 4.2,
																														_1: {
																															ctor: '::',
																															_0: 12.5,
																															_1: {
																																ctor: '::',
																																_0: 66.7,
																																_1: {
																																	ctor: '::',
																																	_0: 16.7,
																																	_1: {
																																		ctor: '::',
																																		_0: 6.3,
																																		_1: {
																																			ctor: '::',
																																			_0: 6.3,
																																			_1: {
																																				ctor: '::',
																																				_0: 12.5,
																																				_1: {
																																					ctor: '::',
																																					_0: 56.3,
																																					_1: {
																																						ctor: '::',
																																						_0: 18.8,
																																						_1: {
																																							ctor: '::',
																																							_0: 0,
																																							_1: {
																																								ctor: '::',
																																								_0: 0,
																																								_1: {
																																									ctor: '::',
																																									_0: 20,
																																									_1: {
																																										ctor: '::',
																																										_0: 80,
																																										_1: {
																																											ctor: '::',
																																											_0: 0,
																																											_1: {
																																												ctor: '::',
																																												_0: 0,
																																												_1: {
																																													ctor: '::',
																																													_0: 0,
																																													_1: {
																																														ctor: '::',
																																														_0: 0,
																																														_1: {
																																															ctor: '::',
																																															_0: 0,
																																															_1: {
																																																ctor: '::',
																																																_0: 100,
																																																_1: {ctor: '[]'}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}),
							A3(
								_gicentre$elm_vega$VegaLite$dataColumn,
								'percentage_start',
								_gicentre$elm_vega$VegaLite$Numbers(
									{
										ctor: '::',
										_0: -19.1,
										_1: {
											ctor: '::',
											_0: -18.4,
											_1: {
												ctor: '::',
												_0: -9.2,
												_1: {
													ctor: '::',
													_0: 9.2,
													_1: {
														ctor: '::',
														_0: 69.2,
														_1: {
															ctor: '::',
															_0: -36.4,
															_1: {
																ctor: '::',
																_0: -18.2,
																_1: {
																	ctor: '::',
																	_0: 0,
																	_1: {
																		ctor: '::',
																		_0: 0,
																		_1: {
																			ctor: '::',
																			_0: 63.6,
																			_1: {
																				ctor: '::',
																				_0: -30,
																				_1: {
																					ctor: '::',
																					_0: -10,
																					_1: {
																						ctor: '::',
																						_0: -10,
																						_1: {
																							ctor: '::',
																							_0: 10,
																							_1: {
																								ctor: '::',
																								_0: 50,
																								_1: {
																									ctor: '::',
																									_0: -15.6,
																									_1: {
																										ctor: '::',
																										_0: -15.6,
																										_1: {
																											ctor: '::',
																											_0: -3.1,
																											_1: {
																												ctor: '::',
																												_0: 3.1,
																												_1: {
																													ctor: '::',
																													_0: 46.9,
																													_1: {
																														ctor: '::',
																														_0: -10.4,
																														_1: {
																															ctor: '::',
																															_0: -10.4,
																															_1: {
																																ctor: '::',
																																_0: -6.3,
																																_1: {
																																	ctor: '::',
																																	_0: 6.3,
																																	_1: {
																																		ctor: '::',
																																		_0: 72.9,
																																		_1: {
																																			ctor: '::',
																																			_0: -18.8,
																																			_1: {
																																				ctor: '::',
																																				_0: -12.5,
																																				_1: {
																																					ctor: '::',
																																					_0: -6.3,
																																					_1: {
																																						ctor: '::',
																																						_0: 6.3,
																																						_1: {
																																							ctor: '::',
																																							_0: 62.5,
																																							_1: {
																																								ctor: '::',
																																								_0: -10,
																																								_1: {
																																									ctor: '::',
																																									_0: -10,
																																									_1: {
																																										ctor: '::',
																																										_0: -10,
																																										_1: {
																																											ctor: '::',
																																											_0: 10,
																																											_1: {
																																												ctor: '::',
																																												_0: 90,
																																												_1: {
																																													ctor: '::',
																																													_0: 0,
																																													_1: {
																																														ctor: '::',
																																														_0: 0,
																																														_1: {
																																															ctor: '::',
																																															_0: 0,
																																															_1: {
																																																ctor: '::',
																																																_0: 0,
																																																_1: {
																																																	ctor: '::',
																																																	_0: 0,
																																																	_1: {ctor: '[]'}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}),
								A3(
									_gicentre$elm_vega$VegaLite$dataColumn,
									'percentage_end',
									_gicentre$elm_vega$VegaLite$Numbers(
										{
											ctor: '::',
											_0: -18.4,
											_1: {
												ctor: '::',
												_0: -9.2,
												_1: {
													ctor: '::',
													_0: 9.2,
													_1: {
														ctor: '::',
														_0: 69.2,
														_1: {
															ctor: '::',
															_0: 80.9,
															_1: {
																ctor: '::',
																_0: -18.2,
																_1: {
																	ctor: '::',
																	_0: 0,
																	_1: {
																		ctor: '::',
																		_0: 0,
																		_1: {
																			ctor: '::',
																			_0: 63.6,
																			_1: {
																				ctor: '::',
																				_0: 63.6,
																				_1: {
																					ctor: '::',
																					_0: -10,
																					_1: {
																						ctor: '::',
																						_0: -10,
																						_1: {
																							ctor: '::',
																							_0: 10,
																							_1: {
																								ctor: '::',
																								_0: 50,
																								_1: {
																									ctor: '::',
																									_0: 70,
																									_1: {
																										ctor: '::',
																										_0: -15.6,
																										_1: {
																											ctor: '::',
																											_0: -3.1,
																											_1: {
																												ctor: '::',
																												_0: 3.1,
																												_1: {
																													ctor: '::',
																													_0: 46.9,
																													_1: {
																														ctor: '::',
																														_0: 84.4,
																														_1: {
																															ctor: '::',
																															_0: -10.4,
																															_1: {
																																ctor: '::',
																																_0: -6.3,
																																_1: {
																																	ctor: '::',
																																	_0: 6.3,
																																	_1: {
																																		ctor: '::',
																																		_0: 72.9,
																																		_1: {
																																			ctor: '::',
																																			_0: 89.6,
																																			_1: {
																																				ctor: '::',
																																				_0: -12.5,
																																				_1: {
																																					ctor: '::',
																																					_0: -6.3,
																																					_1: {
																																						ctor: '::',
																																						_0: 6.3,
																																						_1: {
																																							ctor: '::',
																																							_0: 62.5,
																																							_1: {
																																								ctor: '::',
																																								_0: 81.3,
																																								_1: {
																																									ctor: '::',
																																									_0: -10,
																																									_1: {
																																										ctor: '::',
																																										_0: -10,
																																										_1: {
																																											ctor: '::',
																																											_0: 10,
																																											_1: {
																																												ctor: '::',
																																												_0: 90,
																																												_1: {
																																													ctor: '::',
																																													_0: 90,
																																													_1: {
																																														ctor: '::',
																																														_0: 0,
																																														_1: {
																																															ctor: '::',
																																															_0: 0,
																																															_1: {
																																																ctor: '::',
																																																_0: 0,
																																																_1: {
																																																	ctor: '::',
																																																	_0: 0,
																																																	_1: {
																																																		ctor: '::',
																																																		_0: 100,
																																																		_1: {ctor: '[]'}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}),
									_p98)))))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A diverging stacked bar chart for sentiments towards a set of eight questions, displayed as percentages with neutral responses straddling the 0% mark.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: data(
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$stack7 = function () {
	var enc = function (_p99) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SRangeStep(
										_elm_lang$core$Maybe$Just(17)),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('people'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxTitle('Population'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$PStack(_gicentre$elm_vega$VegaLite$NoStack),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('gender'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MScale(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$SRange(
												_gicentre$elm_vega$VegaLite$RStrings(
													{
														ctor: '::',
														_0: '#e377c2',
														_1: {
															ctor: '::',
															_0: '#1f77b4',
															_1: {ctor: '[]'}
														}
													})),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$opacity,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MNumber(0.7),
								_1: {ctor: '[]'}
							},
							_p99)))));
	};
	var trans = function (_p100) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FExpr('datum.year == 2000'),
				A3(_gicentre$elm_vega$VegaLite$calculateAs, 'datum.sex == 2 ? \'Female\' : \'Male\'', 'gender', _p100)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Layered bar chart showing the US population distribution of age groups and gender in 2000.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/population.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$mark,
							_gicentre$elm_vega$VegaLite$Bar,
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: enc(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$stack6 = function () {
	var enc = function (_p101) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$YearMonth),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxDomain(false),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxFormat('%Y'),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('count'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$PStack(_gicentre$elm_vega$VegaLite$StCenter),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('series'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MScale(
										{
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$VegaLite$SScheme,
												'category20b',
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						},
						_p101))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Unemployment across industries as a streamgraph (centred, stacked area chart).');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$width(300),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$height(200),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$dataFromUrl,
							'data/unemployment-across-industries.json',
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: A2(
								_gicentre$elm_vega$VegaLite$mark,
								_gicentre$elm_vega$VegaLite$Area,
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: enc(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$stack5 = function () {
	var enc = function (_p102) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$YearMonth),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxDomain(false),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxFormat('%Y'),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('count'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$PStack(_gicentre$elm_vega$VegaLite$StNormalize),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('series'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MScale(
										{
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$VegaLite$SScheme,
												'category20b',
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						},
						_p102))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Unemployment across industries as a normalised area chart.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$width(300),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$height(200),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$dataFromUrl,
							'data/unemployment-across-industries.json',
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: A2(
								_gicentre$elm_vega$VegaLite$mark,
								_gicentre$elm_vega$VegaLite$Area,
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: enc(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$stack4 = function () {
	var enc = function (_p103) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$YearMonth),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxFormat('%Y'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('count'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('series'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MScale(
										{
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$VegaLite$SScheme,
												'category20b',
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						},
						_p103))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Unemployment across industries as a stacked area chart.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/unemployment-across-industries.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Area,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$stack3 = function () {
	var enc = function (_p104) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('age'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SRangeStep(
										_elm_lang$core$Maybe$Just(17)),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('people'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxTitle('Population'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$PStack(_gicentre$elm_vega$VegaLite$StNormalize),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('gender'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MScale(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$SRange(
												_gicentre$elm_vega$VegaLite$RStrings(
													{
														ctor: '::',
														_0: '#EA98D2',
														_1: {
															ctor: '::',
															_0: '#659CCA',
															_1: {ctor: '[]'}
														}
													})),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						},
						_p104))));
	};
	var trans = function (_p105) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FExpr('datum.year == 2000'),
				A3(_gicentre$elm_vega$VegaLite$calculateAs, 'datum.sex == 2 ? \'Female\' : \'Male\'', 'gender', _p105)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Population structure as a normalised stacked bar chart.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/population.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$mark,
							_gicentre$elm_vega$VegaLite$Bar,
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: enc(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$stack2 = function () {
	var enc = function (_p106) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('yield'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('variety'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Nominal),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('site'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						_p106))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Barley crop yields as a horizontal stacked bar chart');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/barley.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$stack1 = function () {
	var enc = function (_p107) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle('Month of the year'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Count),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MScale(
										_gicentre$elm_vega$VegaLite$categoricalDomainMap(
											{
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'sun', _1: '#e7ba52'},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'fog', _1: '#c7c7c7'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'drizzle', _1: '#aec7ea'},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: 'rain', _1: '#1f77b4'},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 'snow', _1: '#9467bd'},
																_1: {ctor: '[]'}
															}
														}
													}
												}
											})),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MLegend(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$LTitle('Weather type'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						_p107))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Seattle weather stacked bar chart');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/seattle-weather.csv',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic20 = function () {
	var enc = function (_p108) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('time'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Hours),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('time'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$Day),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$size,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('count'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MAggregate(_gicentre$elm_vega$VegaLite$Sum),
									_1: {ctor: '[]'}
								}
							}
						},
						_p108))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Table bubble plot in the style of a Github punched card.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/github.csv',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Circle,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic19 = function () {
	var config = function (_p109) {
		return _gicentre$elm_vega$VegaLite$configure(
			A2(
				_gicentre$elm_vega$VegaLite$configuration,
				_gicentre$elm_vega$VegaLite$Range(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$RHeatmap('greenblue'),
						_1: {ctor: '[]'}
					}),
				A2(
					_gicentre$elm_vega$VegaLite$configuration,
					_gicentre$elm_vega$VegaLite$View(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$Stroke(_elm_lang$core$Maybe$Nothing),
							_1: {ctor: '[]'}
						}),
					_p109)));
	};
	var enc = function (_p110) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('IMDB_Rating'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MaxBins(60),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Rotten_Tomatoes_Rating'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PBin(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MaxBins(40),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MAggregate(_gicentre$elm_vega$VegaLite$Count),
								_1: {ctor: '[]'}
							}
						},
						_p110))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('\'Binned heatmap\' comparing movie ratings.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$width(300),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$height(200),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$dataFromUrl,
							'data/movies.json',
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: A2(
								_gicentre$elm_vega$VegaLite$mark,
								_gicentre$elm_vega$VegaLite$Rect,
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: enc(
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: config(
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic18 = function () {
	var enc = function (_p111) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Cylinders'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Origin'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Nominal),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('Horsepower'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MAggregate(_gicentre$elm_vega$VegaLite$Mean),
									_1: {ctor: '[]'}
								}
							}
						},
						_p111))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('\'Table heatmap\' showing engine size/power for three countries.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Rect,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic17 = function () {
	var enc = function (_p112) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PTimeUnit(_gicentre$elm_vega$VegaLite$YearMonth),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxFormat('%Y'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('count'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxTitle('Count'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					_p112)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Unemployment over time (area chart)');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$width(300),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$height(200),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$dataFromUrl,
							'data/unemployment-across-industries.json',
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: A2(
								_gicentre$elm_vega$VegaLite$mark,
								_gicentre$elm_vega$VegaLite$Area,
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: enc(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic16 = function () {
	var enc = function (_p113) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAxis(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$AxFormat('%Y'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('price'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p113)));
	};
	var trans = function (_p114) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FExpr('datum.symbol === \'GOOG\''),
				_p114));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Google\'s stock price over time (quantized as a step-chart).');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/stocks.csv',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$mark,
							_gicentre$elm_vega$VegaLite$Line,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MInterpolate(_gicentre$elm_vega$VegaLite$StepAfter),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: enc(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic15 = function () {
	var enc = function (_p115) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('year'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SRangeStep(
										_elm_lang$core$Maybe$Just(50)),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SPadding(0.5),
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('yield'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Median),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('site'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						_p115))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Slope graph showing the change in yield for different barley sites. It shows the error in the year labels for the Morris site.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/barley.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Line,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic14 = function () {
	var enc = function (_p116) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAxis(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$AxFormat('%Y'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('price'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('symbol'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						_p116))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Stock prices of 5 tech companies over time.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/stocks.csv',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Line,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic13 = function () {
	var enc = function (_p117) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAxis(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$AxFormat('%Y'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('price'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p117)));
	};
	var trans = function (_p118) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FExpr('datum.symbol === \'GOOG\''),
				_p118));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Google\'s stock price over time.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/stocks.csv',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: trans(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$mark,
							_gicentre$elm_vega$VegaLite$Line,
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: enc(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic12 = function () {
	var enc = function (_p119) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Cylinders'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
							_1: {ctor: '[]'}
						}
					},
					_p119)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Shows the relationship between horsepower and the number of cylinders using tick marks.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Tick,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic11 = function () {
	var sel = function (_p120) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'view',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$BindScales,
					_1: {ctor: '[]'}
				},
				_p120));
	};
	var enc = function (_p121) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('income'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SType(_gicentre$elm_vega$VegaLite$ScLog),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('health'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SZero(false),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$size,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('population'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$color,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MString('#000'),
								_1: {ctor: '[]'}
							},
							_p121)))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A bubble plot showing the correlation between health and income for 187 countries in the world (modified from an example in Lisa Charlotte Rost\'s blog post \'One Chart, Twelve Charting Libraries\' --http://lisacharlotterost.github.io/2016/05/17/one-chart-code/).');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$width(500),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$height(300),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$dataFromUrl,
							'data/gapminder-health-income.csv',
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: A2(
								_gicentre$elm_vega$VegaLite$mark,
								_gicentre$elm_vega$VegaLite$Circle,
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: enc(
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: sel(
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic10 = function () {
	var enc = function (_p122) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$size,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('Acceleration'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						_p122))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A bubbleplot showing horsepower on x, miles per gallons on y, and acceleration on size.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Point,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic9 = function () {
	var enc = function (_p123) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MName('Origin'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$shape,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MName('Origin'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
									_1: {ctor: '[]'}
								}
							},
							_p123)))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A scatterplot showing horsepower and miles per gallons with country of origin double encoded by colour and shape.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Point,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic8 = function () {
	var enc = function (_p124) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('IMDB_Rating'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MaxBins(10),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Rotten_Tomatoes_Rating'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PBin(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MaxBins(10),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$size,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$MAggregate(_gicentre$elm_vega$VegaLite$Count),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						_p124))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A binned scatterplot comparing IMDB and Rotten Tomatoes rating with marks sized by number of reviews.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/movies.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Circle,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic7 = function () {
	var enc = function (_p125) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p125)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A scatterplot showing horsepower and miles per gallon for various cars (via circle marks).');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Circle,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic6 = function () {
	var enc = function (_p126) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p126)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A scatterplot showing horsepower and miles per gallon for various cars (via point marks).');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/cars.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Point,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic5 = function () {
	var config = function (_p127) {
		return _gicentre$elm_vega$VegaLite$configure(
			A2(
				_gicentre$elm_vega$VegaLite$configuration,
				_gicentre$elm_vega$VegaLite$Axis(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$DomainWidth(1),
						_1: {ctor: '[]'}
					}),
				A2(
					_gicentre$elm_vega$VegaLite$configuration,
					_gicentre$elm_vega$VegaLite$View(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$Stroke(_elm_lang$core$Maybe$Nothing),
							_1: {ctor: '[]'}
						}),
					_p127)));
	};
	var enc = function (_p128) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('gender'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Nominal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$SRangeStep(
										_elm_lang$core$Maybe$Just(12)),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle(''),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('people'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$PAxis(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$AxTitle('population'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$AxGrid(false),
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$column,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$FName('age'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$FmType(_gicentre$elm_vega$VegaLite$Ordinal),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$color,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$MName('gender'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$MmType(_gicentre$elm_vega$VegaLite$Nominal),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$MScale(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$SRange(
													_gicentre$elm_vega$VegaLite$RStrings(
														{
															ctor: '::',
															_0: '#EA98D2',
															_1: {
																ctor: '::',
																_0: '#659CCA',
																_1: {ctor: '[]'}
															}
														})),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}
							},
							_p128)))));
	};
	var trans = function (_p129) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FExpr('datum.year == 2000'),
				A3(_gicentre$elm_vega$VegaLite$calculateAs, 'datum.sex == 2 ? \'Female\' : \'Male\'', 'gender', _p129)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Grouped bar chart shoing population structure by age and gender.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/population.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: trans(
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: enc(
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: config(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic4 = function () {
	var enc = function (_p130) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$Y,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('task'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$X,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('start'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$X2,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PName('end'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						_p130))));
	};
	var data = function (_p131) {
		return A2(
			_gicentre$elm_vega$VegaLite$dataFromColumns,
			{ctor: '[]'},
			A3(
				_gicentre$elm_vega$VegaLite$dataColumn,
				'task',
				_gicentre$elm_vega$VegaLite$Strings(
					{
						ctor: '::',
						_0: 'A',
						_1: {
							ctor: '::',
							_0: 'B',
							_1: {
								ctor: '::',
								_0: 'C',
								_1: {ctor: '[]'}
							}
						}
					}),
				A3(
					_gicentre$elm_vega$VegaLite$dataColumn,
					'start',
					_gicentre$elm_vega$VegaLite$Numbers(
						{
							ctor: '::',
							_0: 1,
							_1: {
								ctor: '::',
								_0: 3,
								_1: {
									ctor: '::',
									_0: 8,
									_1: {ctor: '[]'}
								}
							}
						}),
					A3(
						_gicentre$elm_vega$VegaLite$dataColumn,
						'end',
						_gicentre$elm_vega$VegaLite$Numbers(
							{
								ctor: '::',
								_0: 3,
								_1: {
									ctor: '::',
									_0: 8,
									_1: {
										ctor: '::',
										_0: 10,
										_1: {ctor: '[]'}
									}
								}
							}),
						_p131))));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A simple bar chart with ranged data (aka Gantt Chart).');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: data(
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic3 = function () {
	var enc = function (_p132) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('IMDB_Rating'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Count),
							_1: {ctor: '[]'}
						}
					},
					_p132)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('Simple histogram of IMDB ratings.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/movies.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic2 = function () {
	var enc = function (_p133) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('people'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PAggregate(_gicentre$elm_vega$VegaLite$Sum),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$AxTitle('population'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('age'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$PScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$SRangeStep(
											_elm_lang$core$Maybe$Just(17)),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					_p133)));
	};
	var trans = function (_p134) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$FExpr('datum.year == 2000'),
				_p134));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A bar chart showing the US population distribution of age groups in 2000.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$VegaLite$dataFromUrl,
					'data/population.json',
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: trans(
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: enc(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$basic1 = function () {
	var enc = function (_p135) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$PName('a'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$PName('b'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$PmType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p135)));
	};
	var data = function (_p136) {
		return A2(
			_gicentre$elm_vega$VegaLite$dataFromColumns,
			{ctor: '[]'},
			A3(
				_gicentre$elm_vega$VegaLite$dataColumn,
				'a',
				_gicentre$elm_vega$VegaLite$Strings(
					{
						ctor: '::',
						_0: 'A',
						_1: {
							ctor: '::',
							_0: 'B',
							_1: {
								ctor: '::',
								_0: 'C',
								_1: {
									ctor: '::',
									_0: 'D',
									_1: {
										ctor: '::',
										_0: 'E',
										_1: {
											ctor: '::',
											_0: 'F',
											_1: {
												ctor: '::',
												_0: 'G',
												_1: {
													ctor: '::',
													_0: 'H',
													_1: {
														ctor: '::',
														_0: 'I',
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}),
				A3(
					_gicentre$elm_vega$VegaLite$dataColumn,
					'b',
					_gicentre$elm_vega$VegaLite$Numbers(
						{
							ctor: '::',
							_0: 28,
							_1: {
								ctor: '::',
								_0: 55,
								_1: {
									ctor: '::',
									_0: 43,
									_1: {
										ctor: '::',
										_0: 91,
										_1: {
											ctor: '::',
											_0: 81,
											_1: {
												ctor: '::',
												_0: 53,
												_1: {
													ctor: '::',
													_0: 19,
													_1: {
														ctor: '::',
														_0: 87,
														_1: {
															ctor: '::',
															_0: 52,
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								}
							}
						}),
					_p136)));
	};
	var des = _gicentre$elm_vega$VegaLite$description('A simple bar chart with embedded data.');
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: des,
			_1: {
				ctor: '::',
				_0: data(
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$VegaLite$mark,
						_gicentre$elm_vega$VegaLite$Bar,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: enc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$Gallery$mySpecs = _gicentre$elm_vega$VegaLite$combineSpecs(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'basic1', _1: _gicentre$elm_vega$Gallery$basic1},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'basic2', _1: _gicentre$elm_vega$Gallery$basic2},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'basic3', _1: _gicentre$elm_vega$Gallery$basic3},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'basic4', _1: _gicentre$elm_vega$Gallery$basic4},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'basic5', _1: _gicentre$elm_vega$Gallery$basic5},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'basic6', _1: _gicentre$elm_vega$Gallery$basic6},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'basic7', _1: _gicentre$elm_vega$Gallery$basic7},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'basic8', _1: _gicentre$elm_vega$Gallery$basic8},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'basic9', _1: _gicentre$elm_vega$Gallery$basic9},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'basic10', _1: _gicentre$elm_vega$Gallery$basic10},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'basic11', _1: _gicentre$elm_vega$Gallery$basic11},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'basic12', _1: _gicentre$elm_vega$Gallery$basic12},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'basic13', _1: _gicentre$elm_vega$Gallery$basic13},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: 'basic14', _1: _gicentre$elm_vega$Gallery$basic14},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 'basic15', _1: _gicentre$elm_vega$Gallery$basic15},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: 'basic16', _1: _gicentre$elm_vega$Gallery$basic16},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: 'basic17', _1: _gicentre$elm_vega$Gallery$basic17},
																		_1: {
																			ctor: '::',
																			_0: {ctor: '_Tuple2', _0: 'basic18', _1: _gicentre$elm_vega$Gallery$basic18},
																			_1: {
																				ctor: '::',
																				_0: {ctor: '_Tuple2', _0: 'basic19', _1: _gicentre$elm_vega$Gallery$basic19},
																				_1: {
																					ctor: '::',
																					_0: {ctor: '_Tuple2', _0: 'basic20', _1: _gicentre$elm_vega$Gallery$basic20},
																					_1: {
																						ctor: '::',
																						_0: {ctor: '_Tuple2', _0: 'stack1', _1: _gicentre$elm_vega$Gallery$stack1},
																						_1: {
																							ctor: '::',
																							_0: {ctor: '_Tuple2', _0: 'stack2', _1: _gicentre$elm_vega$Gallery$stack2},
																							_1: {
																								ctor: '::',
																								_0: {ctor: '_Tuple2', _0: 'stack3', _1: _gicentre$elm_vega$Gallery$stack3},
																								_1: {
																									ctor: '::',
																									_0: {ctor: '_Tuple2', _0: 'stack4', _1: _gicentre$elm_vega$Gallery$stack4},
																									_1: {
																										ctor: '::',
																										_0: {ctor: '_Tuple2', _0: 'stack5', _1: _gicentre$elm_vega$Gallery$stack5},
																										_1: {
																											ctor: '::',
																											_0: {ctor: '_Tuple2', _0: 'stack6', _1: _gicentre$elm_vega$Gallery$stack6},
																											_1: {
																												ctor: '::',
																												_0: {ctor: '_Tuple2', _0: 'stack7', _1: _gicentre$elm_vega$Gallery$stack7},
																												_1: {
																													ctor: '::',
																													_0: {ctor: '_Tuple2', _0: 'stack8', _1: _gicentre$elm_vega$Gallery$stack8},
																													_1: {
																														ctor: '::',
																														_0: {ctor: '_Tuple2', _0: 'trellis1', _1: _gicentre$elm_vega$Gallery$trellis1},
																														_1: {
																															ctor: '::',
																															_0: {ctor: '_Tuple2', _0: 'trellis2', _1: _gicentre$elm_vega$Gallery$trellis2},
																															_1: {
																																ctor: '::',
																																_0: {ctor: '_Tuple2', _0: 'trellis3', _1: _gicentre$elm_vega$Gallery$trellis3},
																																_1: {
																																	ctor: '::',
																																	_0: {ctor: '_Tuple2', _0: 'trellis4', _1: _gicentre$elm_vega$Gallery$trellis4},
																																	_1: {
																																		ctor: '::',
																																		_0: {ctor: '_Tuple2', _0: 'trellis5', _1: _gicentre$elm_vega$Gallery$trellis5},
																																		_1: {
																																			ctor: '::',
																																			_0: {ctor: '_Tuple2', _0: 'trellis6', _1: _gicentre$elm_vega$Gallery$trellis6},
																																			_1: {
																																				ctor: '::',
																																				_0: {ctor: '_Tuple2', _0: 'trellis7', _1: _gicentre$elm_vega$Gallery$trellis7},
																																				_1: {
																																					ctor: '::',
																																					_0: {ctor: '_Tuple2', _0: 'layer1', _1: _gicentre$elm_vega$Gallery$layer1},
																																					_1: {
																																						ctor: '::',
																																						_0: {ctor: '_Tuple2', _0: 'layer2', _1: _gicentre$elm_vega$Gallery$layer2},
																																						_1: {
																																							ctor: '::',
																																							_0: {ctor: '_Tuple2', _0: 'layer3', _1: _gicentre$elm_vega$Gallery$layer3},
																																							_1: {
																																								ctor: '::',
																																								_0: {ctor: '_Tuple2', _0: 'layer4', _1: _gicentre$elm_vega$Gallery$layer4},
																																								_1: {
																																									ctor: '::',
																																									_0: {ctor: '_Tuple2', _0: 'layer5', _1: _gicentre$elm_vega$Gallery$layer5},
																																									_1: {
																																										ctor: '::',
																																										_0: {ctor: '_Tuple2', _0: 'layer6', _1: _gicentre$elm_vega$Gallery$layer6},
																																										_1: {
																																											ctor: '::',
																																											_0: {ctor: '_Tuple2', _0: 'layer7', _1: _gicentre$elm_vega$Gallery$layer7},
																																											_1: {
																																												ctor: '::',
																																												_0: {ctor: '_Tuple2', _0: 'layer8', _1: _gicentre$elm_vega$Gallery$layer8},
																																												_1: {
																																													ctor: '::',
																																													_0: {ctor: '_Tuple2', _0: 'layer9', _1: _gicentre$elm_vega$Gallery$layer9},
																																													_1: {
																																														ctor: '::',
																																														_0: {ctor: '_Tuple2', _0: 'layer10', _1: _gicentre$elm_vega$Gallery$layer10},
																																														_1: {
																																															ctor: '::',
																																															_0: {ctor: '_Tuple2', _0: 'layer11', _1: _gicentre$elm_vega$Gallery$layer11},
																																															_1: {
																																																ctor: '::',
																																																_0: {ctor: '_Tuple2', _0: 'layer12', _1: _gicentre$elm_vega$Gallery$layer12},
																																																_1: {
																																																	ctor: '::',
																																																	_0: {ctor: '_Tuple2', _0: 'layer13', _1: _gicentre$elm_vega$Gallery$layer13},
																																																	_1: {
																																																		ctor: '::',
																																																		_0: {ctor: '_Tuple2', _0: 'layer14', _1: _gicentre$elm_vega$Gallery$layer14},
																																																		_1: {
																																																			ctor: '::',
																																																			_0: {ctor: '_Tuple2', _0: 'layer15', _1: _gicentre$elm_vega$Gallery$layer15},
																																																			_1: {
																																																				ctor: '::',
																																																				_0: {ctor: '_Tuple2', _0: 'layer16', _1: _gicentre$elm_vega$Gallery$layer16},
																																																				_1: {
																																																					ctor: '::',
																																																					_0: {ctor: '_Tuple2', _0: 'comp1', _1: _gicentre$elm_vega$Gallery$comp1},
																																																					_1: {
																																																						ctor: '::',
																																																						_0: {ctor: '_Tuple2', _0: 'comp2', _1: _gicentre$elm_vega$Gallery$comp2},
																																																						_1: {
																																																							ctor: '::',
																																																							_0: {ctor: '_Tuple2', _0: 'comp3', _1: _gicentre$elm_vega$Gallery$comp3},
																																																							_1: {
																																																								ctor: '::',
																																																								_0: {ctor: '_Tuple2', _0: 'interactive1', _1: _gicentre$elm_vega$Gallery$interactive1},
																																																								_1: {
																																																									ctor: '::',
																																																									_0: {ctor: '_Tuple2', _0: 'interactive2', _1: _gicentre$elm_vega$Gallery$interactive2},
																																																									_1: {
																																																										ctor: '::',
																																																										_0: {ctor: '_Tuple2', _0: 'interactive3', _1: _gicentre$elm_vega$Gallery$interactive3},
																																																										_1: {
																																																											ctor: '::',
																																																											_0: {ctor: '_Tuple2', _0: 'interactive4', _1: _gicentre$elm_vega$Gallery$interactive4},
																																																											_1: {
																																																												ctor: '::',
																																																												_0: {ctor: '_Tuple2', _0: 'interactive5', _1: _gicentre$elm_vega$Gallery$interactive5},
																																																												_1: {
																																																													ctor: '::',
																																																													_0: {ctor: '_Tuple2', _0: 'interactive6', _1: _gicentre$elm_vega$Gallery$interactive6},
																																																													_1: {
																																																														ctor: '::',
																																																														_0: {ctor: '_Tuple2', _0: 'interactive7', _1: _gicentre$elm_vega$Gallery$interactive7},
																																																														_1: {
																																																															ctor: '::',
																																																															_0: {ctor: '_Tuple2', _0: 'interactive8', _1: _gicentre$elm_vega$Gallery$interactive8},
																																																															_1: {
																																																																ctor: '::',
																																																																_0: {ctor: '_Tuple2', _0: 'interactive9', _1: _gicentre$elm_vega$Gallery$interactive9},
																																																																_1: {ctor: '[]'}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _gicentre$elm_vega$Gallery$elmToJS = _elm_lang$core$Native_Platform.outgoingPort(
	'elmToJS',
	function (v) {
		return v;
	});
var _gicentre$elm_vega$Gallery$main = _elm_lang$core$Platform$program(
	{
		init: {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$Gallery$mySpecs,
			_1: _gicentre$elm_vega$Gallery$elmToJS(_gicentre$elm_vega$Gallery$mySpecs)
		},
		update: F2(
			function (_p137, model) {
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			}),
		subscriptions: _elm_lang$core$Basics$always(_elm_lang$core$Platform_Sub$none)
	})();

var Elm = {};
Elm['Gallery'] = Elm['Gallery'] || {};
if (typeof _gicentre$elm_vega$Gallery$main !== 'undefined') {
    _gicentre$elm_vega$Gallery$main(Elm['Gallery'], 'Gallery', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

