import { useState } from "react";
import { Button, Sheet } from "../../components/ui";
import {
  remediationModulesById,
  resolveRemediationForObstacle,
  type ObstacleContext,
  type RemediationId,
} from "../../data/remediation/remediationModules";
import TeachingSession from "./TeachingSession";

export function RemediationEntry({ remediationId }: { remediationId: RemediationId }) {
  const [activeId, setActiveId] = useState<RemediationId>();
  const entry = remediationModulesById[remediationId];
  const active = activeId && remediationModulesById[activeId];
  const close = () => setActiveId(undefined);

  return (
    <>
      <Button type="button" variant="ghost" onClick={() => setActiveId(remediationId)}>
        {entry.triggerLabel}
      </Button>
      {active && (
        <Sheet open onClose={close} title={active.title}>
          <TeachingSession key={active.id} lesson={active.lesson} active locked={false} focused
            focusFirstStep={false} onFinish={close} finishLabel="完成补救并返回" />
        </Sheet>
      )}
    </>
  );
}

export function ObstacleRemediation(obstacle: ObstacleContext) {
  const entry = resolveRemediationForObstacle(obstacle);
  return entry ? <RemediationEntry remediationId={entry.id} /> : null;
}
