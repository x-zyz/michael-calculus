import { Button } from "./ui";

export default function BankProblemStatus({ failed, retry }: {
  failed: boolean;
  retry: () => void;
}) {
  return failed
    ? <div role="alert"><p>题目暂时无法加载。</p><Button onClick={retry}>重试</Button></div>
    : <p role="status">正在加载题目…</p>;
}
