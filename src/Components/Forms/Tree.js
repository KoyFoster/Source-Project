import React, { useState, useEffect } from 'react';
// import NativeCheckbox from './NativeCheckbox';
import classNames from 'classnames';
// import isEqual from 'lodash/isEqual';

// Remaining bugs:
// 1. The last parent of a parent is has control over wether the parent is checked off or not, instead of referencing all items.
// 2. When checking off a parent that has parent children, the non-parent child will be missed if SaveChildrenText is the only properties set to true.
// 3. GridTree does not line up clean on the branch column like VS.
// General bugs
// 1. Beahavior of the DropDown component needs fixing
// Note: all on hold until later controls are started and finished.
const fontFamily = 'calibri';
const fontSize = '12px';

class NativeCheckbox extends React.PureComponent {
  static defaultProps = {
    indeterminate: false,
  };

  componentDidMount() {
    this.updateDeterminateProperty();
  }

  componentDidUpdate() {
    this.updateDeterminateProperty();
  }

  updateDeterminateProperty() {
    const { indeterminate } = this.props;
  }

  render() {
    const props = { ...this.props };

    // Remove property that does not exist in HTML
    delete props.indeterminate;

    return (
      <input
        {...props}
        ref={(c) => {
          this.checkbox = c;
        }}
        type="checkbox"
      />
    );
  }
}

const CheckModel = {
  ALL: 'all',
  PARENT: 'parent',
  LEAF: 'leaf',
};

class Node {
  constructor(props, nodes = {}) {
    this.props = props;
    this.flatNodes = nodes;
  }

  setProps(props) {
    this.props = props;
  }

  clone() {
    const clonedNodes = {};

    // Re-construct nodes one level deep to avoid shallow copy of mutable characteristics
    Object.keys(this.flatNodes).forEach((value) => {
      const node = this.flatNodes[value];
      clonedNodes[value] = { ...node };
    });

    return new Node(this.props, clonedNodes);
  }

  getNode(value) {
    return this.flatNodes[value];
  }

  flattenNodes(nodes, parent = {}, depth = 0) {
    if (!Array.isArray(nodes) || nodes.length === 0) {
      return;
    }

    const { disabled, noCascade } = this.props;

    // Flatten the `node` property for internal lookups
    nodes.forEach((node, index) => {
      const isParent = this.nodeHasChildren(node);

      this.flatNodes[node.value] = {
        label: node.label,
        value: node.value,
        children: node.children,
        parent,
        isChild: parent.value !== undefined,
        isParent,
        isLeaf: !isParent,
        showCheckbox:
          node.showCheckbox !== undefined ? node.showCheckbox : true,
        disabled: this.getDisabledState(node, parent, disabled, noCascade),
        treeDepth: depth,
        index,
      };
      this.flattenNodes(node.children, node, depth + 1);
    });
  }

  nodeHasChildren(node) {
    return Array.isArray(node.children);
  }

  getDisabledState(node, parent, disabledProp, noCascade) {
    if (disabledProp) {
      return true;
    }

    if (!noCascade && parent.disabled) {
      return true;
    }

    return Boolean(node.disabled);
  }

  deserializeLists(lists) {
    const listKeys = ['checked', 'expanded'];

    // Reset values to false
    Object.keys(this.flatNodes).forEach((value) => {
      listKeys.forEach((listKey) => {
        this.flatNodes[value][listKey] = false;
      });
    });

    // Deserialize values and set their nodes to true
    listKeys.forEach((listKey) => {
      lists[listKey].forEach((value) => {
        if (this.flatNodes[value] !== undefined) {
          this.flatNodes[value][listKey] = true;
        }
      });
    });
  }

  serializeList(key) {
    const list = [];

    Object.keys(this.flatNodes).forEach((value) => {
      if (this.flatNodes[value][key]) {
        list.push(value);
      }
    });

    return list;
  }

  expandAllNodes(expand) {
    Object.keys(this.flatNodes).forEach((value) => {
      if (this.flatNodes[value].isParent) {
        this.flatNodes[value].expanded = expand;
      }
    });

    return this;
  }

  toggleChecked(
    node,
    isChecked,
    checkModel,
    noCascade,
    percolateUpward = true,
  ) {
    const flatNode = this.flatNodes[node.value];
    const modelHasParents =
      [CheckModel.PARENT, CheckModel.ALL].indexOf(checkModel) > -1;
    const modelHasLeaves =
      [CheckModel.LEAF, CheckModel.ALL].indexOf(checkModel) > -1;

    if (flatNode.isLeaf || noCascade) {
      if (node.disabled) {
        return this;
      }

      this.toggleNode(node.value, 'checked', isChecked);
    } else {
      if (modelHasParents) {
        this.toggleNode(node.value, 'checked', isChecked);
      }

      if (modelHasLeaves) {
        // Percolate check status down to all children
        flatNode.children.forEach((child) => {
          this.toggleChecked(child, isChecked, checkModel, noCascade, false);
        });
      }
    }

    // Percolate check status up to parent
    // The check model must include parent nodes and we must not have already covered the
    // parent (relevant only when percolating through children)
    if (percolateUpward && !noCascade && flatNode.isChild && modelHasParents) {
      this.toggleParentStatus(flatNode.parent, checkModel);
    }

    return this;
  }

  toggleParentStatus(node, checkModel) {
    const flatNode = this.flatNodes[node.value];

    if (flatNode.isChild) {
      if (checkModel === CheckModel.ALL) {
        this.toggleNode(
          node.value,
          'checked',
          this.isEveryChildChecked(flatNode),
        );
      }

      this.toggleParentStatus(flatNode.parent, checkModel);
    } else {
      this.toggleNode(
        node.value,
        'checked',
        this.isEveryChildChecked(flatNode),
      );
    }
  }

  isEveryChildChecked(node) {
    return node.children.every((child) => this.getNode(child.value).checked);
  }

  toggleNode(nodeValue, key, toggleValue) {
    this.flatNodes[nodeValue][key] = toggleValue;

    return this;
  }
} // end of node

class TreeNode extends React.Component {
  static defaultProps = {
    children: null,
    className: null,
    expandOnClick: false,
    icon: null,
    showCheckbox: true,
    title: null,
    onClick: () => {},
  };

  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }

  onCheck() {
    const { value, onCheck } = this.props;

    onCheck({ value, checked: this.getCheckState({ toggle: true }) });
  }

  onClick() {
    const { expandOnClick, isParent, value, onClick } = this.props;

    // Auto expand if enabled
    if (isParent && expandOnClick) {
      this.onExpand();
    }

    onClick({ value, checked: this.getCheckState({ toggle: false }) });
  }

  onExpand() {
    const { expanded, value, onExpand } = this.props;

    onExpand({ value, expanded: !expanded });
  }

  getCheckState({ toggle }) {
    const { checked, optimisticToggle } = this.props;

    // Toggle off state to checked
    if (checked === 0 && toggle) {
      return true;
    }

    // Node is already checked and we are not toggling
    if (checked === 1 && !toggle) {
      return true;
    }

    // Get/toggle partial state based on cascade model
    if (checked === 2) {
      return optimisticToggle;
    }

    return false;
  }

  renderCollapseButton() {
    const { expandDisabled, isLeaf, lang } = this.props;

    if (isLeaf) {
      return (
        <span className="rct-collapse">
          <span className="rct-icon" />
        </span>
      );
    }

    return (
      <button
        type="button"
        className="rct-collapse rct-collapse-btn"
        disabled={expandDisabled}
        aria-label={lang.toggle}
        title={lang.toggle}
        onClick={this.onExpand}
      >
        {this.renderCollapseIcon()}
      </button>
    );
  }

  renderCollapseIcon() {
    const {
      expanded,
      icons: { expandClose, expandOpen },
    } = this.props;

    if (!expanded) {
      return expandClose;
    }

    return expandOpen;
  }

  renderCheckboxIcon() {
    const {
      checked,
      icons: { uncheck, check, halfCheck },
    } = this.props;

    if (checked === 0) {
      return uncheck;
    }

    if (checked === 1) {
      return check;
    }

    return halfCheck;
  }

  renderNodeIcon() {
    const {
      expanded,
      icon,
      icons: { leaf, parentClose, parentOpen },
      isLeaf,
    } = this.props;

    if (icon !== null) {
      return icon;
    }

    if (isLeaf) {
      return leaf;
    }

    if (!expanded) {
      return parentClose;
    }

    return parentOpen;
  }

  renderBareLabel(children) {
    const { onClick, title } = this.props;
    const clickable = onClick !== null;

    return (
      <span className="rct-bare-label" title={title}>
        {clickable ? (
          <span
            className="rct-node-clickable"
            onClick={this.onClick}
            onKeyPress={this.onClick}
            role="button"
            tabIndex={0}
          >
            {children}
          </span>
        ) : (
          children
        )}
      </span>
    );
  }

  renderCheckboxLabel(children) {
    const { checked, disabled, title, treeId, value, onClick } = this.props;
    const clickable = onClick !== null;
    const inputId = `${treeId}-${String(value).split(' ').join('_')}`;

    const render = [
      <label key={0} htmlFor={inputId} title={title}>
        {/* <NativeCheckbox */}
        <NativeCheckbox
          checked={checked === 1}
          disabled={disabled}
          id={inputId}
          indeterminate={checked === 2}
          onClick={this.onCheck}
          onChange={() => {}}
        />
        <span className="rct-checkbox">{this.renderCheckboxIcon()}</span>
        {!clickable ? children : null}
      </label>,
    ];

    if (clickable) {
      render.push(
        <span
          key={1}
          className="rct-node-clickable"
          onClick={this.onClick}
          onKeyPress={this.onClick}
          role="link"
          tabIndex={0}
        >
          {children}
        </span>,
      );
    }

    return render;
  }

  renderLabel() {
    const { label, showCheckbox, showNodeIcon } = this.props;
    const labelChildren = [
      showNodeIcon ? (
        <span key={0} className="rct-node-icon">
          {this.renderNodeIcon()}
        </span>
      ) : null,
      <span key={1} className="rct-title">
        {label}
      </span>,
    ];

    if (!showCheckbox) {
      return this.renderBareLabel(labelChildren);
    }

    return this.renderCheckboxLabel(labelChildren);
  }

  renderChildren() {
    if (!this.props.expanded) {
      return null;
    }

    return this.props.children;
  }

  render() {
    const { className, disabled, expanded, isLeaf } = this.props;
    const nodeClass = classNames(
      {
        'rct-node': true,
        'rct-node-leaf': isLeaf,
        'rct-node-parent': !isLeaf,
        'rct-node-expanded': !isLeaf && expanded,
        'rct-node-collapsed': !isLeaf && !expanded,
        'rct-disabled': disabled,
      },
      className,
    );

    return (
      <li className={nodeClass}>
        <span className="rct-text">
          {this.renderCollapseButton()}
          {this.renderLabel()}
        </span>
        {this.renderChildren()}
      </li>
    );
  }
}

class Tree extends React.Component {
  static defaultProps = {
    checkModel: CheckModel.LEAF,
    checked: [],
    disabled: false,
    expandDisabled: false,
    expandOnClick: false,
    expanded: [],
    icons: {
      check: <span className="rct-icon rct-icon-check" />,
      uncheck: <span className="rct-icon rct-icon-uncheck" />,
      halfCheck: <span className="rct-icon rct-icon-half-check" />,
      expandClose: <span className="rct-icon rct-icon-expand-close" />,
      expandOpen: <span className="rct-icon rct-icon-expand-open" />,
      expandAll: <span className="rct-icon rct-icon-expand-all" />,
      collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
      parentClose: <span className="rct-icon rct-icon-parent-close" />,
      parentOpen: <span className="rct-icon rct-icon-parent-open" />,
      leaf: <span className="rct-icon rct-icon-leaf" />,
    },
    iconsClass: 'fa4',
    id: null,
    lang: {
      collapseAll: 'Collapse all',
      expandAll: 'Expand all',
      toggle: 'Toggle',
    },
    name: undefined,
    nameAsArray: false,
    nativeCheckboxes: false,
    noCascade: false,
    onlyLeafCheckboxes: false,
    optimisticToggle: true,
    showExpandAll: false,
    showNodeIcon: true,
    showNodeTitle: false,
    onCheck: () => {},
    onClick: null,
    onExpand: () => {},
  };

  constructor(props) {
    super(props);

    const model = new Node(props);
    model.flattenNodes(props.nodes);
    model.deserializeLists({
      checked: props.checked,
      expanded: props.expanded,
    });

    this.state = {
      id: props.id /* || `rct-${nanoid(7)}` */,
      model,
      prevProps: props,
    };

    this.onCheck = this.onCheck.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
    this.onExpandAll = this.onExpandAll.bind(this);
    this.onCollapseAll = this.onCollapseAll.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  static getDerivedStateFromProps(newProps, prevState) {
    const { model, prevProps } = prevState;
    const { disabled, id, nodes } = newProps;
    let newState = { ...prevState, prevProps: newProps };

    // Apply new properties to model
    model.setProps(newProps);

    // Since flattening nodes is an expensive task, only update when there is a node change
    if (
      prevProps.nodes !== nodes /*!isEqual(prevProps.nodes, nodes)*/ ||
      prevProps.disabled !== disabled
    ) {
      model.flattenNodes(nodes);
    }

    if (id !== null) {
      newState = { ...newState, id };
    }

    model.deserializeLists({
      checked: newProps.checked,
      expanded: newProps.expanded,
    });

    return newState;
  }

  onCheck(nodeInfo) {
    const { checkModel, noCascade, onCheck } = this.props;
    const model = this.state.model.clone();
    const node = model.getNode(nodeInfo.value);

    model.toggleChecked(nodeInfo, nodeInfo.checked, checkModel, noCascade);
    onCheck(model.serializeList('checked'), { ...node, ...nodeInfo });
  }

  onExpand(nodeInfo) {
    const { onExpand } = this.props;
    const model = this.state.model.clone();
    const node = model.getNode(nodeInfo.value);

    model.toggleNode(nodeInfo.value, 'expanded', nodeInfo.expanded);
    onExpand(model.serializeList('expanded'), { ...node, ...nodeInfo });
  }

  onNodeClick(nodeInfo) {
    const { onClick } = this.props;
    const { model } = this.state;
    const node = model.getNode(nodeInfo.value);

    onClick({ ...node, ...nodeInfo });
  }

  onExpandAll() {
    this.expandAllNodes();
  }

  onCollapseAll() {
    this.expandAllNodes(false);
  }

  expandAllNodes(expand = true) {
    const { onExpand } = this.props;

    onExpand(
      this.state.model.clone().expandAllNodes(expand).serializeList('expanded'),
    );
  }

  determineShallowCheckState(node, noCascade) {
    const flatNode = this.state.model.getNode(node.value);

    if (flatNode.isLeaf || noCascade) {
      return flatNode.checked ? 1 : 0;
    }

    if (this.isEveryChildChecked(node)) {
      return 1;
    }

    if (this.isSomeChildChecked(node)) {
      return 2;
    }

    return 0;
  }

  isEveryChildChecked(node) {
    return node.children.every(
      (child) => this.state.model.getNode(child.value).checkState === 1,
    );
  }

  isSomeChildChecked(node) {
    return node.children.some(
      (child) => this.state.model.getNode(child.value).checkState > 0,
    );
  }

  renderTreeNodes(nodes, parent = {}) {
    const {
      expandDisabled,
      expandOnClick,
      icons,
      lang,
      noCascade,
      onClick,
      onlyLeafCheckboxes,
      optimisticToggle,
      showNodeTitle,
      showNodeIcon,
    } = this.props;
    const { id, model } = this.state;
    const { icons: defaultIcons } = Tree.defaultProps;

    const treeNodes = nodes.map((node) => {
      const key = node.value;
      const flatNode = model.getNode(node.value);
      const children = flatNode.isParent
        ? this.renderTreeNodes(node.children, node)
        : null;

      // Determine the check state after all children check states have been determined
      // This is done during rendering as to avoid an additional loop during the
      // deserialization of the `checked` property
      flatNode.checkState = this.determineShallowCheckState(node, noCascade);

      // Show checkbox only if this is a leaf node or showCheckbox is true
      const showCheckbox = onlyLeafCheckboxes
        ? flatNode.isLeaf
        : flatNode.showCheckbox;

      // Render only if parent is expanded or if there is no root parent
      const parentExpanded = parent.value
        ? model.getNode(parent.value).expanded
        : true;

      if (!parentExpanded) {
        return null;
      }

      return (
        <TreeNode
          key={key}
          checked={flatNode.checkState}
          className={node.className}
          disabled={flatNode.disabled}
          expandDisabled={expandDisabled}
          expandOnClick={expandOnClick}
          expanded={flatNode.expanded}
          icon={node.icon}
          icons={{ ...defaultIcons, ...icons }}
          label={node.label}
          lang={lang}
          optimisticToggle={optimisticToggle}
          isLeaf={flatNode.isLeaf}
          isParent={flatNode.isParent}
          showCheckbox={showCheckbox}
          showNodeIcon={showNodeIcon}
          title={showNodeTitle ? node.title || node.label : node.title}
          treeId={id}
          value={node.value}
          onCheck={this.onCheck}
          onClick={onClick && this.onNodeClick}
          onExpand={this.onExpand}
        >
          {children}
        </TreeNode>
      );
    });

    return <ol>{treeNodes}</ol>;
  }

  renderExpandAll() {
    const {
      icons: { expandAll, collapseAll },
      lang,
      showExpandAll,
    } = this.props;

    if (!showExpandAll) {
      return null;
    }

    return (
      <div className="rct-options">
        <button
          type="button"
          className="rct-option rct-option-expand-all"
          aria-label={lang.expandAll}
          title={lang.expandAll}
          onClick={this.onExpandAll}
        >
          {expandAll}
        </button>
        <button
          type="button"
          className="rct-option rct-option-collapse-all"
          aria-label={lang.collapseAll}
          title={lang.collapseAll}
          onClick={this.onCollapseAll}
        >
          {collapseAll}
        </button>
      </div>
    );
  }

  renderHiddenInput() {
    const { name, nameAsArray } = this.props;

    if (name === undefined) {
      return null;
    }

    if (nameAsArray) {
      return this.renderArrayHiddenInput();
    }

    return this.renderJoinedHiddenInput();
  }

  renderArrayHiddenInput() {
    const { checked, name: inputName } = this.props;

    return checked.map((value) => {
      const name = `${inputName}[]`;

      return <input key={value} name={name} type="hidden" value={value} />;
    });
  }

  renderJoinedHiddenInput() {
    const { checked, name } = this.props;
    const inputValue = checked.join(',');

    return <input name={name} type="hidden" value={inputValue} />;
  }

  render() {
    const { disabled, iconsClass, nodes, nativeCheckboxes } = this.props;
    const { id } = this.state;
    const treeNodes = this.renderTreeNodes(nodes);

    const className = classNames({
      'react-checkbox-tree': true,
      'rct-disabled': disabled,
      [`rct-icons-${iconsClass}`]: true,
      'rct-native-display': nativeCheckboxes,
    });

    return (
      <div className={className} id={id}>
        {this.renderExpandAll()}
        {this.renderHiddenInput()}
        {treeNodes}
      </div>
    );
  }
} // end of tree

// const Tree = (props) => {
//   // Vars
//   const [data, setData] = useState(props.data);
//   const { style } = props;
//   const { setValue } = props;
//   const listProps = props.listProps
//     ? props.listProps
//     : { parentSeparator: ',', separator: ',', separateLine: ',' };
//   const treeProps = props.treeProps
//     ? props.treeProps
//     : {
//         saveParentText: true,
//         saveChildrenText: true,
//         saveExpandedItem: true,
//         checkboxes: false,
//         expandOnPopulation: false,
//       };
//   const { parentSeparator } = listProps;
//   const { separator } = listProps;
//   const { separateLine } = listProps;

//   // get value as data string
//   // Note: To be completed later
//   // Note: parentSeps are handled in iterateItems
//   const getValueAsDataStr = (dataVal) => {
//     let buffer = '';
//     let i = 0;
//     if (Array.isArray(dataVal)) {
//       dataVal.map(function get(val) {
//         i += 1;
//         buffer += val
//           ? (buffer && separateLine === ',' ? separator : '') +
//             val +
//             (separateLine !== ',' && i < dataVal.length ? separateLine : '')
//           : '';
//         return null;
//       });
//     }
//     return buffer;
//   };

//   const returnVal = (
//     iParent,
//     i,
//     depth,
//     val = undefined,
//     bParent = false,
//     bAllChecked = false,
//   ) => {
//     // if root parent
//     if (iParent === undefined && bParent) {
//       return val !== undefined
//         ? treeProps.saveParentText
//           ? data[i].slice(depth, data[i].length)
//           : ''
//         : undefined;
//     }
//     if (iParent === undefined) {
//       return data[i].slice(depth, data[i].length);
//     }
//     if (bAllChecked) {
//       return treeProps.saveChildrenText
//         ? !treeProps.saveParentText
//           ? (treeProps.saveExpandedItem
//               ? data[iParent] + parentSeparator
//               : '') + data[i].slice(depth, data[i].length)
//           : ''
//         : '';
//     }
//     return (
//       (treeProps.saveExpandedItem ? data[iParent] + parentSeparator : '') +
//       data[i].slice(depth, data[i].length)
//     );
//   };

//   // Note: how the item is displayed. If one is not passed, a default will take it's place
//   const getItem = props.getItem
//     ? props.getItem
//     : (item, events) => [
//         <label
//           key={`item${item.id}`}
//           type="button"
//           style={{
//             display: 'flex',
//             background: 'transparent',
//             color: 'inherit',
//             fontFamily: 'inherit',
//             fontStyle: 'inherit',
//             border: 'none',

//             filter: item.checked //  && !itemData.checkboxes
//               ? 'invert(0.9)'
//               : 'invert(0)',
//             backdropFilter: item.checked // && !itemData.checkboxes
//               ? 'invert(0.25)'
//               : 'invert(0)',
//           }}
//           {...events}
//         >
//           {/* {itemData.checkbox} */}
//           {item.value}
//         </label>,
//       ];

//   // Generate Items
//   const Branch = (index, isParent, bBranchEnd, bDepthEnd, expand, key) => {
//     const handleChange = (val) => {
//       if (expand) if (expand.setExpand) expand.setExpand(!expand.expand);
//     };

//     const segment = isParent ? (
//       <label
//         key={key}
//         style={{
//           display: 'inline-block',
//           lineHeight: '7px',

//           margin: '2px',
//           width: '9px',
//           height: '9px',

//           border: '1px solid #988e8e',
//           background: '#fafbfb',
//           color: '#4b63a7',

//           overflow: 'hidden',

//           alignSelf: 'center',
//           textAlign: 'center',
//           verticalAlign: 'middle',
//         }}
//       >
//         <input
//           type="checkbox"
//           checked={expand.expand}
//           style={{ display: 'none', width: 0, height: 0 }}
//           onChange={(e) => {
//             handleChange(e.target.checked);
//           }}
//         />
//         {expand.expand ? '-' : '+'}
//       </label>
//     ) : undefined;

//     if (segment) return segment;

//     // Types: first item, not first item, last item, list node
//     // eslint-disable-next-line no-nested-ternary
//     const branchType = index === 0 ? 1 : bBranchEnd ? 2 : -1;

//     return (
//       <div key={key}>
//         <div
//           style={{
//             display: 'flex',
//             height: '100%',
//             alignSelf: 'center',
//           }}
//         >
//           <div>
//             <div
//               style={{
//                 width: '6px',
//                 height: '50%',
//               }}
//             />
//             <div
//               style={{
//                 width: '6px',
//                 height: '50%',
//               }}
//             />
//           </div>
//           <div>
//             <div
//               style={{
//                 width: '6px',
//                 height: '50%',
//                 borderLeft: !(branchType === 0 || branchType === 1)
//                   ? '1px dotted #a0a0a0'
//                   : 'none',
//                 borderBottom: !bDepthEnd ? 'none' : '1px dotted #a0a0a0',
//               }}
//             />
//             <div
//               style={{
//                 width: '6px',
//                 height: '50%',
//                 borderLeft: !bBranchEnd ? '1px dotted #a0a0a0' : 'none',
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // compile branches
//   const GetBranches = (bChecked = {}, index, depth, bParent, bEnd, expand) => {
//     const branches = [
//       Branch(
//         index,
//         depth === 0 ? bParent : false, // isParent
//         bEnd, // bBranchEnd
//         depth ? false : !bParent, // bDepthEnd
//         expand,
//         `B_${index},${0}`,
//       ),
//     ];
//     let b;
//     for (b = 1; b <= depth; b) {
//       branches.push(
//         Branch(
//           index,
//           depth === b ? bParent : false,
//           bEnd,
//           depth === b,
//           expand,
//           `B_${index},${b}`,
//         ),
//       );
//       b += 1;
//     }
//     return branches;
//   };

//   const Item = (item, i, depth) => {
//     const [expand, setExpand] = useState(false);
//     const [checked, setChecked] = useState(item.checked);

//     // handle change
//     const handleChange = () => {
//       const val = !item.checked;
//       item.checked = val;

//       // update update parent
//       if (item.parentId > -1) {
//       }

//       // update children
//       if (item.children.length) {
//         for (let i = 0; i < item.children.length; i) {
//           item.children[i].checked = val;
//           i += 1;
//         }
//       }

//       setChecked(val);
//     };

//     return (
//       <div key={`${item.id}_${item.value}`}>
//         <div style={{ display: 'flex' }}>
//           {GetBranches(
//             {},
//             i,
//             depth,
//             item.children.length,
//             item.length - 1 === i,
//             { expand, setExpand },
//           )}
//           {getItem(
//             { ...item, checked: item.checked },
//             {
//               onClick: () => handleChange(),
//             },
//           )}
//         </div>
//         <div style={{ display: expand ? 'inline' : 'none' }}>
//           {item.children ? getList(item.children, depth + 1) : null}
//         </div>
//       </div>
//     );
//   };

//   const onChange = () => {};

//   // compile and return item list
//   const getList = (itemData = data, depth = 0) => {
//     const buffer = [];
//     // interate through dataLen
//     for (let i = 0; i < itemData.length; i) {
//       buffer.push(Item(itemData[i], i, depth));
//       i += 1;
//     }
//     return buffer;
//   }; // End of getList

//   const hList = getList();
//   console.log('hList:', hList);
//   return (
//     <div
//       style={{
//         ...style,
//         fontFamily,
//         fontSize,
//         maxHeight: style ? style.maxHeight : style,
//         overflow: 'auto',
//       }}
//       {...props.events}
//     >
//       <div style={{ display: 'flex' }}>
//         <div
//           style={{
//             minWidth: '24px',
//           }}
//         />
//         {props.children}
//       </div>

//       {data.length > 0 ? hList : null}
//     </div>
//   );
// };

export default Tree;
