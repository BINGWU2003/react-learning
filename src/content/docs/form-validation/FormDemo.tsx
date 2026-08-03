import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Select,
} from "antd";
import zhCN from "antd/locale/zh_CN";
import { profileSchema } from "./formSchema";
import type { ProfileFormValues } from "./formSchema";
import "./FormDemo.css";

const defaultValues: ProfileFormValues = {
  name: "",
  email: "",
  direction: "react",
  agreement: false,
};

const directionOptions = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "两者对比", value: "both" },
];

function wait(duration: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });
}

export function FormDemo() {
  const [submittedData, setSubmittedData] =
    useState<ProfileFormValues | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: "onBlur",
  });

  const submit: SubmitHandler<ProfileFormValues> = async (values) => {
    await wait(500);
    setSubmittedData(values);
  };

  function resetForm() {
    reset(defaultValues);
    setSubmittedData(null);
  }

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#1769d2",
          borderRadius: 8,
          fontFamily: "inherit",
        },
      }}
    >
      <div className="antd-form-demo">
        <div className="antd-form-demo__panel">
          <form onSubmit={handleSubmit(submit)} noValidate>
            <Form component={false} layout="vertical">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Form.Item
                    label="姓名"
                    htmlFor="profile-name"
                    validateStatus={fieldState.error ? "error" : undefined}
                    help={fieldState.error?.message}
                  >
                    <Input
                      {...field}
                      id="profile-name"
                      placeholder="例如：小明"
                      autoComplete="name"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Form.Item
                    label="邮箱"
                    htmlFor="profile-email"
                    validateStatus={fieldState.error ? "error" : undefined}
                    help={fieldState.error?.message}
                  >
                    <Input
                      {...field}
                      id="profile-email"
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="direction"
                control={control}
                render={({ field, fieldState }) => (
                  <Form.Item
                    label="学习方向"
                    htmlFor="profile-direction"
                    validateStatus={fieldState.error ? "error" : undefined}
                    help={fieldState.error?.message}
                  >
                    <Select
                      {...field}
                      id="profile-direction"
                      options={directionOptions}
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="agreement"
                control={control}
                render={({ field, fieldState }) => (
                  <Form.Item
                    validateStatus={fieldState.error ? "error" : undefined}
                    help={fieldState.error?.message}
                  >
                    <Checkbox
                      name={field.name}
                      ref={field.ref}
                      checked={field.value}
                      onBlur={field.onBlur}
                      onChange={(event) => field.onChange(event.target.checked)}
                    >
                      同意保存这份学习资料
                    </Checkbox>
                  </Form.Item>
                )}
              />

              <div className="antd-form-demo__actions">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                >
                  提交资料
                </Button>
                <Button htmlType="button" onClick={resetForm}>
                  重置
                </Button>
              </div>
            </Form>
          </form>
        </div>

        <div className="antd-form-demo__result" aria-live="polite">
          {submittedData ? (
            <Alert
              type="success"
              showIcon
              title="校验通过，已获得类型安全的数据"
              description={
                <pre>{JSON.stringify(submittedData, null, 2)}</pre>
              }
            />
          ) : (
            <Alert
              type="info"
              showIcon
              title="提交后会在这里显示通过 Zod 校验的数据"
            />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
