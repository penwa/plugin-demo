import { TreeItem, TreeItemCollapsibleState, TreeDataProvider, Uri, window } from 'vscode';
import { join } from 'path';


export class TreeItemNode extends TreeItem {

  constructor(
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState,
  ) {
    super(label, collapsibleState);
  }

  command = {
    title: this.label,
    command: 'treeItemClick',
    tooltip: this.label,
    arguments: [
      this.label,
    ]
  }
}

export class TreeViewProvider implements TreeDataProvider<TreeItemNode>{
  onDidChangeTreeData?: import("vscode").Event<TreeItemNode | null | undefined> | undefined;

  getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
    return element;
  }


  getChildren(element?: TreeItemNode | undefined): import("vscode").ProviderResult<TreeItemNode[]> {
    return ['commit'].map(
      item => new TreeItemNode(
        item as string,
        TreeItemCollapsibleState.None as TreeItemCollapsibleState,
      )
    )
  }

  public static initTreeViewItem() {
    const treeViewProvider = new TreeViewProvider();
    window.registerTreeDataProvider('treeView-item', treeViewProvider);
  }
}