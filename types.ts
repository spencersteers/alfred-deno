export type AlfredScriptFilterJSON = {
  items: AlfredScriptFilterItem[];
};

export interface AlfredScriptFilterItemIcon {
  type?: "fileicon" | "filetype";
  path: string;
}

export interface AlfredScriptFilterItem {
  uid?: string;
  title: string;
  subtitle?: string;
  arg: string;
  icon?: AlfredScriptFilterItemIcon;
  valid?: boolean;
  match?: string;
  autocomplete?: string;
  type?: "default" | "file" | "file:skipcheck";
}

export interface AlfredWorkflowInfo {
  name: string;
  bundleid: string;
  createdby: string;
}
