/* eslint-disable prefer-destructuring */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
// Author: Koy
// Date: 2020-17-2020
// Note: heavily reference's Jake Zatecky's tree code

import React from 'react';
// import NativeCheckbox from './NativeCheckbox';
import classNames from 'classnames';
import './Tree.css';

// Remaining bugs:
// 1. The last parent of a parent is has control over wether the parent is checked off or not, instead of referencing all items.
// 2. When checking off a parent that has parent children, the non-parent child will be missed if SaveChildrenText is the only properties set to true.
// 3. GridTree does not line up clean on the branch column like VS.
// General bugs
// 1. Beahavior of the DropDown component needs fixing
// Note: all on hold until later controls are started and finished.

class Button extends React.PureComponent {
  static defaultProps = {
    title: null,
  };

  render() {
    const { children, title, ...props } = this.props;

    return (
      <button aria-label={title} title={title} type="button" {...props}>
        {children}
      </button>
    );
  }
}

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

      const disableParent =
        this.props.noParentCheckbox &&
        isParent &&
        Object.keys(parent).length === 0;

      // show checkbox
      const showCheckbox = disableParent ? false : node.showCheckbox;

      this.flatNodes[node.value] = {
        label: node.label,
        value: node.value,
        children: node.children,
        parent,
        isChild: parent.value !== undefined,
        isParent,
        isLeaf: !isParent,
        showCheckbox: showCheckbox !== undefined ? showCheckbox : true,
        disabled: this.getDisabledState(
          node,
          parent,
          disableParent ? true : disabled,
          noCascade,
        ),
        treeDepth: depth,
        index,
      };
      this.flattenNodes(node.children, node, depth + 1);
    });
  }

  nodeHasChildren(node) {
    let hasChildren = Array.isArray(node.children);
    if (hasChildren) hasChildren = node.children.length > 0;
    return hasChildren;
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

  // percolate parent path into string
  getParentPath(node, path) {
    if (!node) return path;

    if (node.parent.children)
      if (node.parent.children.length)
        path =
          this.getParentPath(
            this.getNode(node.parent.value),
            node.parent.label,
          ) +
          this.props.parentSeparator +
          path;

    return path;
  }

  serializeList(key) {
    const list = [];
    let string = '';

    Object.keys(this.flatNodes).forEach((value) => {
      if (this.flatNodes[value][key]) {
        list.push(value);
        // compile string result
        if (key === 'checked') {
          let buffer = '';

          // get parent
          const parent = this.getNode(this.flatNodes[value].parent.value);

          // check if all siblings are checked off
          const bAllSibs = parent
            ? !parent.children.find((child) => {
                const trueChild = this.getNode(child.value);
                return !trueChild.checked;
              })
            : true;
          const bShowParent =
            (bAllSibs && this.props.saveParents) || this.props.saveExpanded;
          const bShowChild = !bAllSibs || this.props.saveChildren;

          // Append parent to child
          // Appends parent to list
          // check for parent
          if (parent)
            if (bShowParent && parent.children)
              if (parent.children.length) {
                if (parent) {
                  buffer += this.getParentPath(
                    this.getNode(parent.value),
                    this.getNode(parent.value).label,
                  );
                }

                // append parent child separator if child will be present
                if (buffer && bShowChild) buffer += this.props.parentSeparator;
              }

          // child
          if (bShowChild || !buffer) buffer += this.flatNodes[value].label;

          // append buffer to string
          string +=
            (string
              ? (this.props.separateLine ? this.props.separateLine : '') +
                this.props.separator
              : '') + buffer;
        }
      } // end of checked
    });

    // console.log(`Serial String${key}:`, { list, string });
    return { list, string };
  } // end of serializeList

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
    noParentCheckbox: false,
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
    const { value, label, onCheck } = this.props;

    onCheck({ value, label, checked: this.getCheckState({ toggle: true }) });
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
      <Button
        type="button"
        className="rct-collapse rct-collapse-btn"
        disabled={expandDisabled}
        title={lang.toggle}
        onClick={this.onExpand}
      >
        {this.renderCollapseIcon()}
      </Button>
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
      <label
        className={
          this.getCheckState({ toggle: false })
            ? 'react-checkbox-label-true'
            : 'react-checkbox-label-false'
        }
        style={{ ...this.props.font }}
        key={0}
        htmlFor={inputId}
        title={title}
      >
        <NativeCheckbox
          checked={checked === 1}
          disabled={disabled}
          id={inputId}
          indeterminate={checked === 2}
          onClick={this.onCheck}
          onChange={() => {}}
        />
        <span className="rct-checkbox">
          {this.props.showCheckbox ? this.renderCheckboxIcon() : null}
        </span>
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

  // render the lable and checkbox
  renderLabel() {
    const { label, showCheckbox, noParentCheckbox, showNodeIcon } = this.props;
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

    // if (!showCheckbox) {
    //   return this.renderBareLabel(labelChildren);
    // }

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

class TreeBase extends React.Component {
  static defaultProps = {
    checkModel: CheckModel.LEAF,
    checked: [],
    disabled: false,
    expandDisabled: false,
    expandOnClick: false,
    expanded: [],
    font: {},
    separator: ',',
    parentSeparator: undefined,
    separateLine: undefined,
    saveChildren: true,
    saveParents: false,
    saveExpanded: false,
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
    iconsClass: 'VS',
    id: null,
    lang: {
      collapseAll: 'Collapse all',
      expandAll: 'Expand all',
      toggle: 'Toggle',
    },
    name: undefined,
    nativeCheckboxes: false,

    onlyLeafCheckboxes: false, // don't show checkboxes on expandable nodes
    noCascade: false, // prevents selections from cascading up or down to family
    singleSelect: false,

    nameAsArray: false, // ???
    showNodeTitle: true, // ???

    optimisticToggle: false, // ???
    showExpandAll: false,
    showNodeIcon: false, // unique item icon
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
      id: props.id,
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
    if (prevProps.nodes !== nodes || prevProps.disabled !== disabled) {
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

    // toggleChecked takes the currently checked off items and percolates the lowest level children, and toggles off if it has children
    model.toggleChecked(nodeInfo, nodeInfo.checked, checkModel, noCascade);
    let serialObj;
    if (this.props.singleSelect) {
      serialObj = { list: [nodeInfo.value], string: nodeInfo.label };
    }
    // currently only returns the list of lowest level children, because only the children are checked off
    else {
      // include parent in item list
      serialObj = model.serializeList('checked');
    }

    // onCheck(
    //   model.serializeList('checked').list,
    //   { ...node, ...nodeInfo },
    //   string,
    // );

    onCheck(serialObj.list, { ...node, ...nodeInfo }, serialObj.string);
  }

  onExpand(nodeInfo) {
    const { onExpand } = this.props;
    const model = this.state.model.clone();
    const node = model.getNode(nodeInfo.value);

    model.toggleNode(nodeInfo.value, 'expanded', nodeInfo.expanded);
    onExpand(model.serializeList('expanded').list, { ...node, ...nodeInfo });
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
      this.state.model.clone().expandAllNodes(expand).serializeList('expanded')
        .list,
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
      singleSelect,
      onClick,
      onlyLeafCheckboxes,
      optimisticToggle,
      showNodeTitle,
      showNodeIcon,
    } = this.props;
    const { id, model } = this.state;
    const { icons: defaultIcons } = TreeBase.defaultProps;

    // validate
    if (!nodes) return null;

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
        : flatNode.showCheckbox && this.props.showCheckbox;

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
          font={this.props.font}
          icon={node.icon}
          icons={{ ...defaultIcons, ...icons }}
          label={node.label}
          lang={lang}
          optimisticToggle={optimisticToggle}
          isLeaf={flatNode.isLeaf}
          isParent={flatNode.isParent}
          showCheckbox={showCheckbox}
          noParentCheckbox={flatNode.noParentCheckbox}
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
        <Button
          type="button"
          className="rct-option rct-option-expand-all"
          title={lang.expandAll}
          onClick={this.onExpandAll}
        >
          {expandAll}
        </Button>
        <Button
          type="button"
          className="rct-option rct-option-collapse-all"
          title={lang.collapseAll}
          onClick={this.onCollapseAll}
        >
          {collapseAll}
        </Button>
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

// note: All items must have unique values
// the children array much be undefined if empty
class Tree extends React.Component {
  // takes single dimensional array and converts it into node array
  static arrayToNodes = (
    arr,
    pos = 0,
    depth = 0,
    parent = undefined,
    buffer = [],
  ) => {
    // iterate
    for (let i = pos; i < arr.length; i) {
      let newPos;

      if (arr[i].length > 0) {
        if (arr[i][depth] !== ':') {
          if (depth === 0) {
            buffer.push({
              label: arr[i].slice(depth, arr[i].length),
              value: `${i}`,
              children: [],
            });

            // if no children, delete container
            if (parent)
              if (parent.children.length === 0) delete parent.children;
            parent = buffer[buffer.length - 1];
          } else return { data: buffer, pos: i };
        } // is child
        else if (parent) {
          parent.children.push({
            label: arr[i].slice(depth + 1, arr[i].length),
            value: `${i}`,
            children: [],
          });
          const lastChild = parent.children[parent.children.length - 1];
          newPos = Tree.arrayToNodes(
            arr,
            i + 1,
            depth + 1,
            lastChild /* as parent */,
            buffer,
          ).pos;

          if (lastChild.children.length === 0) delete lastChild.children;
        }
        // iterate
        if (!newPos) i += 1;
        else i = newPos;
      }
    }

    // return
    if (buffer[buffer.length - 1])
      if (buffer[buffer.length - 1].children.length === 0)
        delete buffer[buffer.length - 1].children;
    return { data: buffer, pos: 0 };
  }; // End of arrayToNodes

  static stringToChecked = (
    string,
    nodeData,
    separator,
    parentSeparator,
    sepatateLine,
  ) => {
    // console.log(`stringToChecked: ${string},
    // ${nodeData},
    // ${separator},
    // ${parentSeparator},
    // ${sepatateLine},`);
    // parse string until nothing is left or the nodeData's end is reached
    const checked = [];
    // parse string
    let strArr = Array.isArray(string) ? string : string.split(separator);
    // parse out parents
    if (parentSeparator && !Array.isArray(string))
      for (let i = 0; i < strArr.length; i) {
        const iPos = strArr[i].indexOf(parentSeparator);
        if (iPos > -1) {
          // versasuite technically fails to parse this out when parents are involved, so we are breaking and return nothing here
          return { checked: undefined, strArr: undefined };
          // strArr[i] = strArr[i].slice(iPos, strArr[i].length);
          // console.log('new Str:', strArr[i]);
        }
        i += 1;
      }

    // console.log(`strArr${separator}`, strArr, 'nodeData:', nodeData);

    // assume items are in sequential
    for (let i = 0; i < nodeData.length; i) {
      // console.log(`${strArr[0]} === ${nodeData[i].label}`);
      // check for match
      if (strArr[0] === nodeData[i].label) {
        // push match
        checked.push(nodeData[i].value);
        // remove string from buffer
        strArr = strArr.slice(1, strArr.length);
        // console.log('new strArr:', strArr);
      }
      // check children
      if (nodeData[i].children)
        if (nodeData[i].children.length) {
          // console.log('Check Children');
          const result = Tree.stringToChecked(
            strArr,
            nodeData[i].children,
            separator,
            parentSeparator,
            sepatateLine,
          );
          if (result.strArr.length) strArr = result.strArr;
          if (result.checked.length)
            checked.splice(checked.length, 0, ...result.checked);
        }

      if (strArr.length === 0) break;

      i += 1;
    }

    // console.log('checked:', checked);
    return { checked, strArr };
  };

  // constructor
  constructor(props) {
    super(props);
    // if (this.props.funcs) this.props.funcs.setChecked = this.setChecked;

    const defaultValueResult = () =>
      Array.isArray(props.defaultValue)
        ? props.defaultValue
        : Tree.stringToChecked(
            props.defaultValue,
            props.nodes,
            props.separator,
            props.parentSeparator,
            props.separateLine,
          ).checked;

    // get default value
    const checked = props.defaultValue ? defaultValueResult() : undefined;

    // console.log('checked:', checked, 'defaultValue:', props.defaultValue);

    this.state = {
      checked: Array.isArray(checked) ? checked : [],
      expanded: [],
    };

    // set checked function
    if (props.Funcs) {
      props.Funcs.Update = this.handleUpdate;
    }
  }

  Update = (checked, value, string) => {
    this.setState({ checked });
    if (this.props.setString) {
      this.props.onChange({ target: { value: string } });
    } else {
      this.props.onChange({ target: { value: checked } });
    }
  };

  handleUpdate = (value) => {
    const obj = this.handleUpdateValue(value);
    this.Update(obj.checked, undefined, obj.string);
  };

  handleUpdateValue = (value) => {
    const checked = Array.isArray(value)
      ? value
      : Tree.stringToChecked(
          value,
          this.props.nodes,
          this.props.separator,
          this.props.parentSeparator,
          this.props.separateLine,
        ).checked;
    const string = Array.isArray(value) ? undefined : value;

    // console.log(
    //   `handleUpdate: value: ${value},
    //   checked: ${checked},
    //   string: ${string}`,
    // );
    return { checked, string };
  };

  render() {
    return (
      <TreeBase
        font={this.props.font}
        separator={this.props.separator}
        parentSeparator={this.props.parentSeparator}
        separateLine={this.props.separateLine}
        // save children means that the children text will be saved even if all children are selected
        saveChildren={
          !this.props.saveChildren && !this.props.saveParents
            ? true
            : this.props.saveChildren
        }
        // save parent means that the parent text will be saved if all children are selected
        saveParents={this.props.saveParents}
        // save expanded means that the parent text will be saved always
        saveExpanded={this.props.saveExpanded}
        nodes={this.props.nodes}
        id={this.props.id}
        showCheckbox={this.props.showCheckbox}
        noParentCheckbox={this.props.noParentCheckbox}
        noCascade={this.props.noCascade}
        singleSelect={this.props.singleSelect}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={(checked, value, string) => {
          this.Update(checked, value, string);
        }}
        onExpand={(expanded) => this.setState({ expanded })}
      />
    );
  }
}

export default Tree;
