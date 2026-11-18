import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { chapters } from "../../data/learning";
import { formulas, formulaById } from "../../data/formulas";
import { useFormulas } from "../../db/formulas";
import { useLearning } from "../../db/learning";
import {
  counters,
  queue,
  formulaReviewQueue,
  cardById,
  level,
  type QueueItem,
  type FormulaStore,
  type QueueMode,
} from "./engine";
import {
  Card,
  Button,
  Accordion,
  ListItem,
  Sheet,
  SegmentedControl,
  NumberStepper,
  EmptyState,
} from "../../components/ui";
import StudyHeading from "../../components/StudyHeading";
import FormulaDetail from "./FormulaDetail";
import Session from "./Session";
import MasteryLights from "./MasteryLights";
const modes = [
  { value: "due", label: "今日复习" },
  { value: "cloze", label: "填空" },
  { value: "recall", label: "完整默写" },
  { value: "spot", label: "随机抽查（L3 及以上）" },
  { value: "recognize", label: "反向识别" },
];
export default function FormulaPages() {
  const { store, save, storageError } = useFormulas();
  const { state } = useLearning();
  const [query, setQuery] = useSearchParams();
  const [mode, setMode] = useState<QueueMode>("due");
  const [settings, setSettings] = useState(false);
  const [session, setSession] = useState<{
    items: QueueItem[];
    baseline: FormulaStore;
    formulaId?: string;
  } | null>(null);
  const counts = counters(store);
  const lesson = query.get("lesson");
  const selected = formulaById.get(query.get("formula") || "");
  const activeSession = session?.formulaId === selected?.id ? session : null;
  const available = formulas.filter((f) => !lesson || f.lessonId === lesson);
  function start(nextMode: QueueMode = mode) {
    const items = queue(store, nextMode, state.attempts);
    setSession({
      items: lesson
        ? items.filter(
            (i) =>
              formulaById.get(cardById.get(i.cardId)!.formulaId)?.lessonId ===
              lesson,
          )
        : items,
      baseline: store,
    });
  }
  return (
    <div className="page read-page fm">
      <StudyHeading
        title="公式记忆中心"
        chapter={6}
        action={
          !activeSession ? (
            <Button onClick={() => setSettings(true)}>设置</Button>
          ) : undefined
        }
      />
      {storageError && (
        <p role="alert" className="storage-alert">
          公式记录无法保存，退出后可能丢失。请检查设备存储空间。
        </p>
      )}
      {activeSession ? (
        <Session
          initial={activeSession.items}
          baseline={activeSession.baseline}
          backLabel={activeSession.formulaId ? "返回公式详情" : undefined}
          onExit={() => setSession(null)}
        />
      ) : selected ? (
        <FormulaDetail
          formula={selected}
          onReview={() => setSession({
            items: formulaReviewQueue(selected.id, store),
            baseline: store,
            formulaId: selected.id,
          })}
          onBack={() => setQuery(lesson ? { lesson } : {})}
        />
      ) : (
        <>
          <Card className="formula-daily">
            <h2>今天要复习 {counts.due} 张</h2>
            <p>
              今日新学 {counts.newToday} 个 · 薄弱 {counts.weak} 个 ·
              每天最多新学 {store.settings.newPerDay} 个
            </p>
            <div className="learning-actions">
              <Button variant="primary" onClick={() => start()}>
                开始今日复习
              </Button>
              <span>{modes.find((m) => m.value === mode)?.label}</span>
            </div>
            {counts.due > 40 && (
              <p role="status">先清 20 张最久没复习的，暂时暂停加入新公式。</p>
            )}
          </Card>
          {counts.due === 0 && (
            <EmptyState
              title="今天没有到期卡片"
              description="可以学几个新公式，或在设置中选择专项复习。"
              action={
                <Button
                  disabled={store.settings.newPerDay === 0}
                  onClick={() => start("due")}
                >
                  学几个新公式
                </Button>
              }
            />
          )}
          {lesson && (
            <p className="learning-note">
              仅显示当前课时公式。
              <Button variant="ghost" onClick={() => setQuery({})}>
                查看全部
              </Button>
            </p>
          )}
          {chapters.map(({ id: chapter }) => {
            const list = available.filter((f) => f.chapter === chapter);
            if (!list.length) return null;
            return (
              <Accordion
                key={chapter}
                title={`第${chapter}章 · ${list.length} 个公式`}
                defaultOpen={Boolean(lesson)}
              >
                {list.map((f) => (
                  <ListItem
                    key={f.id}
                    title={f.name}
                    description={f.group}
                    indicator={<MasteryLights level={level(f.id, store, state.attempts)} />}
                    onClick={() =>
                      setQuery({ ...(lesson ? { lesson } : {}), formula: f.id })
                    }
                  />
                ))}
              </Accordion>
            );
          })}
        </>
      )}
      <Sheet
        open={settings}
        onClose={() => setSettings(false)}
        title="公式复习设置"
      >
        <h3>复习模式</h3>
        <SegmentedControl
          label="复习模式"
          value={mode}
          items={modes}
          onChange={(v) => setMode(v as QueueMode)}
        />
        <NumberStepper
          label="每天最多加入的新公式（0–20）"
          value={store.settings.newPerDay}
          onChange={(n) => save({ ...store, settings: { newPerDay: n } })}
        />
        <p className="learning-note">
          每轮最多 20
          张不同卡片。忘记的卡片本轮末尾再出现一次；每日上限只控制新公式，已有到期卡优先。
        </p>
        <Button onClick={() => setSettings(false)}>完成设置</Button>
      </Sheet>
    </div>
  );
}
