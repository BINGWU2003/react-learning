import { useRef, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useImmer } from "use-immer";
import { createInitialPlan } from "./initialPlan";
import type { PlanLevel, StudyPlan } from "./initialPlan";
import "./ImmerDemo.css";

export function ImmerDemo() {
  const [plan, updatePlan] = useImmer<StudyPlan>(createInitialPlan);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [targetModuleId, setTargetModuleId] = useState("react");
  const nextTaskId = useRef(1);

  const tasks = plan.modules.flatMap((module) => module.tasks);
  const completedCount = tasks.reduce(
    (count, task) => count + Number(task.completed),
    0,
  );
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  function changePlanTitle(event: ChangeEvent<HTMLInputElement>) {
    updatePlan((draft) => {
      draft.title = event.target.value;
    });
  }

  function changeOwnerName(event: ChangeEvent<HTMLInputElement>) {
    updatePlan((draft) => {
      draft.owner.name = event.target.value;
    });
  }

  function changeLevel(event: ChangeEvent<HTMLSelectElement>) {
    updatePlan((draft) => {
      draft.owner.level = event.target.value as PlanLevel;
    });
  }

  function toggleTask(moduleId: string, taskId: string) {
    updatePlan((draft) => {
      const module = draft.modules.find((item) => item.id === moduleId);
      const task = module?.tasks.find((item) => item.id === taskId);
      if (task) task.completed = !task.completed;
    });
  }

  function renameTask(moduleId: string, taskId: string, title: string) {
    updatePlan((draft) => {
      const module = draft.modules.find((item) => item.id === moduleId);
      const task = module?.tasks.find((item) => item.id === taskId);
      if (task) task.title = title;
    });
  }

  function removeTask(moduleId: string, taskId: string) {
    updatePlan((draft) => {
      const module = draft.modules.find((item) => item.id === moduleId);
      if (!module) return;
      module.tasks = module.tasks.filter((task) => task.id !== taskId);
    });
  }

  function completeModule(moduleId: string) {
    updatePlan((draft) => {
      const module = draft.modules.find((item) => item.id === moduleId);
      if (!module) return;
      for (const task of module.tasks) task.completed = true;
    });
  }

  function addTask(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newTaskTitle.trim();
    if (!title) return;

    updatePlan((draft) => {
      const module = draft.modules.find((item) => item.id === targetModuleId);
      module?.tasks.push({
        id: `custom-${nextTaskId.current}`,
        title,
        completed: false,
      });
    });

    nextTaskId.current += 1;
    setNewTaskTitle("");
  }

  function resetPlan() {
    updatePlan(createInitialPlan());
    setNewTaskTitle("");
    setTargetModuleId("react");
    nextTaskId.current = 1;
  }

  return (
    <div className="immer-demo not-content">
      <header className="immer-demo__header">
        <div>
          <span className="d-badge d-badge-outline d-badge-sm">
            useImmer state
          </span>
          <h2>{plan.title || "未命名学习计划"}</h2>
          <p>
            {plan.owner.name || "未填写姓名"} · {plan.owner.level}
          </p>
        </div>
        <button
          className="d-btn d-btn-outline d-btn-sm"
          type="button"
          onClick={resetPlan}
        >
          重置计划
        </button>
      </header>

      <div className="immer-demo__editor">
        <label>
          计划名称
          <input
            className="d-input d-input-sm w-full"
            value={plan.title}
            onChange={changePlanTitle}
          />
        </label>
        <label>
          学习者
          <input
            className="d-input d-input-sm w-full"
            value={plan.owner.name}
            onChange={changeOwnerName}
          />
        </label>
        <label>
          当前阶段
          <select
            className="d-select d-select-sm w-full"
            value={plan.owner.level}
            onChange={changeLevel}
          >
            <option value="初级">初级</option>
            <option value="进阶">进阶</option>
          </select>
        </label>
      </div>

      <div className="immer-demo__progress">
        <div>
          <span>整体进度</span>
          <strong>
            {completedCount} / {tasks.length} 项 · {progress}%
          </strong>
        </div>
        <div
          className="immer-demo__progress-track"
          role="progressbar"
          aria-label="学习计划完成进度"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="immer-demo__modules">
        {plan.modules.map((module) => (
          <section className="immer-demo__module" key={module.id}>
            <header>
              <div>
                <h3>{module.title}</h3>
                <span>
                  {module.tasks.filter((task) => task.completed).length} /{" "}
                  {module.tasks.length} 完成
                </span>
              </div>
              <button
                className="d-btn d-btn-ghost d-btn-sm"
                type="button"
                onClick={() => completeModule(module.id)}
                disabled={module.tasks.length === 0}
              >
                全部完成
              </button>
            </header>

            {module.tasks.length ? (
              <ul>
                {module.tasks.map((task) => (
                  <li
                    className={task.completed ? "is-completed" : undefined}
                    key={task.id}
                  >
                    <input
                      className="d-toggle d-toggle-primary d-toggle-sm"
                      type="checkbox"
                      checked={task.completed}
                      aria-label={`${task.completed ? "取消完成" : "完成"} ${task.title}`}
                      onChange={() => toggleTask(module.id, task.id)}
                    />
                    <input
                      className="d-input d-input-sm w-full immer-demo__task-title"
                      value={task.title}
                      aria-label={`编辑任务：${task.title}`}
                      onChange={(event) =>
                        renameTask(module.id, task.id, event.target.value)
                      }
                    />
                    <button
                      className="d-btn d-btn-error d-btn-ghost d-btn-sm"
                      type="button"
                      aria-label={`删除任务：${task.title}`}
                      onClick={() => removeTask(module.id, task.id)}
                    >
                      删除
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="immer-demo__empty">该模块还没有任务。</p>
            )}
          </section>
        ))}
      </div>

      <form className="immer-demo__add" onSubmit={addTask}>
        <label>
          新任务
          <input
            className="d-input d-input-sm w-full"
            value={newTaskTitle}
            placeholder="例如：完成一次状态重构"
            onChange={(event) => setNewTaskTitle(event.target.value)}
          />
        </label>
        <label>
          添加到
          <select
            className="d-select d-select-sm w-full"
            value={targetModuleId}
            onChange={(event) => setTargetModuleId(event.target.value)}
          >
            {plan.modules.map((module) => (
              <option value={module.id} key={module.id}>
                {module.title}
              </option>
            ))}
          </select>
        </label>
        <button
          className="d-btn d-btn-primary d-btn-sm"
          type="submit"
          disabled={!newTaskTitle.trim()}
        >
          添加任务
        </button>
      </form>
    </div>
  );
}
