// console.group and friends, named after how devtools draws them: a group is
// either open or collapsed until you End() it.
export const Group = {
  Open: (...label: unknown[]) => console.group(...label),
  Collapsed: (...label: unknown[]) => console.groupCollapsed(...label),
  End: () => console.groupEnd(),
}
