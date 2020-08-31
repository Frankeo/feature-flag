export function getCheckboxId(option) {
  const switchNode = option.childNodes[1];
  if (!switchNode) return;
  const checkboxNode = switchNode.childNodes[0];
  return checkboxNode.id;
}
