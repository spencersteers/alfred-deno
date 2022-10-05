import * as path from "https://deno.land/std/path/mod.ts";
import * as plist from "https://deno.land/x/plist/mod.ts";

import { AlfredScriptFilterJSON, AlfredWorkflowInfo } from "./types.ts";

const encoder = new TextEncoder();

// https://www.alfredapp.com/help/workflows/script-environment-variables/
const ALFRED_PREFERENCES = Deno.env.get("alfred_preferences");
const ALFRED_WORKFLOW_CACHE = Deno.env.get("alfred_workflow_cache");
const ALFRED_WORKFLOW_DATA = Deno.env.get("alfred_workflow_data");

export function getWorkflowsDir() {
  if (!ALFRED_PREFERENCES) {
    throw new Error(`env var 'alfred_preferences' is undefined`);
  }
  return path.join(ALFRED_PREFERENCES, "workflows");
}

export function getWorkflowCacheDir() {
  if (!ALFRED_WORKFLOW_CACHE) {
    throw new Error(`env var 'alfred_workflow_cache' is undefined`);
  }
  return ALFRED_WORKFLOW_CACHE;
}

export function getWorkflowDataDir() {
  if (!ALFRED_WORKFLOW_DATA) {
    throw new Error(`env var 'alfred_workflow_data' is undefined`);
  }
  return ALFRED_WORKFLOW_DATA;
}

export function getDir() {
  return path.dirname(path.fromFileUrl(Deno.mainModule));
}

export function getWorkflowInfo(workflowDir: string): AlfredWorkflowInfo {
  const infoPlist = path.join(workflowDir, "/info.plist");
  const content = Deno.readTextFileSync(infoPlist);
  return plist.parse(content);
}

export function output(arg: string | AlfredScriptFilterJSON) {
  const out = encoder.encode(
    typeof arg === "string" ? arg : JSON.stringify(arg, null, ""),
  );
  Deno.stdout.writeSync(out);
}

export * from "./types.ts";
