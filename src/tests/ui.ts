import { fireEvent, screen, within } from "@testing-library/react";
export function chooseSelect(label: string, value: string) {
  fireEvent.click(screen.getByRole("combobox", { name: label }));
  const option = within(screen.getByRole("listbox"))
    .getAllByRole("option")
    .find((o) => o.getAttribute("data-value") === value);
  if (!option) throw new Error("Missing option " + value);
  fireEvent.click(option);
}
export function completeReading() {
  for (const name of ["实验", "定义", "例题", "练习"])
    fireEvent.click(screen.getByRole("tab", { name }));
}
export function formulaMode(name: string) {
  fireEvent.click(screen.getByRole("button", { name: "设置" }));
  fireEvent.click(screen.getByRole("tab", { name }));
  fireEvent.click(screen.getByRole("button", { name: "完成设置" }));
}
