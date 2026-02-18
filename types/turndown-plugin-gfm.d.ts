declare module 'turndown-plugin-gfm' {
  import { Node } from 'turndown';
  export function gfm(): (service: any) => void;
}
